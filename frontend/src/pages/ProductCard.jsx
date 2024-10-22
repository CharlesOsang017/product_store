import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Pencil } from 'lucide-react';
import Modal from '../components/modal';
import toast from 'react-hot-toast'


const ProductCard = ({ product }) => {
  const queryClient = useQueryClient();
  
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      try {
        const res = await fetch(`/api/products/delete/${id}`, {
          method: "DELETE", 
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
      toast.success("Product deleted successfully");      
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });


  
  const openModal = () => {    
    document.getElementById("my_modal_1").showModal();
  };

 
  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-xl m-4">
      <figure>
        <img
          src={product?.image}
          alt={product?.title}
          className="h-48 w-full object-cover transform transition-all duration-300 hover:-translate-y-1 hover:scale-110"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product?.title}
          <div className="badge badge-secondary ml-2">NEW</div>
        </h2>
        <p>{product?.description}</p>
        <div className="card-actions justify-end">
         
         <button  onClick={()=> openModal()} className="text-white bg-slate-500 hover:bg-slate-700 btn  border-none"><Pencil /></button>
         
          <button onClick={()=>deleteProduct(product._id)} className="text-white bg-slate-500 hover:bg-slate-700 btn  border-none">{ isDeleting ? (<span className="loading loading-spinner loading-sm"></span>) :<Trash2 />}</button>
        </div>
      </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <Modal  product={product} />
    </div>
  );
};

export default ProductCard;
