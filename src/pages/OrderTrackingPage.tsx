import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import OrderTrackerMap from '@/components/OrderTrackerMap';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Package, CookingPot, Truck, Flag, MessageSquare } from 'lucide-react';

// Define types for order status and milestones
type OrderStatusKey = 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';

interface OrderMilestone {
  key: OrderStatusKey;
  label: string;
  icon: React.ElementType;
  completed: boolean;
  timestamp?: string;
}

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');

  const [currentStatus, setCurrentStatus] = useState<OrderStatusKey>('preparing');
  const [progressValue, setProgressValue] = useState(0);
  const [supportMessage, setSupportMessage] = useState('');

  // Mock order data
  const orderDetails = {
    id: 'ORD12345XYZ',
    restaurantName: 'The Gourmet Place',
    estimatedDeliveryTime: '4:30 PM - 4:45 PM',
    items: [
      { name: 'Spicy Tuna Roll', quantity: 2 },
      { name: 'Miso Soup', quantity: 1 },
    ],
    totalAmount: '35.50',
    deliveryAddress: '123 Main St, Anytown, USA',
  };

  const milestones: OrderMilestone[] = [
    { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, completed: false, timestamp: '4:00 PM' },
    { key: 'preparing', label: 'Food Being Prepared', icon: CookingPot, completed: false, timestamp: '4:05 PM' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, completed: false, timestamp: '4:20 PM' },
    { key: 'delivered', label: 'Delivered', icon: Flag, completed: false, timestamp: '4:40 PM' },
  ];

  useEffect(() => {
    // Simulate order progress
    const statusSequence: OrderStatusKey[] = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const currentStatusIndex = statusSequence.indexOf(currentStatus);

    milestones.forEach((milestone, index) => {
      milestone.completed = index <= currentStatusIndex;
    });

    const newProgress = (currentStatusIndex + 1) * (100 / statusSequence.length);
    setProgressValue(newProgress);

  }, [currentStatus]);

  // Simulate status updates (for demo purposes)
  // In a real app, this would come from a WebSocket or polling
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    if (currentStatus !== 'delivered') {
      timers.push(setTimeout(() => {
        if (currentStatus === 'confirmed') setCurrentStatus('preparing');
      }, 5000)); // confirmed -> preparing after 5s
      timers.push(setTimeout(() => {
        if (currentStatus === 'preparing') setCurrentStatus('out_for_delivery');
      }, 10000)); // preparing -> out_for_delivery after 10s from page load (5s after preparing)
      // No auto-update to 'delivered' for this demo
    }
    return () => timers.forEach(clearTimeout);
  }, []);


  const getStatusMessage = (status: OrderStatusKey): string => {
    switch (status) {
      case 'confirmed': return 'Your order has been confirmed by the restaurant.';
      case 'preparing': return 'The restaurant is preparing your food.';
      case 'out_for_delivery': return 'Your order is out for delivery!';
      case 'delivered': return 'Your order has been delivered. Enjoy your meal!';
      default: return 'Tracking order...';
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <ScrollArea className="flex-1">
        <main className="container mx-auto py-6 px-4 space-y-6">
          <section aria-labelledby="order-tracking-title">
            <h1 id="order-tracking-title" className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Track Your Order: #{orderDetails.id}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              From {orderDetails.restaurantName}
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <OrderTrackerMap
                restaurantLocation={{ name: orderDetails.restaurantName, address: "123 Restaurant Rd" }}
                userAddress={{ name: "Your Location", address: orderDetails.deliveryAddress }}
                courierLocation={{ status: currentStatus === 'out_for_delivery' ? "En route to you" : "Preparing for pickup" }}
                estimatedArrivalTime={orderDetails.estimatedDeliveryTime}
              />
            </div>

            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                  <CardDescription>{getStatusMessage(currentStatus)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={progressValue} aria-label={`Order progress: ${progressValue}%`} className="w-full" />
                  <div className="space-y-3">
                    {milestones.map((milestone) => (
                      <div key={milestone.key} className={`flex items-center space-x-3 ${milestone.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        <milestone.icon className={`h-5 w-5 ${milestone.completed ? '' : 'opacity-50'}`} />
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${milestone.completed ? 'text-gray-800 dark:text-gray-100' : ''}`}>{milestone.label}</p>
                          {milestone.completed && milestone.timestamp && <p className="text-xs text-gray-500 dark:text-gray-400">{milestone.timestamp}</p>}
                        </div>
                        {milestone.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Estimated Delivery: <span className="text-primary">{orderDetails.estimatedDeliveryTime}</span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                  {orderDetails.items.map(item => (
                    <div key={item.name} className="flex justify-between">
                      <span>{item.name} (x{item.quantity})</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${orderDetails.totalAmount}</span>
                  </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                        <Link to={`/restaurant-detail?id=${orderDetails.restaurantName.replace(/\s+/g, '-').toLowerCase()}`}>View Restaurant</Link>
                    </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Contact Support
              </CardTitle>
              <CardDescription>Have an issue with your order? Let us know.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={`Type your message regarding order #${orderDetails.id}...`}
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full sm:w-auto ml-auto" onClick={() => alert('Support message sent (not really!)')}>
                Send Message
              </Button>
            </CardFooter>
          </Card>

        </main>
      </ScrollArea>
      <div className="md:hidden"> {/* Spacer for BottomNavigationBar on mobile */}
        <div style={{ height: '60px' }}></div>
      </div>
      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default OrderTrackingPage;