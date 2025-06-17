import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import MenuItemCard, { MenuItem } from '@/components/MenuItemCard';

// shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from "@/components/ui/use-toast";

// Icons
import { Star, Phone, Clock, MapPin, ShoppingCart } from 'lucide-react';

// Placeholder Data
const placeholderRestaurant = {
  id: '123',
  name: 'The Gourmet Place',
  imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
  rating: 4.7,
  reviewCount: 250,
  address: '123 Foodie Street, Flavor Town, USA',
  operatingHours: '11:00 AM - 10:00 PM Daily',
  contactInfo: '(555) 123-4567',
  description: "A cozy spot offering authentic Italian dishes and a wide variety of pizzas and pastas. Perfect for family dinners and casual outings."
};

const sampleMenuItems: MenuItem[] = [
  { id: 'm1', name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1595854368051-9187ada14987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', customizationRequired: false },
  { id: 'm2', name: 'Spaghetti Carbonara', description: 'Creamy pasta with pancetta, egg yolk, and Parmesan cheese.', price: 15.50, imageUrl: 'https://images.unsplash.com/photo-1588013273468-31508b965afd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', customizationRequired: true },
  { id: 'm3', name: 'Caesar Salad', description: 'Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan.', price: 9.75, imageUrl: 'https://images.unsplash.com/photo-1550304943-432413685018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60', customizationRequired: false },
  { id: 'm4', name: 'Tiramisu', description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.', price: 7.00, imageUrl: 'https://images.unsplash.com/photo-1571115177499-0973e39409b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
];

const menuCategories = [
  { id: 'cat1', name: 'Pizzas', items: [sampleMenuItems[0]] },
  { id: 'cat2', name: 'Pastas', items: [sampleMenuItems[1]] },
  { id: 'cat3', name: 'Salads & Sides', items: [sampleMenuItems[2]] },
  { id: 'cat4', name: 'Desserts', items: [sampleMenuItems[3]] },
];

const sampleReviews = [
  { id: 'r1', userName: 'Alice Wonderland', rating: 5, text: 'Absolutely loved the Margherita Pizza! Best in town.', date: '2024-07-15' },
  { id: 'r2', userName: 'Bob The Builder', rating: 4, text: 'Carbonara was delicious, though a bit rich for me. Service was excellent.', date: '2024-07-10' },
  { id: 'r3', userName: 'Charlie Brown', rating: 4, text: 'Great atmosphere and friendly staff. The salad was fresh.', date: '2024-07-05' },
];

const RestaurantDetailPage: React.FC = () => {
  console.log('RestaurantDetailPage loaded');
  // In a real app, you'd use the ID from searchParams to fetch restaurant data
  // const [searchParams] = useSearchParams();
  // const restaurantId = searchParams.get('id');

  const { toast } = useToast();
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const [selectedItemForCustomization, setSelectedItemForCustomization] = useState<MenuItem | null>(null);
  const [reviewText, setReviewText] = useState("");

  const handleMenuItemAction = (item: MenuItem) => {
    if (item.customizationRequired) {
      setSelectedItemForCustomization(item);
      setIsCustomizeDialogOpen(true);
    } else {
      // MenuItemCard shows its own toast for direct add.
      // This log is for further action, e.g., updating a global cart state.
      console.log(`${item.name} added to cart (simulation).`);
    }
  };

  const handleAddToCartFromDialog = () => {
    if (selectedItemForCustomization) {
      console.log(`${selectedItemForCustomization.name} with customizations added to cart (simulation).`);
      toast({
        title: "Added to cart!",
        description: `${selectedItemForCustomization.name} (customized) has been added to your cart.`,
        duration: 3000,
      });
    }
    setIsCustomizeDialogOpen(false);
    setSelectedItemForCustomization(null);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewText.trim() === "") {
      toast({ title: "Empty Review", description: "Please write something before submitting.", variant: "destructive" });
      return;
    }
    console.log("Review submitted:", reviewText);
    toast({ title: "Review Submitted!", description: "Thank you for your feedback." });
    setReviewText(""); // Clear textarea
  };
  
  const restaurant = placeholderRestaurant; // Use placeholder

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <ScrollArea className="flex-1 pb-16 md:pb-0"> {/* Add padding-bottom for BottomNavigationBar */}
        <main className="container mx-auto py-6 px-4 md:px-6 space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/restaurant-listing">Restaurants</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{restaurant.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Restaurant Info Section */}
          <section aria-labelledby="restaurant-info-heading">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
              <div className="md:col-span-1">
                <AspectRatio ratio={4 / 3} className="bg-muted rounded-lg overflow-hidden shadow-md">
                  <img
                    src={restaurant.imageUrl}
                    alt={`Image of ${restaurant.name}`}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
              <div className="md:col-span-2 space-y-3">
                <h1 id="restaurant-info-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{restaurant.name}</h1>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.round(restaurant.rating) ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{restaurant.rating.toFixed(1)} ({restaurant.reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {restaurant.cuisineTypes.map(cuisine => (
                    <Badge key={cuisine} variant="secondary">{cuisine}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{restaurant.description}</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-primary" /> {restaurant.address}</p>
                    <p className="flex items-center"><Clock className="mr-2 h-4 w-4 text-primary" /> {restaurant.operatingHours}</p>
                    <p className="flex items-center"><Phone className="mr-2 h-4 w-4 text-primary" /> {restaurant.contactInfo}</p>
                </div>
                <Button asChild size="lg" className="mt-4 w-full sm:w-auto">
                    <Link to="/cart">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        View Cart / Checkout
                    </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Menu Section */}
          <section aria-labelledby="restaurant-menu-heading">
            <h2 id="restaurant-menu-heading" className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Full Menu</h2>
            <Accordion type="multiple" collapsible className="w-full space-y-3" defaultValue={menuCategories.map(cat => cat.id)}>
              {menuCategories.map(category => (
                <AccordionItem key={category.id} value={category.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border dark:border-gray-700">
                  <AccordionTrigger className="px-4 py-3 text-lg font-medium hover:no-underline">{category.name}</AccordionTrigger>
                  <AccordionContent className="p-4 border-t dark:border-gray-700">
                    {category.items.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.items.map(item => (
                            <MenuItemCard key={item.id} item={item} onPrimaryAction={handleMenuItemAction} currencySymbol="$" />
                        ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm">No items in this category yet.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* User Reviews Section */}
          <section aria-labelledby="user-reviews-heading">
            <h2 id="user-reviews-heading" className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">User Reviews</h2>
            <div className="space-y-4 mb-6">
              {sampleReviews.map(review => (
                <Card key={review.id} className="bg-white dark:bg-gray-800 shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-md">{review.userName}</CardTitle>
                            <CardDescription className="text-xs">{review.date}</CardDescription>
                        </div>
                        <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
              {sampleReviews.length === 0 && <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>}
            </div>
            
            <Card className="bg-white dark:bg-gray-800 shadow">
                <CardHeader>
                    <CardTitle className="text-lg">Leave a Review</CardTitle>
                    <CardDescription>Share your experience with {restaurant.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        {/* Placeholder for star rating input */}
                        {/* <div className="flex items-center space-x-1">
                            {[1,2,3,4,5].map(star => <Button key={star} variant="ghost" size="icon"><Star className="h-5 w-5"/></Button>)}
                        </div> */}
                        <Textarea 
                            placeholder="Write your review here..." 
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={4}
                            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                        <Button type="submit">Submit Review</Button>
                    </form>
                </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </ScrollArea>
      <BottomNavigationBar /> {/* Hidden on md and larger screens by its own CSS */}

      {/* Dialog for Menu Item Customization */}
      <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
        <DialogContent className="sm:max-w-[425px] dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Customize: {selectedItemForCustomization?.name}</DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Make your selections for {selectedItemForCustomization?.name}. Price: ${selectedItemForCustomization?.price.toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            {/* Placeholder for customization options */}
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              Imagine awesome customization options here!
              For example:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground dark:text-gray-300">
                <li>Spice Level: Mild, Medium, Hot</li>
                <li>Extra Toppings: Cheese, Olives (+ $1.00)</li>
                <li>Special Instructions</li>
            </ul>
            {/* Example: 
            <RadioGroup defaultValue="mild">
              <div className="flex items-center space-x-2"><RadioGroupItem value="mild" id="r1" /><Label htmlFor="r1">Mild</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="medium" id="r2" /><Label htmlFor="r2">Medium</Label></div>
            </RadioGroup> 
            */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizeDialogOpen(false)} className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</Button>
            <Button onClick={handleAddToCartFromDialog}>Add to Cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantDetailPage;