import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import  userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js';
import listingRoute from './routes/listing.route.js';
import cookieParser from "cookie-parser";
import path from 'path';
dotenv.config();

const _dirname=path.resolve();
const app=express();
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(()=>{
    console.log("Database Connected Succesfully");
}).catch((err)=>{
    console.log(err);
})




const PORT=8000;
 
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/listing',listingRoute)


app.use(express.static(path.join(process.cwd(), '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'dist', 'index.html'));
})
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
app.listen(PORT,()=>{
    console.log("Server is running on port 8000");
})