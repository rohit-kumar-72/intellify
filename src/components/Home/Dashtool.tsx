import React from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import Formcomponent from '../common/Formcomponent';
import { categoryType } from '@/types/categoryTypes';
import { productType } from '@/types/productType';
import { supabase } from '@/lib/supabaseInstance';
import { toast } from '@/hooks/use-toast';
import Deleteproduct from '../common/Deleteproduct';


const Dashtool = ({ categories, products }: { categories: categoryType[], products: productType[] }) => {


    async function handleCreate(data: any) {
        console.log(data)

        const { data: response, error }: { data: any, error: any } = await supabase
            .from('product')
            .insert([
                {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    sales: data.sales,
                    category_id: parseInt(data?.category)
                }
            ])
            .select()
        if (error) {
            console.log(error)
            toast({
                title: "unable to register product",
                description: error.message,
                variant: "destructive"
            })
        } else {
            console.log(response)
            toast({
                title: "successfully registered product",
                description: response.name
            })
        }
    }

    async function handleDelete(data: any) {
        console.log(data)

        const { error } = await supabase
            .from('product')
            .delete()
            .eq('id', data)

        if (error) {
            console.log(error)
            toast({
                title: "Error in deleting product.",
                description: error.message,
                variant: "destructive"
            })
        } else {
            toast({
                title: "successfully deleted."
            })
        }
    }

    return (
        <div className="">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center flex-grow p-5">
                <h2 className="text-xl font-semibold mb-4">Manage Data</h2>
                <div className="flex gap-4 mb-4 flex-wrap">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="flex items-center justify-center bg-blue-500 text-white"
                                onClick={() => console.log('Create action')}
                            >
                                <Plus className="mr-2" />
                                Create
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <Formcomponent
                                title='Create Product'
                                categories={categories}
                                onSubmit={handleCreate}
                            />
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="flex items-center justify-center bg-yellow-500 text-white"
                                onClick={() => console.log('Update action')}
                                disabled
                            >
                                <Edit className="mr-2" />
                                Update
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            update
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="flex items-center justify-center bg-red-500 text-white"
                                onClick={() => console.log('Delete action')}
                            >
                                <Trash className="mr-2" />
                                Delete
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <Deleteproduct data={products} onSubmit={handleDelete} />
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    );
};

export default Dashtool;
