import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Lucide Icons
import { Search, ListFilter, ChevronDown, Star, Clock, Bike } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number;
  reviewCount?: number;
  deliveryTime: string; // e.g., "20-30 min"
  promotion?: string;
  isOpen?: boolean;
  hasFreeDelivery?: boolean;
}

const ALL_RESTAURANTS: Restaurant[] = [
  { id: '1', name: 'The Pizza Place', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Italian', 'Pizza'], rating: 4.5, reviewCount: 150, deliveryTime: '25-35 min', promotion: '20% OFF', isOpen: true, hasFreeDelivery: false },
  { id: '2', name: 'Sushi Sensation', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Japanese', 'Sushi'], rating: 4.8, reviewCount: 220, deliveryTime: '30-40 min', isOpen: true, hasFreeDelivery: true },
  { id: '3', name: 'Burger Barn', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['American', 'Burgers'], rating: 4.2, reviewCount: 180, deliveryTime: '20-30 min', isOpen: false, hasFreeDelivery: false },
  { id: '4', name: 'Curry Corner', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a05862ba7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Indian', 'Curry'], rating: 4.6, reviewCount: 190, deliveryTime: '35-45 min', promotion: 'Free Naan', isOpen: true, hasFreeDelivery: true },
  { id: '5', name: 'Taco Town', imageUrl: 'https://images.unsplash.com/photo-1565299715199-866c917206bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFjb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Mexican', 'Tacos'], rating: 4.3, reviewCount: 120, deliveryTime: '20-25 min', isOpen: true, hasFreeDelivery: false },
  { id: '6', name: 'Pasta Paradise', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e326a22e0024?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhc3RhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Italian', 'Pasta'], rating: 4.7, reviewCount: 90, deliveryTime: '30-40 min', isOpen: true, hasFreeDelivery: false },
  { id: '7', name: 'Salad Spot', imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FsYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Healthy', 'Salads'], rating: 4.9, reviewCount: 75, deliveryTime: '15-25 min', promotion: '10% Student Discount', isOpen: true, hasFreeDelivery: true },
  { id: '8', name: 'Dessert Dreams', imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzc2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', cuisineTypes: ['Desserts', 'Cakes', 'Ice Cream'], rating: 4.4, reviewCount: 110, deliveryTime: '20-30 min', isOpen: false, hasFreeDelivery: false },
];

const ITEMS_PER_PAGE = 8;

const RestaurantListingPage: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'deliveryTime', 'name'
  const [filters, setFilters] = useState({
    freeDelivery: false,
    openNow: false,
    cuisine: 'all',
  });
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const uniqueCuisines = Array.from(new Set(ALL_RESTAURANTS.flatMap(r => r.cuisineTypes))).sort();

  useEffect(() => {
    console.log('RestaurantListingPage loaded');
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('search') || '';
    const initialCuisine = queryParams.get('cuisine') || 'all';
    
    setSearchTerm(initialSearch);
    setFilters(prev => ({ ...prev, cuisine: initialCuisine }));

  }, [location.search]);

  useEffect(() => {
    let result = ALL_RESTAURANTS;

    // Apply search term
    if (searchTerm) {
      result = result.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cuisineTypes.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply cuisine filter
    if (filters.cuisine !== 'all') {
      result = result.filter(r => r.cuisineTypes.includes(filters.cuisine));
    }

    // Apply checkbox filters
    if (filters.freeDelivery) {
      result = result.filter(r => r.hasFreeDelivery);
    }
    if (filters.openNow) {
      result = result.filter(r => r.isOpen);
    }

    // Apply sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'deliveryTime') {
      result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredRestaurants(result);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [searchTerm, sortBy, filters]);

  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  const currentRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  const FilterControls = ({ isMobile }: { isMobile?: boolean }) => (
    <Card className={isMobile ? "mb-4" : "mb-6 sticky top-20 z-10"}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center">
          <ListFilter className="mr-2 h-5 w-5" />
          Filters &amp; Sort
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="sort-by" className="text-sm font-medium">Sort by</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort-by" className="w-full mt-1">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating (High to Low)</SelectItem>
              <SelectItem value="deliveryTime">Delivery Time (Fastest)</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="cuisine-filter" className="text-sm font-medium">Cuisine</Label>
          <Select value={filters.cuisine} onValueChange={(value) => setFilters(prev => ({ ...prev, cuisine: value }))}>
            <SelectTrigger id="cuisine-filter" className="w-full mt-1">
              <SelectValue placeholder="All Cuisines" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              {uniqueCuisines.map(cuisine => (
                <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="free-delivery" 
              checked={filters.freeDelivery} 
              onCheckedChange={(checked) => setFilters(f => ({ ...f, freeDelivery: !!checked }))}
            />
            <Label htmlFor="free-delivery" className="text-sm font-normal cursor-pointer flex items-center">
              <Bike className="mr-2 h-4 w-4" /> Free Delivery
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="open-now"
              checked={filters.openNow}
              onCheckedChange={(checked) => setFilters(f => ({ ...f, openNow: !!checked }))}
            />
            <Label htmlFor="open-now" className="text-sm font-normal cursor-pointer flex items-center">
              <Clock className="mr-2 h-4 w-4" /> Open Now
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">Find Your Next Meal</h1>
          <p className="text-muted-foreground mt-1">Explore a wide variety of restaurants and cuisines.</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search restaurants, cuisines..."
            className="w-full pl-10 pr-4 py-3 text-base rounded-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button variant="outline" className="w-full" onClick={() => setShowMobileFilters(!showMobileFilters)}>
            <ListFilter className="mr-2 h-4 w-4" />
            {showMobileFilters ? "Hide" : "Show"} Filters & Sort
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        {showMobileFilters && (
          <div className="lg:hidden">
            <FilterControls isMobile />
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Desktop Filters - Sticky */}
          <aside className="hidden lg:block lg:w-1/4 xl:w-1/5">
            <FilterControls />
          </aside>

          {/* Restaurant Grid */}
          <section className="lg:w-3/4 xl:w-4/5">
            {currentRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {currentRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Restaurants Found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Basic pagination display logic (can be enhanced for many pages)
                      if (totalPages <= 5 || 
                          page === 1 || page === totalPages || 
                          (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink 
                              href="#" 
                              onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <PaginationEllipsis key={`ellipsis-${page}`} />;
                      }
                      return null;
                    })}
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
      <div className="pb-16 md:pb-0"> {/* Padding to prevent content being hidden by BottomNavigationBar */}
        <BottomNavigationBar />
      </div>
    </div>
  );
};

export default RestaurantListingPage;