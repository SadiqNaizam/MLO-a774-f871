import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; // For quantity
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"; // For promo code
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast"; // For notifications

// Lucide Icons
import { Trash2, PlusCircle, MinusCircle, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  restaurantId?: string; // Optional: to link back to the restaurant
  restaurantName?: string; // Optional
}

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Placeholder initial items
    { id: 'item1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://source.unsplash.com/random/100x100/?pizza', restaurantName: 'Pizza Heaven' },
    { id: 'item2', name: 'Coca-Cola Can', price: 1.50, quantity: 4, imageUrl: 'https://source.unsplash.com/random/100x100/?soda', restaurantName: 'Pizza Heaven' },
    { id: 'item3', name: 'Sushi Platter', price: 25.00, quantity: 1, imageUrl: 'https://source.unsplash.com/random/100x100/?sushi', restaurantName: 'Sushi World' },
  ]);

  const [promoCode, setPromoCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = cartItems.length > 0 ? 5.00 : 0; // Example fixed shipping fee
  const total = subtotal + shippingFee - discount;

  useEffect(() => {
    // Simple promo code logic
    if (promoCode.toUpperCase() === 'SAVE10') {
      const calculatedDiscount = subtotal * 0.10;
      setDiscount(calculatedDiscount);
      toast({
        title: "Promo Code Applied!",
        description: `You saved ${calculatedDiscount.toFixed(2)} with SAVE10.`,
      });
    } else {
      setDiscount(0);
      if (promoCode.length === 6 && promoCode.toUpperCase() !== 'SAVE10') {
         toast({
            title: "Invalid Promo Code",
            description: "The entered promo code is not valid.",
            variant: "destructive",
         });
      }
    }
  }, [promoCode, subtotal, toast]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      ).filter(item => item.quantity > 0) // Optionally remove if quantity becomes 0
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }
    // Pass cart state or save to global state/localStorage before navigating
    console.log("Proceeding to checkout with items:", cartItems, "Total:", total);
    navigate('/checkout', { state: { cartItems, subtotal, discount, shippingFee, total } });
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="flex flex-col items-center">
              <ShoppingCart className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-6" />
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Your cart is empty.</p>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild size="lg">
                <Link to="/restaurant-listing">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Items</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] hidden sm:table-cell">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Remove</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden sm:table-cell">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                          </TableCell>
                          <TableCell>
                            <p className="font-medium text-gray-800 dark:text-gray-100">{item.name}</p>
                            {item.restaurantName && <p className="text-xs text-gray-500 dark:text-gray-400">From: {item.restaurantName}</p>}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                className="w-12 h-8 text-center px-1"
                                min="1"
                              />
                              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right text-gray-700 dark:text-gray-200">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium text-gray-800 dark:text-gray-100">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleRemoveItem(item.id)}>
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24"> {/* Sticky for desktop view */}
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Shipping Fee</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount (SAVE10)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <hr className="my-2 border-gray-200 dark:border-gray-700"/>
                  <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-gray-100">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <label htmlFor="promo-code" className="text-sm font-medium text-gray-700 dark:text-gray-300">Promo Code (e.g., SAVE10)</label>
                    <div className="flex items-center justify-center">
                        <InputOTP 
                            maxLength={6} 
                            value={promoCode}
                            onChange={(value) => setPromoCode(value.toUpperCase())}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full" onClick={handleProceedToCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <div className="pb-16 md:pb-0"> {/* Padding to avoid overlap with BottomNavigationBar on mobile */}
        <BottomNavigationBar />
      </div>
    </div>
  );
};

export default CartPage;