import { Camera, User, Store } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BottomNavbar = () => {
  const navItems = [
    {
      icon: User,
      label: 'Profile',
      path: '/profile'
    },
    {
      icon: Camera,
      label: 'Scan AR',
      path: '/'
    },
    {
      icon: Store,
      label: 'Marketplace',
      path: '/marketplace'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/50">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/20'
              }`
            }
          >
            <item.icon className={`h-6 w-6 mb-1`} />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;