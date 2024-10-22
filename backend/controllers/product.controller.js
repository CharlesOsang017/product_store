import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  const { title, description, image, price } = req.body;
  try {
    const newProduct = new Product({ title, description, price, image });
    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log("error in createProduct controller", error.message);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "product deleted successfully!" });
  } catch (error) {
    console.log("error in deletepost controller", error.message);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image } = req.body;

  try {
    
    const updatedProduct = await Product.findByIdAndUpdate(
      id, // Pass the ID of the product to update
      { title, description, price, image }, // The fields to update
      { new: true } // Option to return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("Error in updateProduct controller:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const allProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort("-createdAt");
    if (!products) {
      return res.status(200).json([]);
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log("error in getallproducts controller", error.message);
    return res.status(500).json({ error: "internal server" });
  }
};

export const product = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log("error in get product controller", error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};
