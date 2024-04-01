import mongoose from "mongoose";
const listingSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        description:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        regularPrice:{
            type:Number,
            required:true,
        },
        discountPrice:{
            type:Number,
            required:true,
        },
        bathrooms:{
            type:Number,
            required:true,
        },
        bedrooms:{
            type:Number,
            required:true,
        },

        furnished:{
            type:Boolean,
            required:true,
        },
        parking:{
            type:String,
            required:true,
        },
        type:{
            type:String,
            required:true,
        },
        offer:{
            type:Boolean,
            required:true,
        },
        imageUrls:{
            // for storing the images of property multiple urls in array
           type:Array,
           required:true,
        },
        userRef:{
            // this is for storing the user who has created the listing
            type:String,
            required:true,
        },

    },{timestamps:true}
)
const Listing=mongoose.model('Listing',listingSchema);

export default Listing;