import express from 'express'
import dotenv from 'dotenv'
import { connectToDb } from './db/dbconnection.js'
import productRoutes from './routes/product.route.js'

const app = express()
dotenv.config()


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", productRoutes )
const port = process.env.PORT || 8000
app.listen(port, (req, res)=>{
    connectToDb()
    console.log(`server is running on port ${port}`)
})