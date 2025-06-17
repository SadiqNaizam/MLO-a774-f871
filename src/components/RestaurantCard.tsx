import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';
import { cn } from "@/lib/utils"; // Assuming cn is available for className merging

interface RestaurantCardProps {
  id: string; // Unique identifier for the restaurant
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number; // e.g., 4.5
  reviewCount?: number; // e.g., 120
  deliveryTime: string; // e.g., "20-30 min"
  promotion?: string; // e.g., "20% OFF", "Free Delivery"
  className?: string; // For additional styling from parent
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  reviewCount,
  deliveryTime,
  promotion,
  className,
}) => {
  console.log(`RestaurantCard loaded for: ${name}, ID: ${id}`);

  const placeholderImage = "https://via.placeholder.com/400x225?text=Restaurant";

  return (
    <Link
      to={`/restaurant-detail?id=${id}`}
      className={cn("block group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg", className)}
      aria-label={`View details for ${name}`}
    >
      <Card className="w-full overflow-hidden transition-all duration-300 group-hover:shadow-xl h-full flex flex-col">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || placeholderImage}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          {promotion && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 z-10 text-xs px-2 py-1"
            >
              {promotion}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-3 sm:p-4 flex-grow flex flex-col justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </CardTitle>

            {cuisineTypes.length > 0 && (
              <div className="flex flex-wrap gap-1 my-1.5 sm:my-2">
                {cuisineTypes.slice(0, 3).map((cuisine) => (
                  <Badge key={cuisine} variant="secondary" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                    {cuisine}
                  </Badge>
                ))}
                {cuisineTypes.length > 3 && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                    +{cuisineTypes.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mt-2 pt-2 border-t border-dashed">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{rating.toFixed(1)}</span>
              {reviewCount !== undefined && reviewCount > 0 && (
                <span className="text-xs">({reviewCount})</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>{deliveryTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;