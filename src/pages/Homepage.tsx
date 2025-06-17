import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CuisineCarousel, { Cuisine } from '@/components/CuisineCarousel'; // Import Cuisine interface
import RestaurantCard from '@/components/RestaurantCard';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

// Lucide Icons
import { Search, Pizza, Beef, Fish, Soup, Utensils, Tag, Bike } from 'lucide-react';

// Local interface for RestaurantCard props, as it's not exported from the component
interface RestaurantHomepageCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number;
  reviewCount?: number;
  deliveryTime: string;
  promotion?: string;
  className?: string;
}

const sampleCuisines: Cuisine[] = [
  { id: 'italian', name: 'Italian', icon: <Pizza className="w-7 h-7 mx-auto" /> },
  { id: 'american', name: 'American', icon: <Beef className="w-7 h-7 mx-auto" /> },
  { id: 'japanese', name: 'Japanese', icon: <Fish className="w-7 h-7 mx-auto" /> },
  { id: 'mexican', name: 'Mexican', imageUrl: 'https://images.unsplash.com/photo-1599974510931-33a7058baa16?auto=format&fit=crop&w=64&h=64&q=80' },
  { id: 'indian', name: 'Indian', icon: <Soup className="w-7 h-7 mx-auto" /> },
  { id: 'chinese', name: 'Chinese', imageUrl: 'https://images.unsplash.com/photo-1585851370419-49548637329a?auto=format&fit=crop&w=64&h=64&q=80' },
  { id: 'thai', name: 'Thai', imageUrl: 'https://images.unsplash.com/photo-1569864060319-2096e0ae11c2?auto=format&fit=crop&w=64&h=64&q=80' },
  { id: 'vegetarian', name: 'Vegetarian', icon: <Utensils className="w-7 h-7 mx-auto" />},
];

const sampleRestaurants: RestaurantHomepageCardProps[] = [
  {
    id: 'restaurant-1',
    name: "Luigi's Pizza Palace",
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.5,
    reviewCount: 182,
    deliveryTime: '25-35 min',
    promotion: '15% OFF',
  },
  {
    id: 'restaurant-2',
    name: 'The Burger Joint',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['American', 'Burgers', 'Fries'],
    rating: 4.2,
    reviewCount: 230,
    deliveryTime: '20-30 min',
  },
  {
    id: 'restaurant-3',
    name: 'Sakura Sushi & Grill',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.8,
    reviewCount: 195,
    deliveryTime: '30-40 min',
    promotion: 'Free Edamame',
  },
  {
    id: 'restaurant-4',
    name: 'Taco Tuesday Express',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=400&q=60',
    cuisineTypes: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.3,
    reviewCount: 112,
    deliveryTime: '20-30 min',
  },
];

const Homepage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisineId, setSelectedCuisineId] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log('Homepage loaded');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurant-listing?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/restaurant-listing');
    }
  };

  const handleCuisineSelect = (cuisineId: string) => {
    setSelectedCuisineId(cuisineId);
    // Find cuisine name for a more user-friendly query param, or just use ID
    const cuisine = sampleCuisines.find(c => c.id === cuisineId);
    navigate(`/restaurant-listing?cuisine=${encodeURIComponent(cuisine ? cuisine.name : cuisineId)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background">
      <Header />
      <ScrollArea className="flex-1">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 md:space-y-12 pb-24 md:pb-12"> {/* Padding bottom for BottomNav */}
          
          {/* Hero/Search Section */}
          <section aria-labelledby="hero-heading" className="text-center py-10 md:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl shadow-sm">
            <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
              Your Next Meal, <span className="text-primary">Delivered</span>.
            </h1>
            <p className="text-md sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto px-4">
              Discover amazing local restaurants and enjoy delicious food delivered to your doorstep.
            </p>
            <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto flex items-center space-x-2 px-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search restaurants, cuisines..."
                  className="w-full pl-10 pr-3 py-2.5 h-11 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search for restaurants or cuisines"
                />
              </div>
              <Button type="submit" size="lg" className="h-11">
                Search
              </Button>
            </form>
          </section>

          {/* Cuisine Carousel Section */}
          <section aria-labelledby="cuisine-carousel-heading">
            <h2 id="cuisine-carousel-heading" className="text-2xl font-semibold mb-4 px-1">
              Explore Cuisines
            </h2>
            <CuisineCarousel
              cuisines={sampleCuisines}
              selectedCuisineId={selectedCuisineId}
              onCuisineSelect={handleCuisineSelect}
              className="-mx-4 sm:-mx-0" // Adjust horizontal padding for edge-to-edge feel on mobile
            />
          </section>

          {/* Featured Restaurants Section */}
          <section aria-labelledby="featured-restaurants-heading">
            <div className="flex justify-between items-center mb-5 px-1">
              <h2 id="featured-restaurants-heading" className="text-2xl font-semibold">
                Featured Restaurants
              </h2>
              <Button variant="link" asChild className="text-primary hover:text-primary/80">
                <Link to="/restaurant-listing">View All &rarr;</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {sampleRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </section>
          
          {/* Promotions Section */}
          <section aria-labelledby="promotions-heading">
            <h2 id="promotions-heading" className="text-2xl font-semibold mb-4 px-1">
              Today's Offers
            </h2>
            <Card className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-0.5 rounded-lg shadow-lg">
                <div className="bg-background p-6 rounded-md space-y-4">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-600 to-pink-600">
                        🎉 Deals You Can't Miss!
                    </h3>
                    <p className="text-muted-foreground">
                        Exclusive discounts and special offers waiting for you.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-secondary/30 dark:bg-secondary/20 rounded-md border border-dashed">
                            <Tag className="h-6 w-6 text-primary flex-shrink-0" />
                            <div>
                                <p className="font-semibold">20% OFF Your First Order!</p>
                                <p className="text-sm text-muted-foreground">Use code: <span className="font-mono text-primary p-0.5 bg-primary/10 rounded">NEW20</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-secondary/30 dark:bg-secondary/20 rounded-md border border-dashed">
                            <Bike className="h-6 w-6 text-primary flex-shrink-0" />
                            <div>
                                <p className="font-semibold">Free Delivery on orders over $25</p>
                                <p className="text-sm text-muted-foreground">Automatically applied at checkout.</p>
                            </div>
                        </div>
                    </div>
                    <Button 
                        className="mt-4 w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-shadow"
                        asChild
                    >
                        <Link to="/restaurant-listing?filter=promotions">Discover Offers</Link>
                    </Button>
                </div>
            </Card>
          </section>

        </main>
      </ScrollArea>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default Homepage;