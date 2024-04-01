import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import Listing from "../models/listing.model.js"
export const test=(req,res)=>{
    res.json({
        message : "Meena Don chodta hai raando ko"
    })
}
export const updateUser=async(req,res,next)=>{

   // When implementing authentication in an Express application, 
   //middleware such as Passport.js is commonly used. Passport.js, along 
   //with other authentication middleware, often adds a user property to the req object after 
   //successfully authenticating a user.
   //Here's an example of how you might see the user property being used in Express.js with Passport.js:
   //In this example, after successfully authenticating a user using Passport.js middleware,
   // the authenticated user's information is typically stored in the req.user property. 
   //You can then access this property to retrieve information about the authenticated user, such as their username, 
   //user ID, etc., and use it to customize the behavior of your routes accordingly.

//It's important to note that the presence of a user property in the req object 
//depends on your application's authentication setup and the middleware you're using. 
//If you're not using authentication middleware like Passport.js, 
//you won't typically see a user property in the req object by default.
    if(req.user.id!==req.params.id)
    return next(errorHandler(401,'You can only update your own account'));
     try{
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser=await User.findByIdAndUpdate(
            req.params.id,
            {
             $set:{   // set function changes the fields which we are changing otherwise previous fields are same as previous
            username: req.body.username,
            email: req.body.email,
            password:req.body.password,
            avatar: req.body.avatar
             }
             // this new:true can save this updated user with the new information if you dont add new:true you get previous information in your response
            },{new:true}
        )
        const{password,...rest}=updatedUser._doc;
        res.status(200).json(rest);
     }
     catch(error){
       next(error);
     }
}
export const deleteUser=async(req,res,next)=>{
        if(req.user.id!==req.params.id){
            return next(errorHandler(401,'You can only delete your own account'));
        }
        try{
            await User.findByIdAndDelete(req.params.id);
            res.clearCookie('acess_token');
            res.status(200).json('User has been deleted');
        }
        catch(error){
            next(error);
        }

}

export const getUserListings=async(req,res,next)=>{
    if(req.user.id === req.params.id){
        try{
            const listings=await Listing.find({userRef: req.params.id});
            res.status(200).json(listings);
        }
        catch(error){
            next(error);
        }
    }
    else{
        return next(errorHandler(401,'You can only view your own listings'));
    }
}

export const getUser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            return next(errorHandler(404,'User not Found !'));
        }
        const {password:pass,...rest}=user._doc;

        res.status(200).json(rest);
    }catch(error){
        next(error);
    }
}
