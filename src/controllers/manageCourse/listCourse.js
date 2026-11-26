import { Router } from "express";
import courseModel from "../../model/courseModel.js";
import { RESPONSE } from "../../config/global.js";
import { send } from "../../helper/responseHelper.js";
import { authenticate } from "../../middleware/authenticate.js";
import { ROLE } from "../../config/constant.js";

let router = Router();

export default router.get("/", authenticate, async (req, res) => {
  try {
    let user_id;
    if (req.user.role === ROLE.TEACHER) {
      user_id = req.user.user_id;
    }
    let query = {};

    if (user_id) {
      query.teacher_id = user_id;
    }

    let courseData = await courseModel
      .find(query)
      .populate("teacher_id", "-password");
    return send(res, RESPONSE.SUCCESS, courseData);
  } catch (error) {
    console.log("List course", error);
    return send(res, RESPONSE.ERROR);
  }
});
