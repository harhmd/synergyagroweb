-- ========================================================
-- Synergy Agro Farm (SAF) & Legasi Coffee Database Schema
-- Database Engine: PostgreSQL 18 / 17
-- Table Prefix: SYN_
-- ========================================================

-- 1. Users & Administrators
CREATE TABLE IF NOT EXISTS SYN_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Media / Image Storage in PostgreSQL (BYTEA Binary Storage)
CREATE TABLE IF NOT EXISTS SYN_media (
  id SERIAL PRIMARY KEY,
  file_key VARCHAR(255) NOT NULL UNIQUE,
  file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_data BYTEA NOT NULL,
  file_size INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_syn_media_key ON SYN_media(file_key);

-- 3. Legasi Coffee Drinks Catalog
CREATE TABLE IF NOT EXISTS SYN_drinks (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description_en TEXT,
  description_ms TEXT,
  iced_price NUMERIC(6,2) NOT NULL,
  hot_price NUMERIC(6,2),
  media_key VARCHAR(255) REFERENCES SYN_media(file_key) ON DELETE SET NULL,
  is_popular BOOLEAN DEFAULT false,
  badge VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Nursery & Organic Soil Inventory
CREATE TABLE IF NOT EXISTS SYN_nursery_items (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description_en TEXT,
  description_ms TEXT,
  price VARCHAR(100) NOT NULL,
  media_key VARCHAR(255) REFERENCES SYN_media(file_key) ON DELETE SET NULL,
  tag VARCHAR(100),
  specs TEXT,
  stock_quantity INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Farm Visit & Buggy Tour Bookings
CREATE TABLE IF NOT EXISTS SYN_bookings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  guests VARCHAR(50) NOT NULL,
  purpose VARCHAR(100) NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Cafe Orders (Sync from Online Cart & WhatsApp)
CREATE TABLE IF NOT EXISTS SYN_orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(100) UNIQUE,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(50),
  items_json JSONB NOT NULL,
  total_price NUMERIC(8,2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'cash_or_qr',
  status VARCHAR(50) DEFAULT 'received',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Direct Inquiries & Feedback
CREATE TABLE IF NOT EXISTS SYN_inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Farm System Configurations & Settings
CREATE TABLE IF NOT EXISTS SYN_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
