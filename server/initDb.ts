import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log('[DB Init] Connecting to PostgreSQL to check and initialize SYN_ tables...');
    
    // 1. Read and execute schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    await client.query(schemaSql);
    console.log('[DB Init] Schema created successfully (all tables prefixed with SYN_)');

    // 2. Seed images into SYN_media (Store binary images in PostgreSQL)
    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      for (const file of files) {
        const filePath = path.join(imagesDir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          const ext = path.extname(file).toLowerCase();
          const mimeType = ext === '.png' ? 'image/png' : ext === '.svg' ? 'image/svg+xml' : 'image/jpeg';
          const fileBuffer = fs.readFileSync(filePath);

          await client.query(
            `INSERT INTO SYN_media (file_key, file_name, mime_type, file_data, file_size, description)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (file_key) DO UPDATE 
             SET file_data = EXCLUDED.file_data, file_size = EXCLUDED.file_size, mime_type = EXCLUDED.mime_type`,
            [file, file, mimeType, fileBuffer, fileBuffer.length, `Authentic Synergy Agro Farm asset: ${file}`]
          );
          console.log(`[DB Media] Stored image in SYN_media: ${file} (${fileBuffer.length} bytes)`);
        }
      }
    }

    // 3. Seed Default Admin in SYN_users
    await client.query(`
      INSERT INTO SYN_users (username, email, password_hash, full_name, role)
      VALUES ('admin', 'admin@synergyagrofarm.my', '$2a$10$wN1r8.jXpE/Jv47j51xG3e.Tqg/0wWbN6aO1U2m7z8R.Y9P3q5eGi', 'SAF Administrator', 'superadmin')
      ON CONFLICT (username) DO NOTHING
    `);

    // 4. Seed Drinks into SYN_drinks
    const drinks = [
      { id: 'matcha-latte', name: 'Matcha Latte', category: 'matcha', descEn: 'Pure ceremonial Uji matcha whisked with fresh velvety milk.', descMs: 'Matcha Uji asli diadun bersama susu segar berkrim.', icedPrice: 9, hotPrice: null, mediaKey: 'legasi-coffee-menu.png', badge: 'Best Seller', popular: true },
      { id: 'matcha-strawberry', name: 'Matcha Strawberry', category: 'matcha', descEn: 'Vibrant strawberry coulis topped with iced milk and Japanese matcha.', descMs: 'Puri strawberi manis berlapis susu segar dan matcha Jepun.', icedPrice: 11, hotPrice: null, mediaKey: 'legasi-coffee-menu.png', badge: 'Signature', popular: true },
      { id: 'dirty-matcha', name: 'Dirty Matcha', category: 'matcha', descEn: 'Fresh espresso shot pulled over chilled creamy matcha latte.', descMs: 'Shot espresso pekat ditarik di atas matcha latte dingin.', icedPrice: 11, hotPrice: null, mediaKey: 'legasi-coffee-menu.png', badge: 'Barista Special', popular: true },
      { id: 'coffee-latte', name: 'Coffee Latte', category: 'coffee', descEn: 'Balanced double espresso poured over smooth steamed milk.', descMs: 'Espresso seimbang diadun bersama susu segar sutera.', icedPrice: 6, hotPrice: 5, mediaKey: 'legasi-coffee-menu.png', badge: null, popular: true },
      { id: 'spanish-latte', name: 'Spanish Latte', category: 'coffee', descEn: 'Espresso blend sweetened with caramelized condensed milk.', descMs: 'Kopi espresso manis berkrim dengan sentuhan susu karamel.', icedPrice: 8, hotPrice: 7, mediaKey: 'legasi-coffee-menu.png', badge: 'Customer Fav', popular: true },
      { id: 'cappuccino', name: 'Cappuccino', category: 'coffee', descEn: 'Classic espresso with dense airy microfoam and cocoa dust.', descMs: 'Espresso klasik dengan buih susu lembut dan serbuk koko.', icedPrice: 9, hotPrice: 8, mediaKey: 'legasi-coffee-menu.png', badge: null, popular: false },
      { id: 'moca', name: 'Moca (Mocha)', category: 'coffee', descEn: 'Dark cocoa blended with freshly brewed espresso and chilled milk.', descMs: 'Coklat gelap diadun dengan kopi espresso wangi dan susu segar.', icedPrice: 9, hotPrice: 8, mediaKey: 'legasi-coffee-menu.png', badge: null, popular: false },
      { id: 'americano', name: 'Americano', category: 'coffee', descEn: 'Double shot rich espresso diluted with pure mineral water.', descMs: 'Shot berganda espresso aromatik dengan air mineral segar.', icedPrice: 5, hotPrice: 4, mediaKey: 'legasi-coffee-menu.png', badge: null, popular: false },
      { id: 'chocolate', name: 'Chocolate Premium', category: 'specialty', descEn: 'Rich melted Belgian chocolate with velvety milk foam.', descMs: 'Coklat pekat berkualiti tinggi dengan susu panas atau sejuk.', icedPrice: 7, hotPrice: 6, mediaKey: 'legasi-coffee-menu.png', badge: null, popular: true },
      { id: 'kopi', name: 'Kopi Legasi (Tradisi)', category: 'local', descEn: 'Traditional dark-roasted Malaysian coffee with sweet milk.', descMs: 'Kopi tradisi Melaka aroma pekat dengan susu pekat manis.', icedPrice: 4, hotPrice: 3, mediaKey: 'legasi-coffee-menu.png', badge: null, popular: true },
      { id: 'kopi-o', name: 'Kopi O Kaw', category: 'local', descEn: 'Robust local black coffee brewed dark and fragrant.', descMs: 'Kopi hitam kampung kaw dan wangi beraroma.', icedPrice: 3, hotPrice: 2, mediaKey: 'legasi-coffee-menu.png', badge: null, popular: false },
      { id: 'milo', name: 'Milo Kaw', category: 'local', descEn: 'Beloved Malaysian malt chocolate drink, served extra thick.', descMs: 'Milo kaw pekat menyelerakan kegemaran rakyat Malaysia.', icedPrice: 4, hotPrice: 3, mediaKey: 'legasi-coffee-menu.png', badge: null, popular: false },
      { id: 'barakah-water', name: 'Barakah Mineral Water', category: 'refresh', descEn: 'Pure and refreshing natural bottled mineral water.', descMs: 'Air mineral semulajadi segar dan bersih.', icedPrice: 2, hotPrice: 1, mediaKey: 'legasi-coffee-menu.png', badge: null, popular: false }
    ];

    for (const d of drinks) {
      await client.query(`
        INSERT INTO SYN_drinks (id, name, category, description_en, description_ms, iced_price, hot_price, media_key, is_popular, badge)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          iced_price = EXCLUDED.iced_price,
          hot_price = EXCLUDED.hot_price,
          media_key = EXCLUDED.media_key
      `, [d.id, d.name, d.category, d.descEn, d.descMs, d.icedPrice, d.hotPrice, d.mediaKey, d.popular, d.badge]);
    }

    // 5. Seed Nursery Items into SYN_nursery_items
    const nursery = [
      { id: 'soil-long-you', name: 'Long You 6 in 1 Organic Planting Soil (±28L)', category: 'soil', descEn: 'Premium organic planting soil enriched with 6 natural plant nutrients for rapid root growth.', descMs: 'Tanah tanaman organik 6 dalam 1, diperkaya nutrien semula jadi untuk pertumbuhan akar subur.', price: 'RM 15.00 / bag', mediaKey: 'saf-organic-soil.jpg', tag: 'Authentic Stock', specs: '28L Heavy Duty Bag • 100% Organic Mix' },
      { id: 'plant-mango-polybag', name: 'Anak Pokok Mangga Harum Manis & Chokanan', category: 'fruit', descEn: 'Healthy grafted saplings in polybags, ready for garden planting or large containers.', descMs: 'Anak pokok mangga kahwin baka terpilih sihat di dalam polibeg, cepat berbuah dan manis.', price: 'RM 28.00 - RM 45.00', mediaKey: 'saf-nursery-mango.jpg', tag: 'High Yield Baka Kahwin', specs: 'Polybag Ready • 2-3 Feet Height' },
      { id: 'plant-hanging-pots-special', name: 'Pokok Gantung Hiasan Pasu Terpilih (RM10 Promo)', category: 'ornamental', descEn: 'Lush hanging pots with vibrant foliage, spider plants, and tropical climbers ready to hang.', descMs: 'Koleksi pokok gantung pasu rimbun pelbagai variasi, penyeri laman dan anjung rumah.', price: 'RM 10.00 / pot', mediaKey: 'saf-nursery-aisle.jpg', tag: 'Tawaran Hebat RM10', specs: 'Ready to Hang • Healthy Root System' },
      { id: 'plant-ornamental-shade', name: 'Tanaman Hiasan Rimbun & Aglaonema Pokok Bunga', category: 'ornamental', descEn: 'Gorgeous potted indoor & garden foliage including Aglaonema, Caladiums, and shade lovers.', descMs: 'Koleksi pokok bunga dan daun hiasan tropika rimbun, menyerikan laman rumah & kafe.', price: 'RM 18.00 - RM 35.00', mediaKey: 'saf-greenhouse-plants.jpg', tag: 'Greenhouse Grown', specs: 'Potted & Rooted • Easy Maintenance' },
      { id: 'fertilizer-organic-booster', name: 'Baja Organik Berkualiti & Penggalak Buah', category: 'soil', descEn: 'Natural nutrient-dense organic fertilizer formulation for explosive blooming and fruit sweetness.', descMs: 'Baja organik berkualiti & berkesan menggalakkan bunga lebat dan buah manis.', price: 'RM 12.00 - RM 25.00', mediaKey: 'saf-organic-soil.jpg', tag: 'Eco Friendly', specs: '1kg / 5kg / 25kg Available' },
      { id: 'fruit-seasonal-fresh', name: 'Buah-Buahan Segar Ladang (Seasonal Fresh Harvest)', category: 'fruit', descEn: 'Direct farm harvest tropical fruits including sweet mangoes, pineapples, and seasonal papayas.', descMs: 'Hasil buah-buahan segar dipetik terus dari ladang. Manis, berkualiti dan segar.', price: 'Seasonal Market Price', mediaKey: 'saf-nursery-mango.jpg', tag: 'Farm Direct', specs: 'Freshly Picked Daily' }
    ];

    for (const n of nursery) {
      await client.query(`
        INSERT INTO SYN_nursery_items (id, name, category, description_en, description_ms, price, media_key, tag, specs)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          price = EXCLUDED.price,
          media_key = EXCLUDED.media_key
      `, [n.id, n.name, n.category, n.descEn, n.descMs, n.price, n.mediaKey, n.tag, n.specs]);
    }

    console.log('[DB Init] Seeded SYN_drinks, SYN_nursery_items, and SYN_users successfully!');
  } catch (err: any) {
    console.error('[DB Init Error] Failed to initialize database:', err.message);
  } finally {
    client.release();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  initializeDatabase().then(() => {
    console.log('[DB Init] Completed execution.');
    process.exit(0);
  });
}
