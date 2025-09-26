import { useState } from 'react';
import { Filter } from 'lucide-react';
import Header from '@/components/Header';
import HeritageSiteCard from '@/components/HeritageSiteCard';
import ARScanner from '@/components/ARScanner';
import BottomNavbar from '@/components/BottomNavbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import heritage site images
import tajMahalImg from '@/assets/taj-mahal.jpg';
import fortImg from '@/assets/fort.jpg';
import hampiImg from '@/assets/Hampi.jpg';
import caveImg from '@/assets/cave.jpg';
import templeImg from '@/assets/temple.jpg';
import mysoreImg from '@/assets/mysore.jpg';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Ancient Architecture', 'Monuments', 'Archaeological Sites', 'Palaces', 'Temples'];

  const heritageSites = [
    {
      id: '1',
      name: 'Taj Mahal',
      location: 'Agra, India',
      image: tajMahalImg,
      rating: 4.8,
      reviews: 12543,
      arAvailable: true,
      category: 'Monuments',
      
    },
    {
      id: '2',
      name: 'Red Fort',
      location: 'Delhi, India',
      image: fortImg,
      rating: 4.6,
      reviews: 8932,
      arAvailable: true,
      category: 'Archaeological Sites',
      
    },
    {
      id: '3',
      name: 'Hampi',
      location: 'Karnataka, India',
      image: hampiImg,
      rating: 4.7,
      reviews: 15674,
      arAvailable: true,
      category: 'Archaeological Sites',
      
    },
    {
      id: '4',
      name: 'Ajanta Caves',
      location: 'Maharashtra, India',
      image: caveImg,
      rating: 4.8,
      reviews: 9821,
      arAvailable: true,
      category: 'Ancient Architecture',
      
    },
    {
      id: '5',
      name: 'Konark Sun Temple',
      location: 'Odisha, India',
      image: templeImg,
      rating: 4.9,
      reviews: 6543,
      arAvailable: true,
      category: 'Temples',
      
    },
    {
      id: '6',
      name: 'Mysore Palace',
      location: 'Karnataka, India',
      image: mysoreImg,
      rating: 4.7,
      reviews: 7234,
      arAvailable: true,
      category: 'Palaces',
      
    }
  ];

  const filteredSites = selectedCategory === 'All' 
    ? heritageSites 
    : heritageSites.filter(site => site.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-heritage/5">
      <Header />
      
      <main className="flex-1 pb-20 px-6 py-6">
        {/* Filters */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Explore Heritage Sites</h2>
            
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
            {categories.map((category) => (
              <Badge
  key={category}
  className={`cursor-pointer px-3 py-1 text-sm rounded-full border transition-colors
    ${selectedCategory === category 
      ? 'bg-heritage text-heritage-foreground border-heritage hover:bg-heritage/90' 
      : 'border-heritage/30 hover:border-heritage hover:bg-heritage/10'
    }`}
  onClick={() => setSelectedCategory(selectedCategory === category ? 'All' : category)}
>
  {category}
</Badge>



            ))}
          </div>
        </div>

        {/* Heritage Sites List */}
        <div className="max-w-4xl mx-auto">
          {filteredSites.map((site) => (
            <HeritageSiteCard
              key={site.id}
              id={site.id}
              name={site.name}
              location={site.location}
              image={site.image}
              rating={site.rating}
              reviews={site.reviews}
              arAvailable={site.arAvailable}
              category={site.category}
            />
          ))}
        </div>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Index;
