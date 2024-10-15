import mongoose from "mongoose";

export const connectToDb = async(req, res)=>{
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI)
      console.log(`Database connected successfully`) 
    } catch (error) {
        console.log("db connection error", error.message)
        process.exit(1)
    }

}

