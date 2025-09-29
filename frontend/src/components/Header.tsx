import { Search, User, ShoppingCart, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const Header = ({ searchValue, setSearchValue }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-heritage p-2 rounded-lg shadow-heritage">
            <Camera className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-heritage bg-clip-text text-white">
            AUGMENTA
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-4xl mx-4 md:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
            <Input
              placeholder="Search heritage sites..."
              className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 ml-auto">
          <Button className="hover:bg-accent p-2 rounded-full text-white">
            <User className="h-5 w-5" />
          </Button>
          <Button className="hover:bg-accent p-2 rounded-full text-white">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          {/* Login & Sign Up Buttons */}
          <Button className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition">
            Login
          </Button>
          <Button className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
