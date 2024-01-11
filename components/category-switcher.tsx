"use client";

import { Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface CategorySwitcherProps extends PopoverTriggerProps {
  items: Category[];
}

export default function CategorySwitcher({
  className,
  items = [],
}: CategorySwitcherProps) {
  const categoryModal = useCategoryModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentCategory = formattedItems.find(
    (item) => item.value === params.categoryId
  );

  const [open, setOpen] = useState(false);

  const onCategorySelect = (category: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/categories/${category.value}/products`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <UtensilsCrossed className="mr-2 h-4 w-4" />
          {currentCategory?.label ? currentCategory.label : "Select a category"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search categories..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup heading="Categories">
              {formattedItems.map((category) => (
                <CommandItem
                  key={category.value}
                  onSelect={() => onCategorySelect(category)}
                  className="text-sm"
                >
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  {category.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentCategory?.value === category.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  categoryModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Category
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
