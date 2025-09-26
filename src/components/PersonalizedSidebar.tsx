import { Heart, Clock, MapPin, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PersonalizedSidebar = () => {
  const recentlyViewed = [
    { name: "Taj Mahal", location: "Agra, India", image: "/api/placeholder/80/60" },
    { name: "Machu Picchu", location: "Peru", image: "/api/placeholder/80/60" },
    { name: "Colosseum", location: "Rome, Italy", image: "/api/placeholder/80/60" }
  ];

  const recommendations = [
    { name: "Red Fort", location: "Delhi, India", rating: 4.6 },
    { name: "Chichen Itza", location: "Mexico", rating: 4.8 },
    { name: "Petra", location: "Jordan", rating: 4.9 }
  ];

  return (
    <div className="w-72 bg-background/50 backdrop-blur border-r border-border/50 p-4 space-y-6">
      {/* User Profile */}
      <Card className="bg-card/30 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-heritage rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">JD</span>
            </div>
            <div>
              <CardTitle className="text-base">John Doe</CardTitle>
              <p className="text-sm text-muted-foreground">Heritage Explorer</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex space-x-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-primary">12</div>
              <div className="text-muted-foreground">Sites Visited</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-accent">8</div>
              <div className="text-muted-foreground">AR Scans</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recently Viewed */}
      <Card className="bg-card/30 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Recently Viewed
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {recentlyViewed.map((site, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/20 cursor-pointer transition-colors">
              <div className="w-12 h-9 bg-muted rounded overflow-hidden">
                <div className="w-full h-full bg-gradient-heritage opacity-20"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{site.name}</p>
                <p className="text-xs text-muted-foreground">{site.location}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-card/30 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {recommendations.map((site, index) => (
            <div key={index} className="p-2 rounded-lg hover:bg-accent/20 cursor-pointer transition-colors">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{site.name}</p>
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-accent mr-1 fill-current" />
                  <span className="text-xs">{site.rating}</span>
                </div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 mr-1" />
                {site.location}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Wishlist */}
      <Card className="bg-card/30 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Heart className="w-4 h-4 mr-2" />
            My Wishlist
            <Badge className="ml-2 bg-secondary text-secondary-foreground">5</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Button className="w-full">
            View All
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedSidebar;