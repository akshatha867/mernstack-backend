import { Router } from "express";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import userModel from "../../model/userModel.js";
import bcrypt from "bcrypt";

let router=Router();

export default router.post("/",async(req,res)=>{
    try {
     let {email,password}=req.body;
    
     if(!email){
        return send(res,setErrMsg(RESPONSE.REQUIRED,"Email"));
     }
     if(!password){
        return send(res,setErrMsg(RESPONSE.REQUIRED,"Password"));
     }

     let userData=await userModel.findOne({email:email});

     if(userData && (await bcrypt.compare(password,userData.password))){
        return send(res,RESPONSE.SUCCESS,userData);
     }else{
        return send(res,setErrMsg(RESPONSE.INVALID,"User Credentials"));
     }        
    } catch (error) {
        console.log("Login error",error);
        return send(res,RESPONSE.ERROR);
        
        
    }
})