import { Camera, User, Store, MessageCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

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
    },
    {
      icon: MessageCircle, // Forum icon
      label: 'Forum',
      path: '/forum'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50  backdrop-blur-md border-t border-gray-800">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-400 bg-blue-400/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white-700/20'
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-l font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;
