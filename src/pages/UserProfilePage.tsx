import React from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';

// Shadcn/UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

// Lucide Icons
import { Edit2, Trash2, PlusCircle, MapPin, CreditCard, ListOrdered, Settings, UserCircle, Home, Briefcase, Edit3 } from 'lucide-react';

// Form Schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional(),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Mock Data
const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "555-123-4567",
  avatarUrl: "https://i.pravatar.cc/150?u=alexjohnson", // Placeholder avatar
};

const mockAddresses = [
  { id: '1', type: 'Home', icon: <Home className="w-4 h-4 mr-2"/>, street: '123 Willow Creek Ln', city: 'Springfield', state: 'IL', zip: '62704', isDefault: true },
  { id: '2', type: 'Work', icon: <Briefcase className="w-4 h-4 mr-2"/>, street: '456 Business Park Ave', city: 'Springfield', state: 'IL', zip: '62702', isDefault: false },
];

const mockPaymentMethods = [
  { id: '1', type: 'Visa', last4: '4242', expiry: '12/2025', isDefault: true },
  { id: '2', type: 'MasterCard', last4: '5555', expiry: '08/2026', isDefault: false },
];

const mockOrders = [
  { id: 'ORD78923', date: '2024-07-15', total: 34.50, status: 'Delivered', itemsPreview: 'Pizza Margherita, Coke (2)' },
  { id: 'ORD65498', date: '2024-07-10', total: 19.75, status: 'Delivered', itemsPreview: 'Chicken Burger, Fries' },
  { id: 'ORD32155', date: '2024-06-28', total: 55.20, status: 'Cancelled', itemsPreview: 'Sushi Platter, Miso Soup' },
];


const UserProfilePage = () => {
  console.log('UserProfilePage loaded');
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    console.log("Profile updated:", data);
    mockUser.name = data.name; // Simulate update
    mockUser.email = data.email;
    mockUser.phone = data.phone;
    toast({
      title: "Profile Updated",
      description: "Your personal information has been successfully updated.",
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        {/* User Profile Header Section */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-2 border-primary">
            <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
            <AvatarFallback>{mockUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{mockUser.name}</h1>
            <p className="text-muted-foreground">{mockUser.email}</p>
            <Button variant="outline" size="sm" className="mt-3 text-xs">
              <Edit3 className="w-3 h-3 mr-1.5" />
              Change Photo
            </Button>
          </div>
        </section>

        <Tabs defaultValue="personal-info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6 gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="personal-info" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"><UserCircle className="w-4 h-4"/>Personal Info</TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"><MapPin className="w-4 h-4"/>Addresses</TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"><CreditCard className="w-4 h-4"/>Payment</TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"><ListOrdered className="w-4 h-4"/>Order History</TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"><Settings className="w-4 h-4"/>Settings</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal-info">
            <Card>
              <CardHeader>
                <CardTitle>Edit Personal Information</CardTitle>
                <CardDescription>Update your name, email, and phone number.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manage Delivery Addresses</CardTitle>
                  <CardDescription>Add, edit, or remove your saved addresses.</CardDescription>
                </div>
                <Button variant="outline">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAddresses.map(addr => (
                  <Card key={addr.id} className="p-4 flex justify-between items-start">
                    <div className="flex items-start">
                      {addr.icon}
                      <div>
                        <p className="font-semibold">{addr.type} {addr.isDefault && <span className="text-xs text-primary ml-1">(Default)</span>}</p>
                        <p className="text-sm text-muted-foreground">{addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="ghost" size="icon" aria-label="Edit address"><Edit2 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" aria-label="Delete address"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </Card>
                ))}
                {mockAddresses.length === 0 && <p className="text-muted-foreground">No addresses saved yet.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manage Payment Methods</CardTitle>
                  <CardDescription>Add or update your payment details.</CardDescription>
                </div>
                <Button variant="outline">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockPaymentMethods.map(pm => (
                  <Card key={pm.id} className="p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-3 text-blue-500"/>
                      <div>
                        <p className="font-semibold">{pm.type} ending in {pm.last4} {pm.isDefault && <span className="text-xs text-primary ml-1">(Default)</span>}</p>
                        <p className="text-sm text-muted-foreground">Expires: {pm.expiry}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="ghost" size="icon" aria-label="Edit payment method"><Edit2 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" aria-label="Delete payment method"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </Card>
                ))}
                {mockPaymentMethods.length === 0 && <p className="text-muted-foreground">No payment methods saved yet.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Your Order History</CardTitle>
                <CardDescription>Review your past orders and their status.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of your recent orders.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell className="truncate max-w-[200px]">{order.itemsPreview}</TableCell>
                        <TableCell>
                           <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-400' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-400' :
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-400'
                           }`}>
                            {order.status}
                           </span>
                        </TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/order-tracking?orderId=${order.id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {mockOrders.length === 0 && <p className="text-muted-foreground text-center py-4">You have no past orders.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>Manage your notification preferences, app theme, and access help.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <Label htmlFor="notifications" className="font-semibold">Notification Preferences</Label>
                  <p className="text-sm text-muted-foreground mb-2">Choose what updates you receive.</p>
                  {/* Placeholder for notification settings */}
                  <Button variant="secondary" size="sm">Manage Notifications</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <Label htmlFor="theme" className="font-semibold">Theme</Label>
                  <p className="text-sm text-muted-foreground mb-2">Select your preferred app appearance.</p>
                  {/* Placeholder for theme switch */}
                  <Button variant="secondary" size="sm">Toggle Dark Mode</Button>
                </div>
                 <div className="p-4 border rounded-lg">
                  <Label className="font-semibold">Support</Label>
                  <p className="text-sm text-muted-foreground mb-2">Find help or contact us.</p>
                  <div className="space-x-2">
                    <Button variant="link" asChild><Link to="/faq">FAQ</Link></Button>
                    <Button variant="link" asChild><Link to="/contact">Contact Support</Link></Button>
                  </div>
                </div>
                 <div className="p-4 border rounded-lg">
                  <Label className="font-semibold">Account Actions</Label>
                  <p className="text-sm text-muted-foreground mb-2">Manage your account security or delete your account.</p>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">Change Password</Button>
                    <Button variant="destructive" size="sm">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
      <div className="pb-16 md:pb-0"> {/* Padding to avoid overlap with BottomNavigationBar on mobile */}
        {/* Content that might be overlapped */}
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default UserProfilePage;