export const additionalProducts = [

  {
    id: 7,
    name_fr: "SSD NVMe Samsung 980 Pro 1TB - Lecture 7000MB/s",
    name_ar: "قرص SSD NVMe سامسونج 980 برو 1 تيرابايت - سرعة قراءة 7000 ميجابايت/ثانية",
    slug: "ssd-samsung-980-pro-1tb",
    price: 890,
    compare_price: 1290,
    stock_qty: 0, // Out of stock example
    image: {
      url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
      alt: "SSD Samsung 980 Pro"
    }
  },
  {
    id: 8,
    name_fr: "Routeur Wi-Fi 6 TP-Link Archer AX73 - Double Bande Gigabit",
    name_ar: "راوتر وايفاي 6 تي بي لينك آرتشر AX73 - مزدوج النطاق جيجابت",
    slug: "routeur-wifi6-tplink-ax73",
    price: 990,
    compare_price: null,
    stock_qty: 18,
    image: {
      url: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=400&h=400&fit=crop",
      alt: "Routeur TP-Link Wi-Fi 6"
    }
  },
  {
    id: 9,
    name_fr: "Casque Gaming Sans Fil HyperX Cloud Alpha Wireless - Autonomie 300h",
    name_ar: "سماعة ألعاب لاسلكية هايبر إكس كلاود ألفا وايرلس - عمر بطارية 300 ساعة",
    slug: "casque-gaming-hyperx-cloud-alpha-wireless",
    price: 1490,
    compare_price: 1890,
    stock_qty: 7,
    image: {
      url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=400&fit=crop",
      alt: "Casque HyperX Cloud Alpha"
    }
  },
  {
    id: 10,
    name_fr: "Webcam professionnelle 1080p avec micro intégré - Idéal pour télétravail",
    name_ar: "كاميرا ويب احترافية 1080p مع ميكروفون مدمج - مثالية للعمل عن بعد",
    slug: "webcam-professionnelle-1080p",
    price: 390,
    compare_price: 590,
    stock_qty: 30,
    image: {
      url: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=400&h=400&fit=crop",
      alt: "Webcam professionnelle"
    }
  }
];

// products.ts

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  category: 'Laptop' | 'Desktop' | 'Gaming' | 'Ultrabook' | 'Workstation';
  images: string[];
  specs?: {
    processor?: string;
    ram?: string;
    storage?: string;
    graphics?: string;
    display?: string;
  };
  rating?: number;
  inStock?: boolean;
  descriptionHtml?: string;
  technicalSheet?: { label: string; value: string }[];
  brand?: string
  createdAt?:number
}

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const fakeProducts: Product[] = [
  {
  id: 'prod-001',
  slug: 'macbook-pro-14-m3-pro-chip',
  title: 'MacBook Pro 14" - M3 Pro Chip',
  description: 'The MacBook Pro 14" with M3 Pro chip delivers exceptional performance...',
  price: 1999.99,
  category: 'Laptop',
  images: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format',
  ],

  descriptionHtml: `
  <div class="product-content">
    <img
      src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format"
      alt="MacBook Pro"
      style="width:100%;max-width:400px;border-radius:12px;margin-bottom:24px;"
    />

    <h2>Professional Performance</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
      sollicitudin, augue et tristique faucibus, massa lorem tincidunt
      sapien, nec malesuada erat justo vel libero. Integer pretium magna
      vel felis dignissim, non tempus ipsum luctus.
    </p>

    <p>
      Suspendisse potenti. Vivamus viverra, erat et vulputate luctus,
      purus risus tempor erat, non pulvinar nisi augue in lorem.
      Curabitur finibus hendrerit sem, vel hendrerit orci vestibulum sit
      amet. Cras euismod faucibus neque, vitae pulvinar libero gravida at.
    </p>

    <h2>Built For Creators</h2>

    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem
      accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
      quae ab illo inventore veritatis et quasi architecto beatae vitae.
    </p>

    <p>
      Fusce convallis urna non elit aliquet, at scelerisque erat
      tristique. Aliquam erat volutpat. Nam efficitur neque id augue
      malesuada, nec bibendum ipsum volutpat.
    </p>

    <img
      src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format"
      alt="MacBook Detail"
      style="width:100%;max-width:400px;border-radius:12px;margin:24px 0;"
    />

    <h2>Premium Experience</h2>

    <p>
      Pellentesque habitant morbi tristique senectus et netus et
      malesuada fames ac turpis egestas. Integer dictum nisi at
      condimentum pulvinar. Nulla facilisi.
    </p>

    <p>
      Aenean sit amet erat ac ligula suscipit maximus. Vestibulum
      tincidunt, augue eget aliquam tincidunt, lacus lectus facilisis
      purus, nec efficitur ipsum massa non turpis.
    </p>

    <p>
      Mauris fermentum, odio sit amet suscipit volutpat, lorem elit
      interdum nibh, sed gravida erat elit ut lorem. Integer vel
      scelerisque velit. Morbi aliquet purus vitae ipsum facilisis
      hendrerit.
    </p>
  </div>
`,

  technicalSheet: [
    { label: 'Reference', value: 'AX-7845-ZX' },
    { label: 'Series', value: 'Nova Ultra' },
    { label: 'Architecture', value: 'QuantumCore X' },
    { label: 'Cooling System', value: 'HyperFlow V4' },
    { label: 'Memory Bus', value: 'FusionLink 512' },
    { label: 'Storage Type', value: 'UltraSpeed Matrix SSD' },
    { label: 'Display Coating', value: 'CrystalVision Pro' },
    { label: 'Chassis Material', value: 'AeroTitan Alloy' },
    { label: 'Audio Engine', value: 'SonicSphere 8D' },
    { label: 'Wireless Module', value: 'SkyLink AX9000' },
    { label: 'Power Profile', value: 'DynamicBoost Max' },
    { label: 'Security Layer', value: 'SecureVault 3.0' },
    { label: 'Thermal Rating', value: 'T-Class 95' },
    { label: 'Expansion Port', value: 'FlexConnect Gen 5' },
    { label: 'Certification', value: 'PrimeTech Certified' },
    { label: 'Manufacturing Code', value: 'MC-2048-ALPHA' },
  ],

  specs: {
    processor: 'Apple M3 Pro (12-core)',
    ram: '18GB Unified',
    storage: '512GB SSD',
    graphics: '18-core GPU',
    display: '14.2" Liquid Retina XDR',
  },

  rating: 4.8,
  inStock: true,
},
  {
    id: 'prod-002',
    slug: 'dell-xps-15-creator-edition',
    title: 'Dell XPS 15 - Creator Edition',
    description: 'Ultimate laptop for creators and professionals. The Dell XPS 15 features a 15.6" OLED 3.5K display, Intel Core i9-13900H processor, NVIDIA GeForce RTX 4070, and 32GB RAM. Perfect for video editing, 3D rendering, and multitasking.',
    price: 2499.99,
    category: 'Laptop',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format',
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format',
    ],
    specs: {
      processor: 'Intel Core i9-13900H',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD',
      graphics: 'NVIDIA RTX 4070 8GB',
      display: '15.6" OLED 3.5K Touch',
    },
    rating: 4.7,
    inStock: true,
  },
  {
    id: 'prod-003',
    slug: 'alienware-aurora-r16-gaming-desktop',
    title: 'Alienware Aurora R16 Gaming Desktop',
    description: 'High-performance gaming desktop built for ultimate gaming experiences. Features Intel Core i9-14900K processor, NVIDIA GeForce RTX 4090, 64GB DDR5 RAM, and 2TB NVMe SSD. Liquid cooling system and customizable RGB lighting.',
    price: 3499.99,
    category: 'Desktop',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format',
      'https://images.unsplash.com/photo-1587202372634-32705e3a49b5?w=800&auto=format',
      'https://images.unsplash.com/photo-1591488322449-5f6e3063f34c?w=800&auto=format',
    ],
    specs: {
      processor: 'Intel Core i9-14900K',
      ram: '64GB DDR5 5600MHz',
      storage: '2TB NVMe SSD + 2TB HDD',
      graphics: 'NVIDIA RTX 4090 24GB',
      display: 'Not included',
    },
    rating: 4.9,
    inStock: true,
  },
  {
    id: 'prod-004',
    slug: 'asus-rog-zephyrus-g14',
    title: 'ASUS ROG Zephyrus G14',
    description: 'Compact gaming laptop with AMD Ryzen 9 and NVIDIA RTX 4060. 14" QHD+ 165Hz display, 16GB RAM, 1TB SSD. Perfect for gaming on the go with excellent battery life and premium build quality.',
    price: 1599.99,
    category: 'Gaming',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format',
      'https://images.unsplash.com/photo-1603302524992-464ae0c6cfd7?w=800&auto=format',
      'https://images.unsplash.com/photo-1593642702909-dec73df255d7?w=800&auto=format',
    ],
    specs: {
      processor: 'AMD Ryzen 9 7940HS',
      ram: '16GB DDR5',
      storage: '1TB NVMe SSD',
      graphics: 'NVIDIA RTX 4060 8GB',
      display: '14" QHD+ 165Hz',
    },
    rating: 4.6,
    inStock: false,
  },
  // Add these 6 similar products to your fakeProducts array

{
  id: 'prod-005',
  slug: 'hp-spectre-x360-14',
  title: 'HP Spectre x360 14" 2-in-1',
  description: 'Premium convertible laptop with Intel Core i7-1355U, 16GB RAM, 1TB SSD, and 14" OLED touch display. Perfect for professionals on the go.',
  price: 1799.99,
  category: 'Laptop',
  images: [
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format',
    'https://images.unsplash.com/photo-1593642702909-dec73df255d7?w=800&auto=format',
  ],
  descriptionHtml: `
    <div class="product-content">
      <img src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format" alt="HP Spectre x360" style="width:100%;max-width:400px;border-radius:12px;margin-bottom:24px;" />
      <h2>Ultimate Flexibility</h2>
      <p>The HP Spectre x360 combines premium design with versatile 2-in-1 functionality. Whether you need a laptop for work or a tablet for creativity, this device adapts to your needs.</p>
      <h2>Stunning OLED Display</h2>
      <p>The 14" OLED touch display delivers perfect blacks and vibrant colors, making it ideal for content creation and media consumption.</p>
      <h2>All-Day Battery Life</h2>
      <p>With up to 12 hours of battery life, you can work all day without searching for an outlet.</p>
    </div>
  `,
  technicalSheet: [
    { label: 'Fonctions', value: 'Travail, Créativité, Multimédia' },
    { label: 'Processeur', value: 'Intel Core i7-1355U' },
    { label: 'RAM', value: '16GB LPDDR5' },
    { label: 'Stockage', value: '1TB NVMe SSD' },
    { label: 'Carte graphique', value: 'Intel Iris Xe' },
    { label: 'Écran', value: '14" OLED 2.8K Touch' },
    { label: 'Qualité d\'affichage', value: '500 nits, 100% DCI-P3' },
    { label: 'Connectivité', value: 'Wi-Fi 6E, Bluetooth 5.3, 2x Thunderbolt 4' },
    { label: 'Autonomie', value: 'Jusqu\'à 12 heures' },
    { label: 'Poids', value: '1.36 kg' },
    { label: 'Système d\'exploitation', value: 'Windows 11 Pro' },
    { label: 'Garantie', value: '1 an' },
  ],
  specs: {
    processor: 'Intel Core i7-1355U',
    ram: '16GB LPDDR5',
    storage: '1TB NVMe SSD',
    graphics: 'Intel Iris Xe',
    display: '14" OLED 2.8K Touch',
  },
  rating: 4.7,
  inStock: true,
},
{
  id: 'prod-006',
  slug: 'lenovo-thinkpad-x1-carbon-gen-12',
  title: 'Lenovo ThinkPad X1 Carbon Gen 12',
  description: 'Ultra-premium business laptop with Intel Core i7-1370P, 32GB RAM, 1TB SSD, and 14" 2.8K OLED display. Military-grade durability meets professional performance.',
  price: 2299.99,
  category: 'Laptop',
  images: [
    'https://images.unsplash.com/photo-1629131721725-ebc29f95d11c?w=800&auto=format',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format',
  ],
  descriptionHtml: `
    <div class="product-content">
      <img src="https://images.unsplash.com/photo-1629131721725-ebc29f95d11c?w=600&auto=format" alt="Lenovo ThinkPad X1 Carbon" style="width:100%;max-width:400px;border-radius:12px;margin-bottom:24px;" />
      <h2>Business Class Excellence</h2>
      <p>The ThinkPad X1 Carbon is the gold standard for business laptops. Ultra-light, ultra-durable, and packed with enterprise-grade security features.</p>
      <h2>Military-Grade Durability</h2>
      <p>Tested against 12 military-grade requirements, this laptop can withstand drops, spills, and extreme temperatures.</p>
      <h2>Best-in-Class Keyboard</h2>
      <p>Legendary ThinkPad keyboard with 1.5mm key travel for comfortable and accurate typing all day long.</p>
    </div>
  `,
  technicalSheet: [
    { label: 'Fonctions', value: 'Business, Sécurité, Productivité' },
    { label: 'Processeur', value: 'Intel Core i7-1370P vPro' },
    { label: 'RAM', value: '32GB LPDDR5' },
    { label: 'Stockage', value: '1TB NVMe SSD' },
    { label: 'Carte graphique', value: 'Intel Iris Xe' },
    { label: 'Écran', value: '14" 2.8K OLED' },
    { label: 'Qualité d\'affichage', value: '400 nits, anti-reflet' },
    { label: 'Connectivité', value: 'Wi-Fi 6E, Bluetooth 5.3, 2x Thunderbolt 4, HDMI, USB-A' },
    { label: 'Autonomie', value: 'Jusqu\'à 15 heures' },
    { label: 'Poids', value: '1.12 kg' },
    { label: 'Sécurité', value: 'Lecteur d\'empreintes, IR Camera, dTPM 2.0' },
    { label: 'Garantie', value: '3 ans' },
  ],
  specs: {
    processor: 'Intel Core i7-1370P',
    ram: '32GB LPDDR5',
    storage: '1TB NVMe SSD',
    graphics: 'Intel Iris Xe',
    display: '14" 2.8K OLED',
  },
  rating: 4.9,
  inStock: true,
},
{
  id: 'prod-007',
  slug: 'microsoft-surface-laptop-studio-2',
  title: 'Microsoft Surface Laptop Studio 2',
  description: 'Creative powerhouse with Intel Core i7-13800H, NVIDIA RTX 4060, 32GB RAM, 1TB SSD, and unique 14.4" 120Hz touch display. Dynamic woven hinge for laptop, stage, and studio modes.',
  price: 2799.99,
  category: 'Laptop',
  images: [
    'https://images.unsplash.com/photo-1629131721725-ebc29f95d11c?w=800&auto=format',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format',
  ],
  descriptionHtml: `
    <div class="product-content">
      <img src="https://images.unsplash.com/photo-1629131721725-ebc29f95d11c?w=600&auto=format" alt="Surface Laptop Studio 2" style="width:100%;max-width:400px;border-radius:12px;margin-bottom:24px;" />
      <h2>Three Modes, Infinite Possibilities</h2>
      <p>The unique Dynamic Woven Hinge allows you to switch between Laptop Mode, Stage Mode, and Studio Mode for any creative task.</p>
      <h2>Creative Power</h2>
      <p>With NVIDIA RTX 4060 graphics and Intel Core i7 processor, this laptop handles 3D rendering, video editing, and gaming with ease.</p>
      <h2>Precision Touch</h2>
      <p>120Hz HDR display with Surface Slim Pen 2 support delivers natural writing and drawing experience.</p>
    </div>
  `,
  technicalSheet: [
    { label: 'Fonctions', value: 'Créativité, Design, Gaming' },
    { label: 'Processeur', value: 'Intel Core i7-13800H' },
    { label: 'RAM', value: '32GB LPDDR5x' },
    { label: 'Stockage', value: '1TB NVMe SSD' },
    { label: 'Carte graphique', value: 'NVIDIA RTX 4060 8GB' },
    { label: 'Écran', value: '14.4" 120Hz Touch' },
    { label: 'Qualité d\'affichage', value: 'HDR, Dolby Vision' },
    { label: 'Connectivité', value: 'Wi-Fi 6E, Bluetooth 5.3, 2x USB-C, USB-A, SD Card' },
    { label: 'Autonomie', value: 'Jusqu\'à 8 heures' },
    { label: 'Poids', value: '1.98 kg' },
    { label: 'Stylet inclus', value: 'Surface Slim Pen 2' },
    { label: 'Garantie', value: '1 an' },
  ],
  specs: {
    processor: 'Intel Core i7-13800H',
    ram: '32GB LPDDR5x',
    storage: '1TB NVMe SSD',
    graphics: 'NVIDIA RTX 4060 8GB',
    display: '14.4" 120Hz Touch',
  },
  rating: 4.8,
  inStock: true,
},
{
  id: 'prod-008',
  slug: 'razer-blade-15',
  title: 'Razer Blade 15 Gaming Laptop',
  description: 'Sleek gaming laptop with Intel Core i9-13900H, NVIDIA RTX 4070, 16GB RAM, 1TB SSD, and 15.6" 240Hz QHD display. Premium aluminum chassis and customizable RGB keyboard.',
  price: 2999.99,
  category: 'Gaming',
  images: [
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format',
    'https://images.unsplash.com/photo-1593642702909-dec73df255d7?w=800&auto=format',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format',
  ],
  descriptionHtml: `
    <div class="product-content">
      <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format" alt="Razer Blade 15" style="width:100%;max-width:400px;border-radius:12px;margin-bottom:24px;" />
      <h2>Ultra-Slim Gaming Power</h2>
      <p>The Razer Blade 15 proves that gaming laptops don't have to be bulky. At just 0.67" thin, it packs desktop-class performance.</p>
      <h2>240Hz Gaming Display</h2>
      <p>Buttery smooth 240Hz QHD display gives you the competitive edge in fast-paced games.</p>
      <h2>Premium Build Quality</h2>
      <p>CNC-milled aluminum unibody construction provides durability and a premium feel.</p>
    </div>
  `,
  technicalSheet: [
    { label: 'Fonctions', value: 'Gaming, Streaming, Créativité' },
    { label: 'Processeur', value: 'Intel Core i9-13900H' },
    { label: 'RAM', value: '16GB DDR5' },
    { label: 'Stockage', value: '1TB NVMe SSD' },
    { label: 'Carte graphique', value: 'NVIDIA RTX 4070 8GB' },
    { label: 'Écran', value: '15.6" QHD 240Hz' },
    { label: 'Qualité d\'affichage', value: '100% DCI-P3' },
    { label: 'Connectivité', value: 'Wi-Fi 6E, Bluetooth 5.3, Thunderbolt 4, HDMI 2.1' },
    { label: 'Autonomie', value: 'Jusqu\'à 6 heures' },
    { label: 'Poids', value: '2.01 kg' },
    { label: 'RGB Clavier', value: 'Razer Chroma RGB' },
    { label: 'Garantie', value: '1 an' },
  ],
  specs: {
    processor: 'Intel Core i9-13900H',
    ram: '16GB DDR5',
    storage: '1TB NVMe SSD',
    graphics: 'NVIDIA RTX 4070 8GB',
    display: '15.6" QHD 240Hz',
  },
  rating: 4.8,
  inStock: true,
},
{
  id: 'prod-009',
  slug: 'lg-gram-17-2024',
  title: 'LG Gram 17" 2024',
  description: 'Ultra-lightweight 17-inch laptop with Intel Core i7-1360P, 16GB RAM, 1TB SSD, and 17" WQXGA display. Weighs only 1.35kg despite the large screen.',
  price: 1899.99,
  category: 'Laptop',
  images: [
    'https://images.unsplash.com/photo-1593642702909-dec73df255d7?w=800&auto=format',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format',
    'https://images.unsplash.com/photo-1629131721725-ebc29f95d11c?w=800&auto=format',
  ],
  descriptionHtml: `
    <div class="product-content">
      <img src="https://images.unsplash.com/photo-1593642702909-dec73df255d7?w=600&auto=format" alt="LG Gram 17" style="width:100%;max-width:400px;border-radius:12px;margin-bottom:24px;" />
      <h2>Big Screen, Ultra-Light</h2>
      <p>The LG Gram 17 combines a massive 17-inch display with incredible portability at just 1.35kg.</p>
      <h2>All-Day Productivity</h2>
      <p>With up to 17 hours of battery life, you can work anywhere without worrying about charging.</p>
      <h2>MIL-STD-810G Durability</h2>
      <p>Despite its light weight, the Gram 17 meets military durability standards.</p>
    </div>
  `,
  technicalSheet: [
    { label: 'Fonctions', value: 'Productivité, Voyage, Multimédia' },
    { label: 'Processeur', value: 'Intel Core i7-1360P' },
    { label: 'RAM', value: '16GB LPDDR5' },
    { label: 'Stockage', value: '1TB NVMe SSD' },
    { label: 'Carte graphique', value: 'Intel Iris Xe' },
    { label: 'Écran', value: '17" WQXGA' },
    { label: 'Qualité d\'affichage', value: '350 nits, 99% DCI-P3' },
    { label: 'Connectivité', value: 'Wi-Fi 6E, Bluetooth 5.3, 2x USB-C, HDMI, USB-A' },
    { label: 'Autonomie', value: 'Jusqu\'à 17 heures' },
    { label: 'Poids', value: '1.35 kg' },
    { label: 'Certification', value: 'Intel Evo' },
    { label: 'Garantie', value: '2 ans' },
  ],
  specs: {
    processor: 'Intel Core i7-1360P',
    ram: '16GB LPDDR5',
    storage: '1TB NVMe SSD',
    graphics: 'Intel Iris Xe',
    display: '17" WQXGA',
  },
  rating: 4.6,
  inStock: true,
},
{
  id: 'prod-010',
  slug: 'acer-predator-helios-16',
  title: 'Acer Predator Helios 16',
  description: 'Hardcore gaming laptop with Intel Core i9-13900HX, NVIDIA RTX 4080, 32GB RAM, 2TB SSD, and 16" 240Hz Mini-LED display. Liquid metal cooling for maximum performance.',
  price: 3299.99,
  category: 'Gaming',
  images: [
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format',
    'https://images.unsplash.com/photo-1591488322449-5f6e3063f34c?w=800&auto=format',
    'https://images.unsplash.com/photo-1587202372634-32705e3a49b5?w=800&auto=format',
  ],
  descriptionHtml: `
    <div class="product-content">
      <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format" alt="Acer Predator Helios 16" style="width:100%;max-width:400px;border-radius:12px;margin-bottom:24px;" />
      <h2>Ultimate Gaming Performance</h2>
      <p>The Predator Helios 16 is built for gamers who demand the best. With Intel Core i9 and NVIDIA RTX 4080, it handles any game at max settings.</p>
      <h2>Mini-LED Display</h2>
      <p>The 16" Mini-LED display delivers incredible contrast and brightness for the most immersive gaming experience.</p>
      <h2>Advanced Cooling System</h2>
      <p>Liquid metal thermal compound and 5th Gen AeroBlade fans keep the system cool under pressure.</p>
    </div>
  `,
  technicalSheet: [
    { label: 'Fonctions', value: 'Gaming, Streaming, Création' },
    { label: 'Processeur', value: 'Intel Core i9-13900HX' },
    { label: 'RAM', value: '32GB DDR5' },
    { label: 'Stockage', value: '2TB NVMe SSD' },
    { label: 'Carte graphique', value: 'NVIDIA RTX 4080 12GB' },
    { label: 'Écran', value: '16" Mini-LED 240Hz' },
    { label: 'Qualité d\'affichage', value: '1000 nits, HDR 1000' },
    { label: 'Connectivité', value: 'Wi-Fi 6E, Bluetooth 5.3, Thunderbolt 4, HDMI 2.1' },
    { label: 'Autonomie', value: 'Jusqu\'à 5 heures' },
    { label: 'Poids', value: '2.8 kg' },
    { label: 'Refroidissement', value: 'Liquid Metal + 5ème Gen AeroBlade' },
    { label: 'Garantie', value: '2 ans' },
  ],
  specs: {
    processor: 'Intel Core i9-13900HX',
    ram: '32GB DDR5',
    storage: '2TB NVMe SSD',
    graphics: 'NVIDIA RTX 4080 12GB',
    display: '16" Mini-LED 240Hz',
  },
  rating: 4.9,
  inStock: true,
},
];

// Optional: Add a function to auto-generate slugs if needed
export const addSlugsToProducts = (products: Omit<Product, 'slug'>[]): Product[] => {
  return products.map(product => ({
    ...product,
    slug: generateSlug(product.title),
  }));
};

// Helper function to get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return fakeProducts.find(product => product.slug === slug);
};

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return fakeProducts.find(product => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category: Product['category']): Product[] => {
  return fakeProducts.filter(product => product.category === category);
};

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return fakeProducts.filter(product => product.rating && product.rating >= 4.7);
};

// Helper function to get products in stock
export const getInStockProducts = (): Product[] => {
  return fakeProducts.filter(product => product.inStock);
};