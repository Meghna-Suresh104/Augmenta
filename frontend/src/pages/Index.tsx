import { useState } from 'react';
import Header from '@/components/Header';
import HeritageSiteCard from '@/components/HeritageSiteCard';
import BottomNavbar from '@/components/BottomNavbar';

// Import images
import tajMahalImg from '@/assets/taj-mahal.jpg';
import fortImg from '@/assets/fort.jpg';
import hampiImg from '@/assets/Hampi.jpg';
import caveImg from '@/assets/cave.jpg';
import templeImg from '@/assets/temple.jpg';
import mysoreImg from '@/assets/mysore.jpg';
import { auth, signInWithGoogle, logout } from '@/config/firebase';


const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchValue, setSearchValue] = useState('');

  const categories = ['All', 'Ancient Architecture', 'Monuments', 'Archaeological Sites', 'Palaces', 'Temples'];

  const heritageSites = [
    { id: '1', name: 'Taj Mahal', location: 'Agra, India', image: tajMahalImg, rating: 4.8, reviews: 12543, arAvailable: true, category: 'Monuments' },
    { id: '2', name: 'Red Fort', location: 'Delhi, India', image: fortImg, rating: 4.6, reviews: 8932, arAvailable: true, category: 'Archaeological Sites' },
    { id: '3', name: 'Hampi', location: 'Karnataka, India', image: hampiImg, rating: 4.7, reviews: 15674, arAvailable: true, category: 'Archaeological Sites' },
    { id: '4', name: 'Ajanta Caves', location: 'Maharashtra, India', image: caveImg, rating: 4.8, reviews: 9821, arAvailable: true, category: 'Ancient Architecture' },
    { id: '5', name: 'Konark Sun Temple', location: 'Odisha, India', image: templeImg, rating: 4.9, reviews: 6543, arAvailable: true, category: 'Temples' },
    { id: '6', name: 'Mysore Palace', location: 'Karnataka, India', image: mysoreImg, rating: 4.7, reviews: 7234, arAvailable: true, category: 'Palaces' }
  ];

  // Filter by category
  let filteredSites = selectedCategory === 'All'
    ? heritageSites
    : heritageSites.filter(site => site.category === selectedCategory);

  // Filter by search
  if (searchValue.trim() !== '') {
    filteredSites = filteredSites.filter(
      site =>
        site.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        site.location.toLowerCase().includes(searchValue.toLowerCase()) ||
        site.category.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />

      <main className="flex-1 pb-32 px-6 py-6 max-w-4xl mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <span
              key={category}
              className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category ? 'All' : category)}
            >
              {category}
            </span>
          ))}
        </div>

        {/* Heritage Cards */}
        <div className="space-y-4">
          {filteredSites.map(site => (
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

          {filteredSites.length === 0 && (
            <div className="text-gray-400 text-center mt-6">
              No heritage sites found for "{searchValue}"
            </div>
          )}
        </div>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Index;
