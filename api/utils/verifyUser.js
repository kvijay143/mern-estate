import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'
export const verifyToken=(req,res,next)=>{
    const token=req.cookies.acess_token;   // i use the acess token spelling instead of access

    if(!token) return next(errorHandler(401,'Unauthorized'));
    
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,'Forbidden'));

        req.user=user;
        next(); // next function passes control to the next middleware verify user
    })
}