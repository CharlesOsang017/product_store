import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCreateUpdate = () => {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        image: ""
      })
      const queryClient = useQueryClient();
      const navigate = useNavigate()
      const { mutate:  createProduct, isPending } = useMutation({
        mutationFn: async (product) => {
          try {
            const res = await fetch("/api/products/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(product),
            });
      
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.error || "Something went wrong while creating the product.");
            }
            return data;
          } catch (error) {
            throw new Error(error.message || "Failed to create product.");
          }
        },
        onSuccess: () => {
          toast.success("Product created successfully!");
          queryClient.invalidateQueries({ queryKey: ["products"] }); // Refetch the product list
          navigate("/")
        },
        onError: (error) => {
          toast.error(error.message || "An error occurred while creating the product.");
        },
      });
  return {createProduct, isPending, product, setProduct}
}

export default useCreateUpdate