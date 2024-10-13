import { productType } from '@/types/productType';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TopSellingProductsChart = ({ products }: { products: productType[] }) => {
    // Finding top 5 selling products 
    const data = products
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5)
        .map(product => ({
            name: product.name,
            sales: product.sales,
        }));

    // Define an array of colors for each bar
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#d0ed57'];

    return (
        <ResponsiveContainer minWidth={500} width="100%" height={300}>
            <BarChart data={data} barGap={10} maxBarSize={50} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={10} angle={-20} textAnchor='end' />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export { TopSellingProductsChart };
