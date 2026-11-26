import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { ROLE } from "../../config/constant.js";
import { RESPONSE } from "../../config/global.js";
import courseModel from "../../model/courseModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import userModel from "../../model/userModel.js";

let router = Router();

export default router.post("/", authenticate, async (req, res) => {
  try {
    if (req.user.role !== ROLE.ADMIN) {
      return send(res, RESPONSE.ACCESS_DENIED);
    }

   

    let { title, description, teacher_id } = req.body;

    if (!teacher_id) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "teacher_id"));
    }

    let isRoleTeacher = await userModel.findOne({_id:teacher_id});
    console.log(isRoleTeacher);
    if(isRoleTeacher.role !== ROLE.TEACHER){
        return send(res,RESPONSE.NOT_FOUND);
    }

    await courseModel.create({
      title: title,
      description: description,
      teacher_id: teacher_id,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Create course", error);
    return send(res, RESPONSE.ERROR);
  }
});
