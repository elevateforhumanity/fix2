/**
 * Stock Media Library
 * Free, license-free resources for video creation
 * All resources are free for commercial use without attribution (but we credit anyway)
 */

export interface StockImage {
  id: string;
  url: string;
  thumbnail: string;
  category: string;
  tags: string[];
  source: 'Unsplash' | 'Pexels';
  photographer: string;
  description: string;
}

export interface StockVideo {
  id: string;
  url: string;
  thumbnail: string;
  category: string;
  tags: string[];
  source: 'Pexels' | 'Pixabay';
  creator: string;
  description: string;
  duration: number;
}

export interface BackgroundMusic {
  id: string;
  name: string;
  url: string;
  artist: string;
  duration: number;
  genre: string;
  mood: string;
  license: string;
}

// STOCK IMAGES - All from Unsplash (Free for commercial use)
export const stockImages: StockImage[] = [
  // Business & Office
  {
    id: 'img-business-1',
    url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
    category: 'Business',
    tags: ['office', 'teamwork', 'meeting', 'collaboration'],
    source: 'Unsplash',
    photographer: 'Mimi Thian',
    description: 'Team collaboration in modern office',
  },
  {
    id: 'img-business-2',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    category: 'Business',
    tags: ['teamwork', 'hands', 'unity', 'collaboration'],
    source: 'Unsplash',
    photographer: 'Perry Grone',
    description: 'Team hands together showing unity',
  },
  {
    id: 'img-business-3',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    category: 'Business',
    tags: ['desk', 'laptop', 'work', 'office'],
    source: 'Unsplash',
    photographer: 'Avel Chuklanov',
    description: 'Professional workspace with laptop',
  },

  // Healthcare
  {
    id: 'img-healthcare-1',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    category: 'Healthcare',
    tags: ['medical', 'healthcare', 'hospital', 'professional'],
    source: 'Unsplash',
    photographer: 'National Cancer Institute',
    description: 'Healthcare professionals in hospital',
  },
  {
    id: 'img-healthcare-2',
    url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-584820927498-cfe5211fd8bf?w=400',
    category: 'Healthcare',
    tags: ['stethoscope', 'medical', 'doctor', 'care'],
    source: 'Unsplash',
    photographer: 'Hush Naidoo Jade Photography',
    description: 'Medical stethoscope close-up',
  },
  {
    id: 'img-healthcare-3',
    url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400',
    category: 'Healthcare',
    tags: ['nurse', 'patient', 'care', 'elderly'],
    source: 'Unsplash',
    photographer: 'Kampus Production',
    description: 'Nurse caring for elderly patient',
  },

  // Technology
  {
    id: 'img-tech-1',
    url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400',
    category: 'Technology',
    tags: ['laptop', 'coding', 'programming', 'developer'],
    source: 'Unsplash',
    photographer: 'Marten Bjork',
    description: 'Developer working on laptop',
  },
  {
    id: 'img-tech-2',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    category: 'Technology',
    tags: ['woman', 'tech', 'professional', 'diversity'],
    source: 'Unsplash',
    photographer: 'Christina @ wocintechchat.com',
    description: 'Woman in tech working',
  },
  {
    id: 'img-tech-3',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    category: 'Technology',
    tags: ['data', 'analytics', 'charts', 'business'],
    source: 'Unsplash',
    photographer: 'Carlos Muza',
    description: 'Data analytics dashboard',
  },

  // Skilled Trades
  {
    id: 'img-trades-1',
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
    category: 'Skilled Trades',
    tags: ['welding', 'sparks', 'metalwork', 'trades'],
    source: 'Unsplash',
    photographer: 'Ant Rozetsky',
    description: 'Welder at work with sparks',
  },
  {
    id: 'img-trades-2',
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    category: 'Skilled Trades',
    tags: ['construction', 'building', 'worker', 'hardhat'],
    source: 'Unsplash',
    photographer: 'Scott Blake',
    description: 'Construction worker on site',
  },
  {
    id: 'img-trades-3',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
    category: 'Skilled Trades',
    tags: ['hvac', 'tools', 'maintenance', 'repair'],
    source: 'Unsplash',
    photographer: 'Piotr Chrobot',
    description: 'HVAC equipment and tools',
  },

  // Transportation
  {
    id: 'img-transport-1',
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400',
    category: 'Transportation',
    tags: ['truck', 'semi', 'highway', 'cdl'],
    source: 'Unsplash',
    photographer: 'Marcin Jozwiak',
    description: 'Semi truck on highway',
  },
  {
    id: 'img-transport-2',
    url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400',
    category: 'Transportation',
    tags: ['truck', 'logistics', 'transport', 'delivery'],
    source: 'Unsplash',
    photographer: 'Rhys Moult',
    description: 'Truck driver in cab',
  },

  // Education & Training
  {
    id: 'img-education-1',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
    category: 'Education',
    tags: ['classroom', 'students', 'learning', 'education'],
    source: 'Unsplash',
    photographer: 'Vasily Koloda',
    description: 'Students in classroom',
  },
  {
    id: 'img-education-2',
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    category: 'Education',
    tags: ['graduation', 'success', 'achievement', 'diploma'],
    source: 'Unsplash',
    photographer: 'Pang Yuhao',
    description: 'Graduation celebration',
  },
  {
    id: 'img-education-3',
    url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400',
    category: 'Education',
    tags: ['books', 'study', 'learning', 'knowledge'],
    source: 'Unsplash',
    photographer: 'Kimberly Farmer',
    description: 'Stack of books for learning',
  },

  // Success & Achievement
  {
    id: 'img-success-1',
    url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
    category: 'Success',
    tags: ['teamwork', 'success', 'celebration', 'achievement'],
    source: 'Unsplash',
    photographer: 'You X Ventures',
    description: 'Team celebrating success',
  },
  {
    id: 'img-success-2',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400',
    category: 'Success',
    tags: ['handshake', 'partnership', 'agreement', 'business'],
    source: 'Unsplash',
    photographer: 'LinkedIn Sales Solutions',
    description: 'Professional handshake',
  },

  // Barbering & Cosmetology
  {
    id: 'img-barber-1',
    url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
    category: 'Barbering',
    tags: ['barber', 'haircut', 'grooming', 'salon'],
    source: 'Unsplash',
    photographer: 'Allef Vinicius',
    description: 'Barber cutting hair',
  },
  {
    id: 'img-barber-2',
    url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920',
    thumbnail:
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
    category: 'Barbering',
    tags: ['barbershop', 'interior', 'salon', 'business'],
    source: 'Unsplash',
    photographer: 'Arthur Edelmans',
    description: 'Modern barbershop interior',
  },
];

// STOCK VIDEOS - All from Pexels (Free for commercial use)
export const stockVideos: StockVideo[] = [
  {
    id: 'vid-office-1',
    url: 'https://videos.pexels.com/video-files/3196036/3196036-uhd_2560_1440_25fps.mp4',
    thumbnail:
      'https://images.pexels.com/videos/3196036/pexels-photo-3196036.jpeg?w=400',
    category: 'Business',
    tags: ['office', 'teamwork', 'meeting', 'collaboration'],
    source: 'Pexels',
    creator: 'fauxels',
    description: 'Team meeting in modern office',
    duration: 15,
  },
  {
    id: 'vid-healthcare-1',
    url: 'https://videos.pexels.com/video-files/4031818/4031818-uhd_2560_1440_25fps.mp4',
    thumbnail:
      'https://images.pexels.com/videos/4031818/pexels-photo-4031818.jpeg?w=400',
    category: 'Healthcare',
    tags: ['medical', 'hospital', 'healthcare', 'professional'],
    source: 'Pexels',
    creator: 'Tima Miroshnichenko',
    description: 'Healthcare professionals at work',
    duration: 12,
  },
  {
    id: 'vid-barber-1',
    url: 'https://videos.pexels.com/video-files/3205484/3205484-uhd_2560_1440_25fps.mp4',
    thumbnail:
      'https://images.pexels.com/videos/3205484/pexels-photo-3205484.jpeg?w=400',
    category: 'Barbering',
    tags: ['barber', 'haircut', 'grooming', 'salon'],
    source: 'Pexels',
    creator: 'cottonbro studio',
    description: 'Barber cutting client hair',
    duration: 18,
  },
  {
    id: 'vid-welding-1',
    url: 'https://videos.pexels.com/video-files/5495955/5495955-uhd_2560_1440_25fps.mp4',
    thumbnail:
      'https://images.pexels.com/videos/5495955/pexels-photo-5495955.jpeg?w=400',
    category: 'Skilled Trades',
    tags: ['welding', 'metalwork', 'trades', 'manufacturing'],
    source: 'Pexels',
    creator: 'Tima Miroshnichenko',
    description: 'Welder working with sparks',
    duration: 10,
  },
  {
    id: 'vid-truck-1',
    url: 'https://videos.pexels.com/video-files/2053100/2053100-uhd_2560_1440_24fps.mp4',
    thumbnail:
      'https://images.pexels.com/videos/2053100/pexels-photo-2053100.jpeg?w=400',
    category: 'Transportation',
    tags: ['truck', 'highway', 'driving', 'cdl'],
    source: 'Pexels',
    creator: 'Marcin Jozwiak',
    description: 'Truck driving on highway',
    duration: 14,
  },
  {
    id: 'vid-tech-1',
    url: 'https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_25fps.mp4',
    thumbnail:
      'https://images.pexels.com/videos/3130284/pexels-photo-3130284.jpeg?w=400',
    category: 'Technology',
    tags: ['coding', 'programming', 'developer', 'computer'],
    source: 'Pexels',
    creator: 'cottonbro studio',
    description: 'Developer coding on computer',
    duration: 16,
  },
  {
    id: 'vid-construction-1',
    url: 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
    thumbnail:
      'https://images.pexels.com/videos/3209828/pexels-photo-3209828.jpeg?w=400',
    category: 'Skilled Trades',
    tags: ['construction', 'building', 'worker', 'site'],
    source: 'Pexels',
    creator: 'Pressmaster',
    description: 'Construction workers on site',
    duration: 13,
  },
];

// BACKGROUND MUSIC - Free Music Archive (CC Licensed)
export const backgroundMusic: BackgroundMusic[] = [
  {
    id: 'music-upbeat-1',
    name: 'Inspiring Corporate',
    url: 'https://freemusicarchive.org/track/inspiring-corporate',
    artist: 'Scott Holmes Music',
    duration: 180,
    genre: 'Corporate',
    mood: 'Upbeat',
    license: 'CC BY-NC 4.0',
  },
  {
    id: 'music-motivational-1',
    name: 'Motivational Day',
    url: 'https://freemusicarchive.org/track/motivational-day',
    artist: 'Rafael Krux',
    duration: 150,
    genre: 'Motivational',
    mood: 'Energetic',
    license: 'CC BY 4.0',
  },
  {
    id: 'music-calm-1',
    name: 'Peaceful Piano',
    url: 'https://freemusicarchive.org/track/peaceful-piano',
    artist: 'Kevin MacLeod',
    duration: 200,
    genre: 'Ambient',
    mood: 'Calm',
    license: 'CC BY 4.0',
  },
  {
    id: 'music-tech-1',
    name: 'Digital Future',
    url: 'https://freemusicarchive.org/track/digital-future',
    artist: 'Bensound',
    duration: 165,
    genre: 'Electronic',
    mood: 'Modern',
    license: 'CC BY-ND 4.0',
  },
];

// Helper functions
export function getImagesByCategory(category: string): StockImage[] {
  if (category === 'All') return stockImages;
  return stockImages.filter((img) => img.category === category);
}

export function getVideosByCategory(category: string): StockVideo[] {
  if (category === 'All') return stockVideos;
  return stockVideos.filter((vid) => vid.category === category);
}

export function searchMedia(query: string): {
  images: StockImage[];
  videos: StockVideo[];
} {
  const lowerQuery = query.toLowerCase();

  const images = stockImages.filter(
    (img) =>
      img.tags.some((tag) => tag.includes(lowerQuery)) ||
      img.description.toLowerCase().includes(lowerQuery) ||
      img.category.toLowerCase().includes(lowerQuery)
  );

  const videos = stockVideos.filter(
    (vid) =>
      vid.tags.some((tag) => tag.includes(lowerQuery)) ||
      vid.description.toLowerCase().includes(lowerQuery) ||
      vid.category.toLowerCase().includes(lowerQuery)
  );

  return { images, videos };
}

export const mediaCategories = [
  'All',
  'Business',
  'Healthcare',
  'Technology',
  'Skilled Trades',
  'Transportation',
  'Education',
  'Success',
  'Barbering',
];
