import React from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export interface Cuisine {
  id: string;
  name: string;
  imageUrl?: string;
  icon?: React.ReactElement;
}

interface CuisineCarouselProps {
  cuisines: Cuisine[];
  selectedCuisineId?: string | null;
  onCuisineSelect: (cuisineId: string) => void;
  className?: string;
}

const CuisineCarousel: React.FC<CuisineCarouselProps> = ({
  cuisines,
  selectedCuisineId,
  onCuisineSelect,
  className,
}) => {
  console.log('CuisineCarousel loaded');

  if (!cuisines || cuisines.length === 0) {
    return (
      <div className={`text-center text-sm text-muted-foreground py-4 ${className}`}>
        No cuisines to display.
      </div>
    );
  }

  return (
    <ScrollArea className={`w-full whitespace-nowrap ${className || ''}`}>
      <div className="flex w-max space-x-3 p-4">
        {cuisines.map((cuisine) => (
          <Button
            key={cuisine.id}
            variant={selectedCuisineId === cuisine.id ? "default" : "outline"}
            className="h-auto p-0 flex-shrink-0" // Reset padding for custom content structure
            onClick={() => onCuisineSelect(cuisine.id)}
            aria-label={`Filter by ${cuisine.name} cuisine`}
            aria-pressed={selectedCuisineId === cuisine.id}
          >
            <div className="flex flex-col items-center justify-center w-[90px] min-h-[90px] p-2">
              {(cuisine.imageUrl || cuisine.icon) && (
                <div className="w-10 h-10 flex items-center justify-center pointer-events-none mb-1.5">
                  {cuisine.imageUrl ? (
                    <img
                      src={cuisine.imageUrl}
                      alt="" // Decorative, cuisine name is in the text
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : cuisine.icon ? (
                    React.cloneElement(cuisine.icon, { 
                      // Ensuring icon is appropriately sized if it's a component
                      // Default size is suitable for lucide-react icons (24x24 often)
                      // Explicitly setting className for consistency if needed:
                      // className: `w-6 h-6 ${cuisine.icon.props.className || ''}`
                    })
                  ) : null}
                </div>
              )}
              <span className="text-xs font-medium text-center line-clamp-2 pointer-events-none"> {/* line-clamp-2 for slightly longer names */}
                {cuisine.name}
              </span>
            </div>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CuisineCarousel;