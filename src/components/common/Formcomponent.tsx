import React, { useState } from 'react';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categoryType } from '@/types/categoryTypes';

interface FormProps {
    title: string;
    onSubmit: (formData: any) => void;
    initialData?: any; // Used for Update, empty for Create
    categories: categoryType[];
}

function FormComponent({ title, onSubmit, initialData = {}, categories }: FormProps) {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        sales: initialData.sales || '',
        category: initialData.category || '', // Category ID will be stored here
    });

    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        onSubmit(formData);
        setFormData({
            name: '',
            description: '',
            price: '',
            sales: '',
            category: ''
        })
    };

    return (
        <div className="p-6">
            <h3 className="text-xl font-semibold mb-6">{title}</h3>

            {/* Select Category */}
            <div className="mb-4">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            {formData.category
                                ? categories.find((category) => category.id === Number(formData.category))?.category_name
                                : "Select category..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                                <CommandEmpty>No category found.</CommandEmpty>
                                <CommandGroup>
                                    {categories.map((category) => (
                                        <CommandItem
                                            key={category.id}
                                            value={category.category_name}
                                            onSelect={() => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    category: category.id, // Store the selected category's ID
                                                }));
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    Number(formData.category) === category.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {category.category_name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Product Name */}
            <div className="mb-4">
                <Label htmlFor="name" className="block text-sm font-medium">
                    Product Name
                </Label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-2"
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <Label htmlFor="description" className="block text-sm font-medium">
                    Description
                </Label>
                <Input
                    id="description"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full mt-2"
                />
            </div>

            {/* Price */}
            <div className="mb-4">
                <Label htmlFor="price" className="block text-sm font-medium">
                    Price
                </Label>
                <Input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full mt-2"
                />
            </div>

            {/* Sales */}
            <div className="mb-4">
                <Label htmlFor="sales" className="block text-sm font-medium">
                    Sales
                </Label>
                <Input
                    id="sales"
                    type="number"
                    name="sales"
                    value={formData.sales}
                    onChange={handleChange}
                    className="w-full mt-2"
                />
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

export default FormComponent;
