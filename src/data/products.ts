import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'WCETAS Pro Tracking Hub',
    price: 299.99,
    category: 'Logistics Tools',
    image: 'https://picsum.photos/seed/hub/400/400',
    rating: 4.9,
    reviews: 128,
    description: 'Centralized tracking hardware for fleet management.',
    isFlashSale: true,
    discount: 15
  },
  {
    id: '2',
    name: 'Smart Cargo Sensor V3',
    price: 89.50,
    category: 'Logistics Tools',
    image: 'https://picsum.photos/seed/sensor/400/400',
    rating: 4.7,
    reviews: 85,
    description: 'IoT sensor for real-time temperature and humidity monitoring.'
  },
  {
    id: '3',
    name: 'Premium Logistics Jacket',
    price: 120.00,
    category: 'Fashion',
    image: 'https://picsum.photos/seed/jacket/400/400',
    rating: 4.8,
    reviews: 210,
    description: 'Weather-resistant, high-visibility professional gear.',
    isFlashSale: true,
    discount: 10
  },
  {
    id: '4',
    name: 'Global Trade Tablet 12"',
    price: 549.99,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/tablet/400/400',
    rating: 4.6,
    reviews: 45,
    description: 'Rugged tablet optimized for supply chain software.'
  },
  {
    id: '5',
    name: 'Industrial Label Printer',
    price: 199.00,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/printer/400/400',
    rating: 4.5,
    reviews: 67,
    description: 'High-speed thermal printer for shipping labels.'
  },
  {
    id: '6',
    name: 'Secure Cargo Lock (Biometric)',
    price: 159.99,
    category: 'Logistics Tools',
    image: 'https://picsum.photos/seed/lock/400/400',
    rating: 4.9,
    reviews: 32,
    description: 'Fingerprint-activated heavy-duty lock for containers.'
  },
  {
    id: '7',
    name: 'WCETAS Signature Watch',
    price: 350.00,
    category: 'Fashion',
    image: 'https://picsum.photos/seed/watch/400/400',
    rating: 4.9,
    reviews: 12,
    description: 'Limited edition timepiece for trade professionals.'
  },
  {
    id: '8',
    name: 'Ergonomic Warehouse Chair',
    price: 245.00,
    category: 'Home',
    image: 'https://picsum.photos/seed/chair/400/400',
    rating: 4.4,
    reviews: 89,
    description: 'Comfortable seating for long shifts in control centers.'
  }
];
