'use client'
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseInstance';
import { categoryType } from '@/types/categoryTypes';
import { productType } from '@/types/productType';
import React, { useEffect, useState } from 'react'
import { TopSellingProductsChart } from '../charts/Barchart';
import { ProductPieChart } from '../charts/Piechart';
import ProductSalesChart from '../charts/linechart';
import Dashtool from './Dashtool';

function Dashboard() {
    const [products, setProducts] = useState<productType[]>([]);
    const [categories, setCategories] = useState<categoryType[]>([]);

    useEffect(() => {
        async function fetchProducts() {

            const { data, error } = await supabase
                .from('product')
                .select('*')

            if (!error && data) {
                setProducts(data)
            } else {
                console.log(error)
                toast({
                    title: "Error fetching products",
                    description: error?.message,
                    variant: 'destructive'
                })
            }
        }
        fetchProducts()

    }, [])

    useEffect(() => {
        async function fetchCategory() {

            const { data, error } = await supabase
                .from('category')
                .select('*');
            if (!error && data) {
                setCategories(data)
            } else {
                console.log(error)
                toast({
                    title: "Error fetching Categories",
                    description: error?.message,
                    variant: 'destructive'
                })
            }
        }
        fetchCategory()

    }, [])


    supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'product' },
            (payload: any) => {
                if (payload.eventType === 'INSERT') {
                    const newProduct = payload.new as productType;
                    setProducts((prevProducts) => [...prevProducts, newProduct]);
                } else if (payload.eventType === 'DELETE') {
                    setProducts((prevProducts) =>
                        prevProducts.filter((product) => product.id !== payload.old.id)
                    );
                }
            }
        )
        .subscribe()


    return (
        <div
            className='w-11/12 mx-auto mt-4'
        >
            <Dashtool products={products} categories={categories} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {/* Top Selling products */}
                <div className="bg-white shadow-md rounded-md p-4 overflow-x-auto">
                    <h2 className='text-black text-lg font-semibold text-center'>Top Selling products</h2>
                    <TopSellingProductsChart products={products} />
                </div>

                {/* Total sales of Product */}
                <div className="bg-white shadow-md rounded-md p-4 overflow-x-auto">
                    <h2 className='text-black text-lg font-semibold text-center'>Total sales of Product</h2>
                    <ProductSalesChart products={products} />
                </div>

                {/* Product Distribution by Category */}
                <div className="bg-white shadow-md rounded-md p-4">
                    <h2 className='text-black text-lg font-semibold text-center'>Product Distribution by Category</h2>
                    <ProductPieChart categories={categories} products={products} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard