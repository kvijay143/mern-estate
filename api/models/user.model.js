import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required : true,

    },
    email:{
        type: String,
        unique: true,
        required : true,

    },
    password:{
        type: String, 
        required : true,

    },
    avatar:{
        type :String,
        default:"https://th.bing.com/th/id/OIP.9kEvfecWZl4ax38FHBPG5gHaE8?rs=1&pid=ImgDetMain"
    },
    
},{timestamps:true})

const User=mongoose.model("User",UserSchema);
export default User;