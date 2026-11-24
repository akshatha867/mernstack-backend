import { Router } from "express";
import adminRegister from "./adminRegister.js";
import adminLogin from "./adminLogin.js";

let router = Router();

router.use("/register", adminRegister);
router.use("/login", adminLogin);

export default router;
