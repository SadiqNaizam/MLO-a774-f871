import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link to="/" className="flex items-center space-x-2 mr-6">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">FoodieFleet</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" asChild aria-label="Search Restaurants">
              <Link to="/restaurant-listing">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="User Profile">
              <Link to="/user-profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="Shopping Cart">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {/* Future enhancement: add a badge for cart item count */}
                {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">3</span> */}
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;