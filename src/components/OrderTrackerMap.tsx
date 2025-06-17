import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Home, Bike, Route } from 'lucide-react';

interface LocationInfo {
  name: string;
  // In a real scenario, these would be lat/lng coordinates
  // lat: number;
  // lng: number;
  address?: string;
}

interface OrderTrackerMapProps {
  restaurantLocation?: LocationInfo;
  userAddress?: LocationInfo;
  courierLocation?: {
    // lat: number;
    // lng: number;
    status: string; // e.g., "En route", "Picking up order"
  };
  estimatedArrivalTime?: string;
}

const OrderTrackerMap: React.FC<OrderTrackerMapProps> = ({
  restaurantLocation = { name: "Restaurant Name Placeholder", address: "123 Foodie Lane" },
  userAddress = { name: "Your Address Placeholder", address: "456 Home Street" },
  courierLocation = { status: "Fetching location..." },
  estimatedArrivalTime = "Calculating...",
}) => {
  console.log('OrderTrackerMap loaded');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Route className="mr-2 h-5 w-5 text-primary" />
          Order Tracking Map
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          className="bg-gray-200 dark:bg-gray-700 aspect-[16/9] w-full rounded-md flex flex-col items-center justify-center p-4 text-center"
          aria-label="Map placeholder showing delivery route and locations"
        >
          <MapPin className="h-12 w-12 text-gray-500 dark:text-gray-400 mb-4" />
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Live Map View Placeholder
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            (Actual map integration would show live tracking here)
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm">
            <MapPin className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">Restaurant: {restaurantLocation.name}</p>
              {restaurantLocation.address && <p className="text-xs text-gray-500 dark:text-gray-400">{restaurantLocation.address}</p>}
            </div>
          </div>

          <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm">
            <Home className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">Delivery To: {userAddress.name}</p>
              {userAddress.address && <p className="text-xs text-gray-500 dark:text-gray-400">{userAddress.address}</p>}
            </div>
          </div>
          
          <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm">
            <Bike className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-200">Courier Status: {courierLocation.status}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Arrival: {estimatedArrivalTime}</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default OrderTrackerMap;