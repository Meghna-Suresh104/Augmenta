import { TrendingUp, Heart, Star } from 'lucide-react';
import Header from '@/components/Header';
import HeritageSiteCard from '@/components/HeritageSiteCard';
import HandicraftCard from '@/components/HandicraftCard';
import BottomNavbar from '@/components/BottomNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import images
import tajMahalImg from '@/assets/taj-mahal.jpg';
import fortImg from '@/assets/fort.jpg';
import shawlImg from '@/assets/shawl.jpg';
import templeImg from '@/assets/temple.jpg';
import necklaceImg from '@/assets/necklace.jpeg';

const ProfilePage = () => {
  const recommendedSites = [
    { id: '1', name: 'Taj Mahal', location: 'Agra, India', image: tajMahalImg, rating: 4.8, reviews: 12543, arAvailable: true, category: 'Monuments' },
    { id: '2', name: 'Red Fort', location: 'Delhi, India', image: fortImg, rating: 4.6, reviews: 8932, arAvailable: true, category: 'Archaeological Sites' }
  ];

  const mostVisited = [
    { id: '3', name: 'Konark Sun Temple', location: 'Odisha, India', image: templeImg, rating: 4.9, reviews: 15674, arAvailable: true, category: 'Temples' }
  ];

  const bestsellerHandicrafts = [
    { id: '1', name: 'Traditional Rajasthani Necklace', location: 'Jaipur, Rajasthan', image: necklaceImg, rating: 4.8, reviews: 234, category: 'Jewelry', artisan: 'Ramesh Kumar' },
    { id: '2', name: 'Handwoven Pashmina Shawl', location: 'Kashmir, India', image: shawlImg, rating: 4.9, reviews: 456, category: 'Textiles', artisan: 'Mohammad Ali' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-heritage/5">
      <Header />

      <main className="flex-1 pb-20 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Personalized Experience</h2>

          {/* Recommended */}
          <Card className="mb-6 bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Heart className="w-5 h-5 mr-2 text-heritage" /> Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {recommendedSites.map(site => (
                <HeritageSiteCard key={site.id} {...site} className="w-full" />
              ))}
            </CardContent>
          </Card>

          {/* Most Visited */}
          <Card className="mb-6 bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="w-5 h-5 mr-2 text-heritage" /> Most Visited Places
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {mostVisited.map(site => (
                <HeritageSiteCard key={site.id} {...site} className="w-full" />
              ))}
            </CardContent>
          </Card>

          {/* Bestseller Handicrafts */}
          <Card className="mb-6 bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Star className="w-5 h-5 mr-2 text-heritage" /> Bestseller Handicrafts
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bestsellerHandicrafts.map(item => (
                <HandicraftCard key={item.id} {...item} className="w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default ProfilePage;
