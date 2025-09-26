import { Search, User, ShoppingCart, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-heritage p-2 rounded-lg shadow-heritage">
            <Camera className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-heritage bg-clip-text text-black">
            AUGMENTA
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4 md:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search heritage sites..."
              className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          <Button className="hover:bg-accent p-2 rounded-full">
            <User className="h-5 w-5" />
          </Button>
          <Button className="hover:bg-accent p-2 rounded-full">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;