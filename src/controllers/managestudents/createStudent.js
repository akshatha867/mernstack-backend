import { Router } from "express";
import userModel from "../../model/userModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { EMAIL_REGEX, PHONEREGEX, ROLE, STATUS } from "../../config/constant.js";
import { authenticate } from "../../middleware/authenticate.js";

let router = Router();
 export default router.post("/",authenticate,async(req , res )=>{
    try{

        if(req.user.role!==ROLE.TEACHER){
            return send(res,RESPONSE.ACCESS_DENIED);
        }
        let {name,email,phone,age}=req.body || {};

        if(!name){
            return send(res,setErrMsg(RESPONSE.REQUIRED,"Name"));
            // return res.status(201).json({
            //     code:201,
            //     message:"Name is required",
                
            // });
        }
        if(!email){
            return res.status(201).json({
                code:201,
                message:"Email is required",
                
            });
        }
        if(!phone){
            return res.status(201).json({
                code:201,
                message:"phone is required",
                
            });
        }

        let isEmail=email.match(EMAIL_REGEX);
        let isPhone=phone.match(PHONEREGEX);

        if(!isEmail){
            return send(res,setErrMsg(RESPONSE.INVALID,"Email"));
        }
        if(!isPhone){
            return send (res,setErrMsg(RESPONSE.INVALID,"Phone"))
        }

        let isEmailExists= await userModel.findOne({email:email});
        let isPhoneExist = await userModel.findOne({phone:phone});

        if(isEmailExists){
            return send(res,setErrMsg(RESPONSE.ALREADY_EXISTS,"Email"))
        }

        if(isPhoneExist){
            return send(res,setErrMsg(RESPONSE.ALREADY_EXISTS,"Phone no "))
        }
        

        userModel.create({
            name:name,
            email:email,
            phone:phone , 
            age:age,
            role:ROLE.STUDENT,
            status:STATUS.ACTIVE,
        });

        return send(res,RESPONSE.SUCCESS);

        // return res.status(200).json({
        //     success:true,
        //     message:"Student created successfully"
        // });

        
    }catch(error){
        console.log("Create Student",error);

        return send(res,RESPONSE.ERROR);
        // return res.status(500).json({
        //     success:false,
        //     message:"Something went wrong",
        // });
        
    }
 })