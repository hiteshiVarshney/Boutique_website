export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  tag?: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Testimonial = {
  name: string;
  location: string;
  avatar: string;
  text: string;
  rating: number;
};

export const categories: Category[] = [
  {
    id: 'dresses',
    name: 'Dresses',
    description: 'Flowing silhouettes for every occasion',
    image: 'https://images.pexels.com/photos/39457811/pexels-photo-39457811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Handbags, jewelry & finishing touches',
    image: 'https://images.pexels.com/photos/8989582/pexels-photo-8989582.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    description: 'Tailored blazers & statement coats',
    image: 'https://images.pexels.com/photos/8400221/pexels-photo-8400221.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'shoes',
    name: 'Footwear',
    description: 'Elevated heels & everyday comfort',
    image: 'https://images.pexels.com/photos/5531542/pexels-photo-5531542.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Sunset Silk Dress',
    category: 'dresses',
    price: 189,
    image: 'https://images.pexels.com/photos/39457811/pexels-photo-39457811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'New',
  },
  {
    id: 2,
    name: 'Floral Midi Dress',
    category: 'dresses',
    price: 145,
    image: 'https://images.pexels.com/photos/19034219/pexels-photo-19034219.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 3,
    name: 'Evening Gown',
    category: 'dresses',
    price: 320,
    image: 'https://images.pexels.com/photos/15092133/pexels-photo-15092133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Bestseller',
  },
  {
    id: 4,
    name: 'Leather Handbag',
    category: 'accessories',
    price: 210,
    image: 'https://images.pexels.com/photos/8989582/pexels-photo-8989582.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'New',
  },
  {
    id: 5,
    name: 'Pearl Drop Earrings',
    category: 'accessories',
    price: 65,
    image: 'https://images.pexels.com/photos/14584380/pexels-photo-14584380.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 6,
    name: 'Artisan Tote Bag',
    category: 'accessories',
    price: 175,
    image: 'https://images.pexels.com/photos/37728173/pexels-photo-37728173.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 7,
    name: 'Tailored Linen Blazer',
    category: 'outerwear',
    price: 240,
    image: 'https://images.pexels.com/photos/8400221/pexels-photo-8400221.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 8,
    name: 'Classic Wool Coat',
    category: 'outerwear',
    price: 385,
    image: 'https://images.pexels.com/photos/19895958/pexels-photo-19895958.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Bestseller',
  },
  {
    id: 9,
    name: 'Boutique Heels',
    category: 'shoes',
    price: 155,
    image: 'https://images.pexels.com/photos/5531542/pexels-photo-5531542.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 10,
    name: 'Chic Leather Boot',
    category: 'shoes',
    price: 195,
    image: 'https://images.pexels.com/photos/5531541/pexels-photo-5531541.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 11,
    name: 'Embroidered Maxi Dress',
    category: 'dresses',
    price: 265,
    image: 'https://images.pexels.com/photos/31349841/pexels-photo-31349841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 12,
    name: 'Beaded Clutch',
    category: 'accessories',
    price: 89,
    image: 'https://images.pexels.com/photos/30748147/pexels-photo-30748147.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const galleryImages = [
  { src: 'https://images.pexels.com/photos/34817395/pexels-photo-34817395.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Woman in a fashion boutique' },
  { src: 'https://images.pexels.com/photos/6069827/pexels-photo-6069827.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Stylish woman in retro outfit' },
  { src: 'https://images.pexels.com/photos/8387838/pexels-photo-8387838.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Woman in chic boutique' },
  { src: 'https://images.pexels.com/photos/8400221/pexels-photo-8400221.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Woman in green blazer' },
  { src: 'https://images.pexels.com/photos/6069967/pexels-photo-6069967.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Woman in plaid outfit and hat' },
  { src: 'https://images.pexels.com/photos/6070168/pexels-photo-6070168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Fashionable woman wearing beret' },
  { src: 'https://images.pexels.com/photos/8484204/pexels-photo-8484204.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Woman in colorful garments' },
  { src: 'https://images.pexels.com/photos/8386651/pexels-photo-8386651.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Bright boutique with pastel garments' },
  { src: 'https://images.pexels.com/photos/5531709/pexels-photo-5531709.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Chic boutique interior' },
  { src: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Elegant boutique display' },
  { src: 'https://images.pexels.com/photos/8311880/pexels-photo-8311880.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Women browsing clothes' },
  { src: 'https://images.pexels.com/photos/32443160/pexels-photo-32443160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Woman in elegant gown' },
];

export const testimonials = [
  {
    name: 'Sophia Laurent',
    location: 'Paris, France',
    avatar: 'https://images.pexels.com/photos/16160801/pexels-photo-16160801.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    text: 'Every piece I have ordered feels like it was made just for me. The quality is exceptional and the styling advice through WhatsApp made all the difference.',
    rating: 5,
  },
  {
    name: 'Amara Okafor',
    location: 'London, UK',
    avatar: 'https://images.pexels.com/photos/38366748/pexels-photo-38366748.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    text: 'I have been a loyal customer for two years. The boutique has a way of finding pieces that make me feel confident and beautiful every single time.',
    rating: 5,
  },
  {
    name: 'Mei Chen',
    location: 'Singapore',
    avatar: 'https://images.pexels.com/photos/8951408/pexels-photo-8951408.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    text: 'The attention to detail is unmatched. From the packaging to the fabrics, everything screams luxury. My go-to boutique for special occasions.',
    rating: 5,
  },
];

export const boutiqueInfo = {
  name: 'Maison Élégance',
  tagline: 'Timeless Fashion for the Modern Woman',
  whatsapp: '+1234567890',
  whatsappLink: 'https://wa.me/1234567890?text=Hello%20Maison%20%C3%89l%C3%A9gance%2C%20I%27d%20like%20to%20know%20more%20about%20your%20collection.',
  email: 'hello@maisonelegance.com',
  phone: '+1 (234) 567-890',
  address: '12 Rue de la Mode, Fashion District, Paris 75001',
  hours: 'Mon–Sat: 10am – 7pm',
  socials: {
    instagram: '#',
    facebook: '#',
    pinterest: '#',
  },
};

export const heroImage = 'https://images.pexels.com/photos/34817395/pexels-photo-34817395.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920';
export const aboutHeroImage = 'https://images.pexels.com/photos/6069827/pexels-photo-6069827.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920';
export const boutiqueInterior = 'https://images.pexels.com/photos/8386651/pexels-photo-8386651.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200';
