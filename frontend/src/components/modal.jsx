import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const Modal = ({ product }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(product);

  const closeModal = () => {
    document.getElementById("my_modal_1").close();
  }
  // Mutation for updating the product
  const { mutate: updateProduct, isLoading } = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await fetch(`/api/products/update/${id}`, {
          method: "PUT", // Use PUT for updating
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData), // Pass formData here
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal(); // Close the modal on success
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleProductUpdate = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
   

  
  
    
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center pb-3">Edit Product</h3>
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Product Title"
            name="title"
            value={formData.title}
            onChange={handleProductUpdate}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleProductUpdate}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleProductUpdate}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleProductUpdate}
            className="input input-bordered w-full max-w-xs"
          />
          <button
            onClick={() => updateProduct(product?._id)} // Pass only the product ID
            className="btn bg-blue-500 hover:bg-blue-600 text-white w-full max-w-xs mt-4"
            disabled={isLoading} // Disable during loading
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="flex justify-end">
          <button onClick={closeModal} className="btn">
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
