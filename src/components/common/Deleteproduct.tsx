import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { ChevronsUpDown, Check } from 'lucide-react';
import { productType } from '@/types/productType';
import { cn } from '@/lib/utils';
import { DialogFooter } from '../ui/dialog';
import { Command } from '../ui/command';

function DeleteProduct({ data, onSubmit }: { data: productType[], onSubmit: (id: number) => void }) {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{ id: number, name: string } | null>(null);

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (selectedProduct) {
            // console.log("Selected product ID:", selectedProduct.id);
            onSubmit(selectedProduct.id);
        }
    };

    return (
        <div className='p-6'>
            <h3 className="text-xl font-semibold mb-6">Delete Product</h3>

            {/* Product Selection */}
            <div className="mb-4">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            {selectedProduct
                                ? selectedProduct.name // Display the selected product name
                                : "Select Product..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="Search product..." />
                            <CommandList>
                                <CommandEmpty>No product found.</CommandEmpty>
                                <CommandGroup>
                                    {data.map((product) => (
                                        <CommandItem
                                            key={product.id}
                                            value={product.name}
                                            onSelect={() => {
                                                setSelectedProduct({
                                                    id: product.id,
                                                    name: product.name,
                                                });
                                                setOpen(false); // Close the popover on select
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedProduct?.id === product.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {product.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Submit Button */}
            <DialogFooter>
                <Button onClick={handleSubmit} className="w-full">
                    Submit
                </Button>
            </DialogFooter>
        </div>
    );
}

export default DeleteProduct;
