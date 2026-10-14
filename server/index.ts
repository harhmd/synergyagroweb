import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { pool, query } from './db.js';
import { initializeDatabase } from './initDb.js';

import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const PORTAL_URL = process.env.PORTAL_URL || 'http://65.75.201.219:5000';

app.use(cors());

// -------------------------------------------------------------
// Reverse Proxy to Embedded Portal (http://65.75.201.219:5000)
// Ensures portal is embedded cleanly under https://synergy.famamelaka.cc
// -------------------------------------------------------------
// Trailing slash redirect for exact /portal so relative assets (styles.css, app.js) resolve correctly
app.use((req, res, next) => {
  if (req.originalUrl === '/portal') {
    return res.redirect(301, '/portal/');
  }
  next();
});

const portalProxy = createProxyMiddleware({
  target: PORTAL_URL,
  changeOrigin: true,
  on: {
    proxyReq: fixRequestBody,
    error: (err, _req, res) => {
      console.error('[Portal Proxy Error]', err.message);
      if ('writeHead' in res && !res.headersSent) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Portal backend currently unavailable', details: err.message }));
      }
    },
  },
});

app.use('/portal', portalProxy);

const portalApiProxy = createProxyMiddleware({
  target: PORTAL_URL,
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req: any) => {
      if (req.originalUrl) {
        proxyReq.path = req.originalUrl;
      }
      fixRequestBody(proxyReq, req);
    },
    error: (err, _req, res) => {
      console.error('[Portal API Proxy Error]', err.message);
      if ('writeHead' in res && !res.headersSent) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Portal API currently unavailable', details: err.message }));
      }
    },
  },
});

// Forward management portal API routes to port 5000
app.use([
  '/api/items',
  '/api/audit-logs',
  '/api/order-requests',
  '/api/analytics',
  '/api/status',
  '/api/sync',
  '/api/cart',
  '/api/export',
], portalApiProxy);

// Forward portal specific order operations to port 5000 (GET /api/orders and POST /api/orders/receive)
app.use('/api/orders', (req, res, next) => {
  if (req.method === 'GET' || req.path === '/receive') {
    return (portalApiProxy as any)(req, res, next);
  }
  next();
});

// Body parser for remaining SAF native API routes
app.use(express.json());

// -------------------------------------------------------------
// Authentication Endpoint (username: demo, password: demo)
// -------------------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'demo' && password === 'demo') {
    return res.json({
      success: true,
      user: { username: 'demo', role: 'Administrator', name: 'Demo Manager' },
      portalUrl: '/portal/',
      token: 'demo-session-token-' + Date.now(),
    });
  }
  return res.status(401).json({ success: false, error: 'Invalid username or password' });
});

// Auto-run schema & media initialization on startup if DATABASE_URL is reachable
(async () => {
  try {
    await initializeDatabase();
  } catch (err: any) {
    console.warn('[Server] Notice: Database auto-init skipped or waiting for DB connection:', err.message);
  }
})();

// -------------------------------------------------------------
// 1. Image & Media Streaming Endpoint directly from PostgreSQL (SYN_media)
// -------------------------------------------------------------
const serveMediaFromDb = async (req: express.Request, res: express.Response) => {
  const { fileKey } = req.params;
  try {
    const result = await query(
      'SELECT mime_type, file_data FROM SYN_media WHERE file_key = $1 LIMIT 1',
      [fileKey]
    );

    if (result.rows.length > 0) {
      const { mime_type, file_data } = result.rows[0];
      res.setHeader('Content-Type', mime_type);
      res.setHeader('X-Served-From', 'PostgreSQL-SYN_media');
      res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
      return res.send(file_data);
    }

    // Fallback to local filesystem if not yet seeded into DB
    const fallbackPath = path.join(__dirname, '..', 'public', 'images', fileKey);
    if (fs.existsSync(fallbackPath)) {
      return res.sendFile(fallbackPath);
    }

    return res.status(404).json({ error: 'Media not found in database or storage' });
  } catch (err: any) {
    console.error(`[Media Error] Failed retrieving ${fileKey} from SYN_media:`, err.message);
    const fallbackPath = path.join(__dirname, '..', 'public', 'images', fileKey);
    if (fs.existsSync(fallbackPath)) {
      return res.sendFile(fallbackPath);
    }
    return res.status(500).json({ error: 'Database media retrieval error' });
  }
};

app.get('/api/media/:fileKey', serveMediaFromDb);
app.get('/images/:fileKey', serveMediaFromDb);

// List all media records stored in SYN_media
app.get('/api/media-list', async (_req, res) => {
  try {
    const result = await query(
      'SELECT id, file_key, file_name, mime_type, file_size, description, created_at FROM SYN_media ORDER BY id ASC'
    );
    res.json({ success: true, count: result.rowCount, data: result.rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 2. Legasi Coffee Drinks Endpoints (SYN_drinks)
// -------------------------------------------------------------
app.get('/api/drinks', async (_req, res) => {
  try {
    const result = await query('SELECT * FROM SYN_drinks WHERE is_active = true ORDER BY sort_order ASC, id ASC');
    res.json({ success: true, count: result.rowCount, data: result.rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 3. Nursery Catalog Endpoints (SYN_nursery_items)
// -------------------------------------------------------------
app.get('/api/nursery', async (_req, res) => {
  try {
    const result = await query('SELECT * FROM SYN_nursery_items WHERE is_active = true ORDER BY id ASC');
    res.json({ success: true, count: result.rowCount, data: result.rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 4. Booking & Farm Visit Endpoints (SYN_bookings)
// -------------------------------------------------------------
app.post('/api/bookings', async (req, res) => {
  const { name, date, time, guests, purpose, notes } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  try {
    const result = await query(
      `INSERT INTO SYN_bookings (name, date, time, guests, purpose, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, date || '', time || '', guests || '', purpose || 'general', notes || '']
    );
    res.status(201).json({ success: true, booking: result.rows[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 5. Orders Endpoints (SYN_orders)
// -------------------------------------------------------------
app.post('/api/orders', async (req, res) => {
  const { customer_name, customer_phone, items, total_price } = req.body;
  const orderNumber = `SAF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  try {
    const result = await query(
      `INSERT INTO SYN_orders (order_number, customer_name, customer_phone, items_json, total_price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [orderNumber, customer_name || 'Walk-in / Online', customer_phone || '', JSON.stringify(items || []), total_price || 0]
    );
    res.status(201).json({ success: true, order: result.rows[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 6. Contact Inquiries Endpoints (SYN_inquiries)
// -------------------------------------------------------------
app.post('/api/inquiries', async (req, res) => {
  const { name, phone, subject, message } = req.body;
  try {
    const result = await query(
      `INSERT INTO SYN_inquiries (name, phone, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, phone, subject, message]
    );
    res.status(201).json({ success: true, inquiry: result.rows[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 7. System Health Check Endpoint
// -------------------------------------------------------------
app.get('/api/health', async (_req, res) => {
  let dbStatus = 'disconnected';
  try {
    const dbTest = await query('SELECT 1 as test');
    if (dbTest.rows.length > 0) dbStatus = 'connected';
  } catch {
    dbStatus = 'unreachable';
  }

  res.json({
    status: 'healthy',
    database: dbStatus,
    tablePrefix: 'SYN_',
    timestamp: new Date().toISOString(),
  });
});

// -------------------------------------------------------------
// 8. Serve Built Frontend in Production (SPA)
// -------------------------------------------------------------
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Express 5 compatible SPA fallback handler
  app.use((_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[SAF Server] Running on http://localhost:${PORT}`);
  console.log(`[SAF Server] Media endpoint ready at /api/media/:fileKey (powered by PostgreSQL SYN_media)`);
});
