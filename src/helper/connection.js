import mongoose from "mongoose";    

export const ConnectDB = ()=>{
    mongoose
    .connect(process.env.DB_CONNECTION, {dbName:process.env.DB_NAME})
    //.connect(DB_URL, {dbName:database_name})
    .then(()=>{
        console.log("Database connected successfully");
    })
    //.then(()=>logs)
    .catch((error)=>{
        console.log("Database error",error);  
    }); //catch block
};