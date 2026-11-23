import Router from "express";
import createStudent from "./createStudent.js";
import listStudent from "./listStudent.js";
import deleteStudent from "./deleteStudent.js";
import editStudent from "./editStudent.js";


let router=Router();
router.use("/create",createStudent);
router.use("/list",listStudent);
router.use("/delete",deleteStudent);
router.use("/edit",editStudent)

export default router;