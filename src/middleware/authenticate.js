import { RESPONSE } from "../config/global.js";
import jwt from "jsonwebtoken";
import { send } from "../helper/responseHelper.js";

export let authenticate=(req,res,next)=>{
    try {
        let token = req.headers["authorization"];
        if(!token){
          return send(res,RESPONSE.ACCESS_DENIED);
        }

        let decoded=jwt.verify(token,process.env.SECRECT_KEY);
        req.user=decoded;
        next();
        
    } catch (error) {
        console.log("Authentication error",error);
        return send(res,RESPONSE.ERROR);
        
        
    }
}