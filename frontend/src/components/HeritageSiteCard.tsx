import { Camera, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HeritageSiteCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  arAvailable: boolean;
  category: string;
  className?: string; // allow passing custom class
}

const HeritageSiteCard = ({
  name,
  location,
  image,
  rating,
  reviews,
  arAvailable,
  category,
  className
}: HeritageSiteCardProps) => {
  return (
    <Card className={`flex flex-col sm:flex-row p-4 mb-4 bg-card border-border/50 hover:shadow-elevated transition-all duration-300 ${className}`}>
      {/* Image */}
      <div className="relative flex-shrink-0 w-full sm:w-32 h-32 mr-0 sm:mr-4 mb-2 sm:mb-0">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
        {arAvailable && (
          <Badge className="absolute top-1 left-1 bg-gradient-scan text-scan-foreground border-0 text-xs flex items-center px-1">
            <Camera className="w-2 h-2 mr-1" /> AR
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Badge className="inline-block mb-2 text-xs bg-muted text-muted-foreground">{category}</Badge>
          <h3 className="font-semibold text-base mb-1 line-clamp-2">{name}</h3>
          <div className="flex items-center text-muted-foreground text-sm mb-2">
            <span className="mr-1">📍</span>{location}
          </div>
          <div className="flex items-center space-x-4 text-sm mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-accent mr-1 fill-current" />
              <span className="font-medium">{rating}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <span className="mr-1">👥</span>
              <span>({reviews})</span>
            </div>
          </div>
        </div>

        <Button
          className="w-full sm:w-auto px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base flex items-center justify-center bg-gradient-heritage hover:shadow-glow rounded-xl bg-sky-300"
        >
          <Camera className="w-4 h-4 mr-1 sm:mr-2" />
          <span className="block sm:hidden">Start AR</span>
          <span className="hidden sm:block">Start AR Experience</span>
        </Button>
      </div>
    </Card>
  );
};

export default HeritageSiteCard;
