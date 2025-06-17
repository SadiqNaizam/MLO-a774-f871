import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, Package, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center flex-1 p-1 rounded-md transition-colors",
        isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-muted/50"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 mb-0.5" />
      <span className="text-xs sm:text-sm">{label}</span>
    </Link>
  );
};

const BottomNavigationBar: React.FC = () => {
  console.log('BottomNavigationBar loaded');
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/restaurant-listing", icon: UtensilsCrossed, label: "Restaurants" },
    { to: "/order-tracking", icon: Package, label: "Orders" },
    { to: "/user-profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-top md:hidden">
      <div className="container mx-auto px-2 py-1.5">
        <div className="flex justify-around items-center space-x-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to || (item.to === "/" && location.pathname.startsWith("/?"))} // Handles base path and potential query params for home
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigationBar;