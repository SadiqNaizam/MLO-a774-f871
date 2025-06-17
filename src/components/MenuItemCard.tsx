import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Settings2 } from 'lucide-react';

// Interface for the menu item data
export interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  customizationRequired?: boolean;
}

interface MenuItemCardProps {
  item: MenuItem;
  onPrimaryAction: (item: MenuItem) => void; // Handles both "Add to Cart" and "Customize"
  currencySymbol?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onPrimaryAction,
  currencySymbol = '$',
}) => {
  const { toast } = useToast();
  console.log(`MenuItemCard loaded for: ${item.name}`);

  const handleActionClick = () => {
    onPrimaryAction(item);
    // If the item doesn't require customization, it's a direct add to cart.
    // We can provide immediate feedback here.
    // If customization is required, the parent component will handle the dialog
    // and subsequent "added to cart" notifications.
    if (!item.customizationRequired) {
      toast({
        title: "Added to cart!",
        description: `${item.name} has been added to your cart.`,
      });
    }
  };

  const buttonText = item.customizationRequired ? "Customize" : "Add to Cart";
  const ButtonIcon = item.customizationRequired ? Settings2 : ShoppingCart;

  return (
    <Card className="w-full overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl bg-white">
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={item.imageUrl || 'https://via.placeholder.com/400x225?text=Food+Image'}
            alt={item.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
      </CardHeader>

      <CardContent className="p-4 space-y-1 flex-grow">
        <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {item.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 h-[2.5rem]"> {/* Approx 2 lines */}
          {item.description}
        </p>
      </CardContent>

      <CardFooter className="p-3 border-t bg-gray-50 flex items-center justify-between">
        <p className="text-xl font-bold text-gray-900">
          {currencySymbol}{item.price.toFixed(2)}
        </p>
        <Button onClick={handleActionClick} size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <ButtonIcon className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;