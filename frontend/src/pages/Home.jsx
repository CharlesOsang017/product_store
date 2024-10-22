import React from 'react';
import ProductCard from './ProductCard';
import { useQuery } from "@tanstack/react-query";
import Skeleton from '../components/Skeleton';

const Home = () => {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (err) {
        throw new Error(err.message); // Use `err.message` for error handling
      }
    }
  });
  console.log(products);
  

  if (isLoading) return <Skeleton />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {products.map((product) => (
        <ProductCard product={product} key={product?._id} />
      ))}
    </div>
  );
};

export default Home;
