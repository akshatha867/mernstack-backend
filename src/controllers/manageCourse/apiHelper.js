import { Router } from "express";
import createCourse from "./createCourse.js";
import listCourse from "./listCourse.js";

let router = Router();

router.use("/create", createCourse);
router.use("/list", listCourse);

export default router;
