import useCreateUpdate from "../hooks/useCreateUpdate";

const CreateProduct = () => {
  const {createProduct, isPending, product, setProduct } = useCreateUpdate()
  
  
  const handleAddProducts = ()=>{    
    setProduct({title: "", description:"", price: "", image:""})
    createProduct(product)    

  }
  return (
    <div className="w-full p-6">
      <div className="flex justify-center mb-6">
        <h1 className="font-bold text-3xl">Create Product</h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Product Title"
          name="title"
          value={product.title}
          onChange={(e)=>setProduct({...product, title:e.target.value})}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="description"
          name="Description"
          value={product.description}
          onChange={(e)=>setProduct({...product, description:e.target.value})}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={product.price}
          onChange={(e)=>setProduct({...product, price:e.target.value})}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Image URL"
          name="image"
          value={product.image}
          onChange={(e)=>setProduct({...product, image:e.target.value})}
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={handleAddProducts} className="btn bg-blue-500 hover:bg-blue-600 text-white w-full max-w-xs mt-4">
          {isPending ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
