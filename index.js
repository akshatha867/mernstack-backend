import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./src/helper/connection.js";
import routes from "./routes.js";
import {fileURLToPath } from "url";
import path from "path";

dotenv.config();


let app=express();
let PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);

app.use(express.static(path.join(__dirname,"public")));
routes(app);
ConnectDB();
app.listen(PORT, () =>{
    console.log("Server is listening on",PORT);
    
});