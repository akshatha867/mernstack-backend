import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:false,
    },
    phone:{
        type:String,
        required:false,
    },
    age:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:false,
    },
    role:{
        type:Number,
        required:true,
        default:1,
    },
    status:{
        type:Number,
        required:true,
        default:1,
    },
    
});
export default mongoose.model("user_model",userSchema);