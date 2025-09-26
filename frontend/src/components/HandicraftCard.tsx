import { Star, MapPin, Users, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HandicraftCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  artisan: string;
}

const HandicraftCard = ({
  name,
  location,
  image,
  rating,
  reviews,
  category,
  artisan
}: HandicraftCardProps) => {
  return (
    <Card className="flex p-4 mb-4 bg-card border-border/50 hover:shadow-elevated transition-all duration-300">
      {/* Image on the left */}
      <div className="relative flex-shrink-0 w-32 h-32 mr-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Content on the right */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Badge 
            className="inline-block mb-2 text-xs bg-muted text-muted-foreground"
          >
            {category}
          </Badge>
          
          <h3 className="font-semibold text-base mb-1 line-clamp-2">{name}</h3>
          
          <div className="flex items-center text-muted-foreground text-sm mb-1">
            <span className="text-xs">By {artisan}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground text-sm mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            {location}
          </div>

          <div className="flex items-center space-x-4 text-sm mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-accent mr-1 fill-current" />
              <span className="font-medium">{rating}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="w-3 h-3 mr-1" />
              <span>({reviews})</span>
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-gradient-heritage hover:shadow-glow transition-all duration-300"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default HandicraftCard;