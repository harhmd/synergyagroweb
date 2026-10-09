export interface DrinkItem {
  id: string;
  name: string;
  category: 'matcha' | 'coffee' | 'local' | 'specialty' | 'refresh';
  descriptionEn: string;
  descriptionMs: string;
  icedPrice: number;
  hotPrice?: number;
  image: string;
  badge?: string;
  popular?: boolean;
}

export interface NurseryItem {
  id: string;
  name: string;
  category: 'fruit' | 'ornamental' | 'soil';
  descriptionEn: string;
  descriptionMs: string;
  price: string;
  image: string;
  tag: string;
  specs: string;
}

export const DRINKS_DATA: DrinkItem[] = [
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    category: 'matcha',
    descriptionEn: 'Pure ceremonial Uji matcha whisked with fresh velvety milk.',
    descriptionMs: 'Matcha Uji asli diadun bersama susu segar berkrim.',
    icedPrice: 9,
    image: '/images/legasi-coffee-menu.png',
    badge: 'Best Seller',
    popular: true,
  },
  {
    id: 'matcha-strawberry',
    name: 'Matcha Strawberry',
    category: 'matcha',
    descriptionEn: 'Vibrant strawberry coulis topped with iced milk and Japanese matcha.',
    descriptionMs: 'Puri strawberi manis berlapis susu segar dan matcha Jepun.',
    icedPrice: 11,
    image: '/images/legasi-coffee-menu.png',
    badge: 'Signature',
    popular: true,
  },
  {
    id: 'dirty-matcha',
    name: 'Dirty Matcha',
    category: 'matcha',
    descriptionEn: 'Fresh espresso shot pulled over chilled creamy matcha latte.',
    descriptionMs: 'Shot espresso pekat ditarik di atas matcha latte dingin.',
    icedPrice: 11,
    image: '/images/legasi-coffee-menu.png',
    badge: 'Barista Special',
    popular: true,
  },
  {
    id: 'coffee-latte',
    name: 'Coffee Latte',
    category: 'coffee',
    descriptionEn: 'Balanced double espresso poured over smooth steamed milk.',
    descriptionMs: 'Espresso seimbang diadun bersama susu segar sutera.',
    icedPrice: 6,
    hotPrice: 5,
    image: '/images/legasi-coffee-menu.png',
    popular: true,
  },
  {
    id: 'spanish-latte',
    name: 'Spanish Latte',
    category: 'coffee',
    descriptionEn: 'Espresso blend sweetened with caramelized condensed milk.',
    descriptionMs: 'Kopi espresso manis berkrim dengan sentuhan susu karamel.',
    icedPrice: 8,
    hotPrice: 7,
    image: '/images/legasi-coffee-menu.png',
    badge: 'Customer Fav',
    popular: true,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'coffee',
    descriptionEn: 'Classic espresso with dense airy microfoam and cocoa dust.',
    descriptionMs: 'Espresso klasik dengan buih susu lembut dan serbuk koko.',
    icedPrice: 9,
    hotPrice: 8,
    image: '/images/legasi-coffee-menu.png',
  },
  {
    id: 'moca',
    name: 'Moca (Mocha)',
    category: 'coffee',
    descriptionEn: 'Dark cocoa blended with freshly brewed espresso and chilled milk.',
    descriptionMs: 'Coklat gelap diadun dengan kopi espresso wangi dan susu segar.',
    icedPrice: 9,
    hotPrice: 8,
    image: '/images/legasi-coffee-menu.png',
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'coffee',
    descriptionEn: 'Double shot rich espresso diluted with pure mineral water.',
    descriptionMs: 'Shot berganda espresso aromatik dengan air mineral segar.',
    icedPrice: 5,
    hotPrice: 4,
    image: '/images/legasi-coffee-menu.png',
  },
  {
    id: 'chocolate',
    name: 'Chocolate Premium',
    category: 'specialty',
    descriptionEn: 'Rich melted Belgian chocolate with velvety milk foam.',
    descriptionMs: 'Coklat pekat berkualiti tinggi dengan susu panas atau sejuk.',
    icedPrice: 7,
    hotPrice: 6,
    image: '/images/legasi-coffee-menu.png',
    popular: true,
  },
  {
    id: 'kopi',
    name: 'Kopi Legasi (Tradisi)',
    category: 'local',
    descriptionEn: 'Traditional dark-roasted Malaysian coffee with sweet milk.',
    descriptionMs: 'Kopi tradisi Melaka aroma pekat dengan susu pekat manis.',
    icedPrice: 4,
    hotPrice: 3,
    image: '/images/legasi-coffee-menu.png',
    popular: true,
  },
  {
    id: 'kopi-o',
    name: 'Kopi O Kaw',
    category: 'local',
    descriptionEn: 'Robust local black coffee brewed dark and fragrant.',
    descriptionMs: 'Kopi hitam kampung kaw dan wangi beraroma.',
    icedPrice: 3,
    hotPrice: 2,
    image: '/images/legasi-coffee-menu.png',
  },
  {
    id: 'milo',
    name: 'Milo Kaw',
    category: 'local',
    descriptionEn: 'Beloved Malaysian malt chocolate drink, served extra thick.',
    descriptionMs: 'Milo kaw pekat menyelerakan kegemaran rakyat Malaysia.',
    icedPrice: 4,
    hotPrice: 3,
    image: '/images/legasi-coffee-menu.png',
  },
  {
    id: 'barakah-water',
    name: 'Barakah Mineral Water',
    category: 'refresh',
    descriptionEn: 'Pure and refreshing natural bottled mineral water.',
    descriptionMs: 'Air mineral semulajadi segar dan bersih.',
    icedPrice: 2,
    hotPrice: 1,
    image: '/images/legasi-coffee-menu.png',
  }
];

export const NURSERY_DATA: NurseryItem[] = [
  {
    id: 'soil-long-you',
    name: 'Long You 6 in 1 Organic Planting Soil (±28L)',
    category: 'soil',
    descriptionEn: 'Premium organic planting soil enriched with 6 natural plant nutrients for rapid root growth.',
    descriptionMs: 'Tanah tanaman organik 6 dalam 1, diperkaya nutrien semula jadi untuk pertumbuhan akar subur.',
    price: 'RM 15.00 / bag',
    image: '/images/saf-organic-soil.jpg',
    tag: 'Authentic Stock',
    specs: '28L Heavy Duty Bag • 100% Organic Mix'
  },
  {
    id: 'plant-mango-polybag',
    name: 'Anak Pokok Mangga Harum Manis & Chokanan',
    category: 'fruit',
    descriptionEn: 'Healthy grafted saplings in polybags, ready for garden planting or large containers.',
    descriptionMs: 'Anak pokok mangga kahwin baka terpilih sihat di dalam polibeg, cepat berbuah dan manis.',
    price: 'RM 28.00 - RM 45.00',
    image: '/images/saf-nursery-mango.jpg',
    tag: 'High Yield Baka Kahwin',
    specs: 'Polybag Ready • 2-3 Feet Height'
  },
  {
    id: 'plant-hanging-pots-special',
    name: 'Pokok Gantung Hiasan Pasu Terpilih (RM10 Promo)',
    category: 'ornamental',
    descriptionEn: 'Lush hanging pots with vibrant foliage, spider plants, and tropical climbers ready to hang.',
    descriptionMs: 'Koleksi pokok gantung pasu rimbun pelbagai variasi, penyeri laman dan anjung rumah.',
    price: 'RM 10.00 / pot',
    image: '/images/saf-nursery-aisle.jpg',
    tag: 'Tawaran Hebat RM10',
    specs: 'Ready to Hang • Healthy Root System'
  },
  {
    id: 'plant-ornamental-shade',
    name: 'Tanaman Hiasan Rimbun & Aglaonema Pokok Bunga',
    category: 'ornamental',
    descriptionEn: 'Gorgeous potted indoor & garden foliage including Aglaonema, Caladiums, and shade lovers.',
    descriptionMs: 'Koleksi pokok bunga dan daun hiasan tropika rimbun, menyerikan laman rumah & kafe.',
    price: 'RM 18.00 - RM 35.00',
    image: '/images/saf-greenhouse-plants.jpg',
    tag: 'Greenhouse Grown',
    specs: 'Potted & Rooted • Easy Maintenance'
  },
  {
    id: 'fertilizer-organic-booster',
    name: 'Baja Organik Berkualiti & Penggalak Buah',
    category: 'soil',
    descriptionEn: 'Natural nutrient-dense organic fertilizer formulation for explosive blooming and fruit sweetness.',
    descriptionMs: 'Baja organik berkualiti & berkesan menggalakkan bunga lebat dan buah manis.',
    price: 'RM 12.00 - RM 25.00',
    image: '/images/saf-organic-soil.jpg',
    tag: 'Eco Friendly',
    specs: '1kg / 5kg / 25kg Available'
  },
  {
    id: 'fruit-seasonal-fresh',
    name: 'Buah-Buahan Segar Ladang (Seasonal Fresh Harvest)',
    category: 'fruit',
    descriptionEn: 'Direct farm harvest tropical fruits including sweet mangoes, pineapples, and seasonal papayas.',
    descriptionMs: 'Hasil buah-buahan segar dipetik terus dari ladang. Manis, berkualiti dan segar.',
    price: 'Seasonal Market Price',
    image: '/images/saf-nursery-mango.jpg',
    tag: 'Farm Direct',
    specs: 'Freshly Picked Daily'
  }
];

export const FARM_PILLARS = [
  {
    id: 'kafe',
    titleEn: 'Artisan Cafe & Covered Pavilion',
    titleMs: 'Kafe (Legasi Coffee) & Dewan Santai',
    subEn: 'Delicious & Appetizing',
    subMs: 'Sedap & Menyelerakan',
    descEn: 'Enjoy Legasi Coffee, signature matcha, and dining in our spacious airy pavilion with high-ceiling cooling fans.',
    descMs: 'Nikmati kopi Legasi Coffee, siri matcha, dan jamuan di dewan terbuka luas berbumbung dengan kipas gergasi sejuk.',
    icon: 'Coffee',
    color: 'from-amber-600 to-amber-800',
    tag: 'Legasi Coffee'
  },
  {
    id: 'buah',
    titleEn: 'Fresh Farm Fruits & Orchard',
    titleMs: 'Buah-Buahan Segar Ladang',
    subEn: 'Fresh & High Quality',
    subMs: 'Segar & Berkualiti',
    descEn: 'Sun-ripened tropical fruits harvested with care for maximum natural sweetness and nutrients.',
    descMs: 'Buah-buahan tropika segar bermutu tinggi dipetik terus dari ladang untuk kepuasan seisi keluarga.',
    icon: 'Apple',
    color: 'from-lime-600 to-emerald-700',
    tag: '100% Fresh'
  },
  {
    id: 'nurseri',
    titleEn: 'Plant Nursery & Buggy Rides',
    titleMs: 'Nurseri Pokok & Lawatan Buggy',
    subEn: 'Flowers & Fruit Saplings',
    subMs: 'Pokok Bunga, Buah & Buggy Tour',
    descEn: 'Explore 500+ plant varieties on foot or ride our custom electric buggies (AG 1 & AG 2) around the farm grounds.',
    descMs: 'Jelajahi ratusan anak pokok buah kahwin dan pokok bunga, atau naiki buggy elektrik SAF untuk lawatan ladang santai.',
    icon: 'Sprout',
    color: 'from-emerald-600 to-teal-800',
    tag: 'Buggy Tour AG 1 & 2'
  },
  {
    id: 'baja',
    titleEn: 'Fertilizers & Soil',
    titleMs: 'Baja & Tanah Subur',
    subEn: 'Effective & Quality',
    subMs: 'Berkualiti & Berkesan',
    descEn: 'Official distributor of Long You 6-in-1 Organic Planting Soil and premier organic plant food.',
    descMs: 'Pembekal sah Tanah Organik Long You 6-in-1 dan pelbagai baja organik berkesan untuk kebun anda.',
    icon: 'Shovel',
    color: 'from-yellow-700 to-amber-950',
    tag: 'Long You 6-in-1'
  }
];

export const GALLERY_ITEMS = [
  {
    title: 'Perasmian Rasmi oleh TYT Yang di-Pertua Negeri Melaka',
    desc: 'TYT Tun Seri Setia Dr. Haji Mohd Ali bin Mohd Rustam menyempurnakan perasmian dengan menandatangani plak emas Synergy Agro Farm Bukit Katil & Pusat Latihan Agrofarm UGM - KADMDI.',
    src: '/images/saf-perasmian-tyt-signing.jpg',
    category: 'Perasmian Rasmi TYT'
  },
  {
    title: 'Majlis Penyampaian Sijil Latihan oleh TYT Melaka',
    desc: 'TYT Tun Seri Setia Dr. Haji Mohd Ali bin Mohd Rustam menyampaikan sijil penyertaan bengkel kemahiran kulinari & agro di dewan Synergy Agro Farm.',
    src: '/images/saf-penyampaian-sijil-tyt.jpg',
    category: 'Perasmian Rasmi TYT'
  },
  {
    title: 'SAF Electric Buggy Rides (AG 1 & AG 2) & Safari Tram',
    desc: 'Hop aboard our custom electric buggies AG 1, AG 2 and shaded tram carriage for a comfortable tour around the farm and nursery.',
    src: '/images/saf-buggy-ride.jpg',
    category: 'Farm Buggy Tour'
  },
  {
    title: 'Spacious Covered Event & Dining Pavilion',
    desc: 'High-ceiling open-air pavilion equipped with giant cooling fans, cozy dining setups, and lush green potted plants for functions & gatherings.',
    src: '/images/saf-event-hall.jpg',
    category: 'Event & Dining Hall'
  },
  {
    title: 'Covered Pavilion & Garden Lounge at Dusk',
    desc: 'Serene evening atmosphere with polished tile flooring, comfortable lounge sofas, and flowering bougainvillea pots.',
    src: '/images/saf-pavilion-dusk.jpg',
    category: 'Pavilion Ambience'
  },
  {
    title: 'Hands-on Culinary & Agriculture Workshops',
    desc: 'Fun interactive culinary masterclasses and farming activities hosted inside our farm venue with refreshments.',
    src: '/images/saf-workshop-class.jpg',
    category: 'Workshops & Activities'
  },
  {
    title: 'Greenhouse Nursery Aisles with Hanging Pots (RM10)',
    desc: 'Long gravel pathways beneath canopy shading showcasing healthy saplings and hanging decorative potted plants.',
    src: '/images/saf-nursery-aisle.jpg',
    category: 'Nursery Aisles'
  },
  {
    title: 'Greenhouse Nursery & Shaded Walkway',
    desc: 'Tranquil garden environment with hanging spider plants and potted aglaonemas.',
    src: '/images/saf-greenhouse-plants.jpg',
    category: 'Greenhouse Walkway'
  },
  {
    title: 'Legasi Coffee Official Menu Poster',
    desc: 'Heritage in every cup: Matcha creations, Spanish Latte, Kopi O Kaw, and rich cocoa drinks.',
    src: '/images/legasi-coffee-menu.png',
    category: 'Legasi Cafe Menu'
  },
  {
    title: 'Synergy Agro Farm Official Entrance Signboard',
    desc: 'Bukit Katil, Melaka landmark welcoming visitors daily from 8:00 AM to 6:00 PM.',
    src: '/images/saf-signboard.jpg',
    category: 'Main Entrance'
  },
  {
    title: 'Healthy Polybag Mango Fruit Trees',
    desc: 'Grafted hybrid saplings ready for home orchards and commercial farming on gravel beds.',
    src: '/images/saf-nursery-mango.jpg',
    category: 'Fruit Trees'
  },
  {
    title: 'Long You 6-in-1 Organic Soil Inventory',
    desc: 'Ready stock 28L organic planting soil bags and natural fertilizers for thriving gardens.',
    src: '/images/saf-organic-soil.jpg',
    category: 'Fertilizers & Soil'
  }
];
