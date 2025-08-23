import { Category } from '../constants';

export const plantDatabase = [
  {
    id: 1,
    name: 'Snake Plant',
    price: 25,
    categories: [Category.INDOOR, Category.AIR_PURIFYING, Category.LOW_MAINTENANCE],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/snakeplant/400/400',
    description: 'Known for its air-purifying qualities and tolerance for low light.'
  },
  {
    id: 2,
    name: 'Monstera Deliciosa',
    price: 45,
    categories: [Category.INDOOR, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/monstera/400/400',
    description: 'Features iconic split leaves, making a bold statement in any room.'
  },
  {
    id: 3,
    name: 'Spider Plant',
    price: 15,
    categories: [Category.INDOOR, Category.AIR_PURIFYING, Category.PET_FRIENDLY],
    inStock: false,
    imageUrl: 'https://picsum.photos/seed/spiderplant/400/400',
    description: 'Easy to grow and propagate, with arching leaves and baby plantlets.'
  },
  {
    id: 4,
    name: 'Pothos',
    price: 18,
    categories: [Category.INDOOR, Category.LOW_MAINTENANCE, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/pothos/400/400',
    description: 'A forgiving trailing vine that thrives in a variety of conditions.'
  },
  {
    id: 5,
    name: 'ZZ Plant',
    price: 30,
    categories: [Category.INDOOR, Category.LOW_MAINTENANCE, Category.AIR_PURIFYING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/zzplant/400/400',
    description: 'Extremely drought-tolerant with glossy, dark green leaves.'
  },
  {
    id: 6,
    name: 'Fiddle Leaf Fig',
    price: 75,
    categories: [Category.INDOOR, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/fiddlefig/400/400',
    description: 'A popular but fussy tree with large, violin-shaped leaves.'
  },
  {
    id: 7,
    name: 'Echeveria',
    price: 12,
    categories: [Category.SUCCULENT, Category.INDOOR, Category.LOW_MAINTENANCE],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/echeveria/400/400',
    description: 'A rosette-forming succulent available in various colors.'
  },
  {
    id: 8,
    name: 'Aloe Vera',
    price: 20,
    categories: [Category.SUCCULENT, Category.INDOOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/aloe/400/400',
    description: 'Famous for its medicinal gel and easy care.'
  },
  {
    id: 9,
    name: 'Peace Lily',
    price: 28,
    categories: [Category.INDOOR, Category.AIR_PURIFYING, Category.FLOWERING],
    inStock: false,
    imageUrl: 'https://picsum.photos/seed/peacelily/400/400',
    description: 'Elegant plant with dark leaves and white spathe flowers.'
  },
  {
    id: 10,
    name: 'Lavender',
    price: 22,
    categories: [Category.OUTDOOR, Category.FLOWERING, Category.HERB],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/lavender/400/400',
    description: 'A fragrant herb known for its beautiful purple flowers and calming scent.'
  },
  // ... Adding more plants to reach 50
  {
    id: 11,
    name: 'Rubber Plant',
    price: 35,
    categories: [Category.INDOOR, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/rubberplant/400/400',
    description: 'A tough plant with striking, glossy, dark green leaves.'
  },
  {
    id: 12,
    name: 'Calathea Orbifolia',
    price: 40,
    categories: [Category.INDOOR, Category.PET_FRIENDLY, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/calathea/400/400',
    description: 'Features large, round leaves with beautiful silver stripes.'
  },
  {
    id: 13,
    name: 'Bird of Paradise',
    price: 60,
    categories: [Category.INDOOR, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/birdofparadise/400/400',
    description: 'A large, tropical plant with banana-like leaves.'
  },
  {
    id: 14,
    name: 'Jade Plant',
    price: 18,
    categories: [Category.SUCCULENT, Category.INDOOR, Category.LOW_MAINTENANCE],
    inStock: false,
    imageUrl: 'https://picsum.photos/seed/jade/400/400',
    description: 'A popular good luck succulent with thick, woody stems.'
  },
  {
    id: 15,
    name: 'Boston Fern',
    price: 25,
    categories: [Category.INDOOR, Category.PET_FRIENDLY, Category.AIR_PURIFYING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/bostonfern/400/400',
    description: 'A classic fern with feathery fronds that loves humidity.'
  },
  {
    id: 16,
    name: 'Anthurium',
    price: 32,
    categories: [Category.INDOOR, Category.FLOWERING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/anthurium/400/400',
    description: 'Known for its bright, heart-shaped waxy flowers.'
  },
  {
    id: 17,
    name: 'String of Pearls',
    price: 20,
    categories: [Category.SUCCULENT, Category.INDOOR, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/stringofpearls/400/400',
    description: 'A unique trailing succulent with pearl-like leaves.'
  },
  {
    id: 18,
    name: 'Orchid',
    price: 50,
    categories: [Category.INDOOR, Category.FLOWERING, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/orchid/400/400',
    description: 'An elegant flowering plant with long-lasting, exotic blooms.'
  },
  {
    id: 19,
    name: 'Rosemary',
    price: 15,
    categories: [Category.OUTDOOR, Category.HERB],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/rosemary/400/400',
    description: 'A fragrant culinary herb with needle-like leaves.'
  },
  {
    id: 20,
    name: 'Basil',
    price: 10,
    categories: [Category.OUTDOOR, Category.HERB],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/basil/400/400',
    description: 'A popular culinary herb, essential for Italian dishes.'
  },
  {
    id: 21,
    name: 'Mint',
    price: 8,
    categories: [Category.OUTDOOR, Category.HERB, Category.LOW_MAINTENANCE],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/mint/400/400',
    description: 'A fast-growing herb perfect for drinks and desserts.'
  },
  {
    id: 22,
    name: 'Chinese Money Plant',
    price: 22,
    categories: [Category.INDOOR, Category.PET_FRIENDLY],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/chinesemoney/400/400',
    description: 'Features unique, coin-shaped leaves and is easy to propagate.'
  },
  {
    id: 23,
    name: 'Air Plant (Tillandsia)',
    price: 10,
    categories: [Category.INDOOR, Category.LOW_MAINTENANCE, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/airplant/400/400',
    description: 'A unique plant that doesn\'t need soil to grow.'
  },
  {
    id: 24,
    name: 'Croton',
    price: 30,
    categories: [Category.INDOOR, Category.HOME_DECOR],
    inStock: false,
    imageUrl: 'https://picsum.photos/seed/croton/400/400',
    description: 'Known for its vibrant, multi-colored foliage.'
  },
  {
    id: 25,
    name: 'Areca Palm',
    price: 55,
    categories: [Category.INDOOR, Category.PET_FRIENDLY, Category.AIR_PURIFYING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/arecapalm/400/400',
    description: 'A graceful palm that adds a tropical feel to any space.'
  },
  {
    id: 26,
    name: 'Marigold',
    price: 12,
    categories: [Category.OUTDOOR, Category.FLOWERING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/marigold/400/400',
    description: 'A cheerful, easy-to-grow annual flower.'
  },
  {
    id: 27,
    name: 'Petunia',
    price: 10,
    categories: [Category.OUTDOOR, Category.FLOWERING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/petunia/400/400',
    description: 'Prolific bloomers available in a wide range of colors.'
  },
  {
    id: 28,
    name: 'Hoya Carnosa',
    price: 28,
    categories: [Category.INDOOR, Category.FLOWERING, Category.LOW_MAINTENANCE],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/hoya/400/400',
    description: 'A trailing plant with waxy leaves and fragrant, star-shaped flowers.'
  },
  {
    id: 29,
    name: 'Yucca Plant',
    price: 65,
    categories: [Category.INDOOR, Category.OUTDOOR, Category.LOW_MAINTENANCE],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/yucca/400/400',
    description: 'A dramatic, sword-leaved plant that is very drought-tolerant.'
  },
  {
    id: 30,
    name: 'Begonia',
    price: 20,
    categories: [Category.INDOOR, Category.FLOWERING, Category.HOME_DECOR],
    inStock: false,
    imageUrl: 'https://picsum.photos/seed/begonia/400/400',
    description: 'Valued for both its colorful flowers and striking foliage.'
  },
  {
    id: 31,
    name: 'Dracaena Marginata',
    price: 40,
    categories: [Category.INDOOR, Category.AIR_PURIFYING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/dracaena/400/400',
    description: 'A spiky, tree-like plant with slender, red-edged leaves.'
  },
  {
    id: 32,
    name: 'Aglaonema',
    price: 30,
    categories: [Category.INDOOR, Category.LOW_MAINTENANCE, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/aglaonema/400/400',
    description: 'A stylish plant with beautifully patterned leaves.'
  },
  {
    id: 33,
    name: 'Haworthia',
    price: 15,
    categories: [Category.SUCCULENT, Category.INDOOR, Category.LOW_MAINTENANCE],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/haworthia/400/400',
    description: 'A small, "zebra-striped" succulent perfect for windowsills.'
  },
  {
    id: 34,
    name: 'African Violet',
    price: 18,
    categories: [Category.INDOOR, Category.FLOWERING, Category.PET_FRIENDLY],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/africanviolet/400/400',
    description: 'A compact plant that can bloom year-round with fuzzy leaves.'
  },
  {
    id: 35,
    name: 'Dieffenbachia',
    price: 35,
    categories: [Category.INDOOR, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/dieffenbachia/400/400',
    description: 'A lush plant with large, variegated leaves.'
  },
  {
    id: 36,
    name: 'Pansy',
    price: 8,
    categories: [Category.OUTDOOR, Category.FLOWERING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/pansy/400/400',
    description: 'A cool-weather flower with a cheerful "face".'
  },
  {
    id: 37,
    name: 'Coleus',
    price: 12,
    categories: [Category.OUTDOOR, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/coleus/400/400',
    description: 'Grown for its incredibly colorful and patterned foliage.'
  },
  {
    id: 38,
    name: 'Zinnia',
    price: 10,
    categories: [Category.OUTDOOR, Category.FLOWERING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/zinnia/400/400',
    description: 'A bright, daisy-like flower that attracts butterflies.'
  },
  {
    id: 39,
    name: 'Philodendron Heartleaf',
    price: 18,
    categories: [Category.INDOOR, Category.LOW_MAINTENANCE],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/philodendron/400/400',
    description: 'A classic, easy-care trailing plant with heart-shaped leaves.'
  },
  {
    id: 40,
    name: 'Cast Iron Plant',
    price: 38,
    categories: [Category.INDOOR, Category.LOW_MAINTENANCE],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/castiron/400/400',
    description: 'Nearly indestructible, it thrives on neglect and low light.'
  },
  {
    id: 41,
    name: 'Burro\'s Tail',
    price: 22,
    categories: [Category.SUCCULENT, Category.INDOOR, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/burrostail/400/400',
    description: 'A trailing succulent with plump, overlapping leaves.'
  },
  {
    id: 42,
    name: 'Thyme',
    price: 10,
    categories: [Category.OUTDOOR, Category.HERB],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/thyme/400/400',
    description: 'A versatile culinary herb with a pungent, earthy flavor.'
  },
  {
    id: 43,
    name: 'Kentia Palm',
    price: 80,
    categories: [Category.INDOOR, Category.HOME_DECOR],
    inStock: false,
    imageUrl: 'https://picsum.photos/seed/kentiapalm/400/400',
    description: 'An elegant and resilient palm, perfect for adding a touch of luxury.'
  },
  {
    id: 44,
    name: 'Gloxinia',
    price: 25,
    categories: [Category.INDOOR, Category.FLOWERING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/gloxinia/400/400',
    description: 'Features large, velvety, bell-shaped flowers in vibrant colors.'
  },
  {
    id: 45,
    name: 'Ponytail Palm',
    price: 35,
    categories: [Category.INDOOR, Category.SUCCULENT, Category.LOW_MAINTENANCE],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/ponytailpalm/400/400',
    description: 'Not a true palm, this succulent has a swollen trunk and long, curly leaves.'
  },
  {
    id: 46,
    name: 'Kalanchoe',
    price: 15,
    categories: [Category.SUCCULENT, Category.INDOOR, Category.FLOWERING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/kalanchoe/400/400',
    description: 'A popular succulent with long-lasting, colorful flower clusters.'
  },
  {
    id: 47,
    name: 'Fittonia (Nerve Plant)',
    price: 14,
    categories: [Category.INDOOR, Category.PET_FRIENDLY, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/fittonia/400/400',
    description: 'Known for its striking leaves with colorful, contrasting veins.'
  },
  {
    id: 48,
    name: 'Peperomia',
    price: 20,
    categories: [Category.INDOOR, Category.PET_FRIENDLY, Category.LOW_MAINTENANCE],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/peperomia/400/400',
    description: 'A diverse group of small houseplants with interesting foliage.'
  },
  {
    id: 49,
    name: 'Geranium',
    price: 15,
    categories: [Category.OUTDOOR, Category.FLOWERING],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/geranium/400/400',
    description: 'A popular bedding plant with bright flowers and scented leaves.'
  },
  {
    id: 50,
    name: 'Alocasia Polly',
    price: 40,
    categories: [Category.INDOOR, Category.HOME_DECOR],
    inStock: true,
    imageUrl: 'https://picsum.photos/seed/alocasia/400/400',
    description: 'A stunning plant with arrow-shaped, dark green leaves and bright veins.'
  }
];
