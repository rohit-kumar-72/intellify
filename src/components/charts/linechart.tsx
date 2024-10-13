// components/ProductSalesChart.tsx
import { productType } from '@/types/productType';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
    products: productType[];
};

const ProductSalesChart = ({ products }: Props) => {
    // Prepare the data for the line chart
    const salesData = products.map(product => ({
        name: product.name,
        sales: product.sales,
    }));

    return (
        <ResponsiveContainer minWidth={500} width="100%" height={300}>
            <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={10} angle={-45} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ProductSalesChart;
