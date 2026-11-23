import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./src/helper/connection.js";
import routes from "./routes.js"

dotenv.config();


let app=express();
let PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
routes(app);
ConnectDB();
app.listen(PORT, () =>{
    console.log("Server is listening on",PORT);
    
});