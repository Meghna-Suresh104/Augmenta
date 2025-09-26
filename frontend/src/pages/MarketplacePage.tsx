import { useState } from 'react';
import { Filter } from 'lucide-react';
import Header from '@/components/Header';
import HandicraftCard from '@/components/HandicraftCard';
import BottomNavbar from '@/components/BottomNavbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import images
import necklaceImg from '@/assets/necklace.jpeg';
import vaseImg from '@/assets/vase.jpg';
import shawlImg from '@/assets/shawl.jpg';
import boxImg from '@/assets/box.jpeg';
import bellImg from '@/assets/bell.jpeg';
import paintingImg from '@/assets/painting.jpg';
import bgImg from '@/assets/bg.png';

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Jewelry', 'Textiles', 'Pottery', 'Woodwork', 'Metalwork', 'Paintings'];

  const handicrafts = [
    { id: '1', name: 'Traditional Rajasthani Necklace', location: 'Jaipur, Rajasthan', image: necklaceImg, rating: 4.8, reviews: 234, category: 'Jewelry', artisan: 'Ramesh Kumar' },
    { id: '2', name: 'Blue Pottery Vase', location: 'Jaipur, Rajasthan', image: vaseImg, rating: 4.7, reviews: 189, category: 'Pottery', artisan: 'Priya Sharma' },
    { id: '3', name: 'Handwoven Pashmina Shawl', location: 'Kashmir, India', image: shawlImg, rating: 4.9, reviews: 456, category: 'Textiles', artisan: 'Mohammad Ali' },
    { id: '4', name: 'Carved Sandalwood Box', location: 'Mysore, Karnataka', image: boxImg, rating: 4.6, reviews: 123, category: 'Woodwork', artisan: 'Suresh Rao' },
    { id: '5', name: 'Brass Temple Bell', location: 'Moradabad, UP', image: bellImg, rating: 4.8, reviews: 298, category: 'Metalwork', artisan: 'Ashok Singh' },
    { id: '6', name: 'Madhubani Painting', location: 'Bihar, India', image: paintingImg, rating: 4.9, reviews: 167, category: 'Paintings', artisan: 'Sita Devi' }
  ];

  const filteredHandicrafts = selectedCategory === 'All' 
    ? handicrafts 
    : handicrafts.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-white "
  style={{ backgroundImage: "url('/src/assets/bg.png')" }}>
      <Header />

      <main className="flex-1 pb-20 px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Cultural Marketplace</h2>
            
          </div>

          <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
            {categories.map(category => (
              <Badge
                key={category}
                className={`bg-gray-700 cursor-pointer px-3 py-1 text-white rounded-full border transition-colors
                  ${selectedCategory === category
                    ? 'bg-gray-700 text-white border-heritage hover:bg-heritage/90'
                    : 'border-heritage/30 hover:border-heritage hover:bg-heritage/10'
                  }`}
                onClick={() => setSelectedCategory(selectedCategory === category ? 'All' : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Handicrafts List */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredHandicrafts.map(item => (
            <HandicraftCard
              key={item.id}
              id={item.id}
              name={item.name}
              location={item.location}
              image={item.image}
              rating={item.rating}
              reviews={item.reviews}
              category={item.category}
              artisan={item.artisan}
              className="w-full"
            />
          ))}
        </div>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default MarketplacePage;
