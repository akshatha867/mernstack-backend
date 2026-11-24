import { Router } from "express";
import userModel from "../../model/userModel.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import { ROLE, STATUS } from "../../config/constant.js";
import { authenticate } from "../../middleware/authenticate.js";

let router = Router();

export default router.get("/", authenticate, async (req, res) => {
  try {
    // if(req.user.role!==ROLE.TEACHER){
    //     return send(res,RESPONSE.ACCESS_DENIED);
    // }

    let { student_id, search } = req.query;

    //pagination
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let skip = (page - 1) * limit;

    let query = {
      status: STATUS.ACTIVE,
    };

    if (req.user.role === ROLE.STUDENT) {
      query._id = req.user.user_id;
    }

    if (student_id) {
      query._id = student_id;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    let data = await userModel.find(query, { __v: 0 }).skip(skip).limit(limit);

    if (!data.length) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "Student_details"));
    }

    return send(res, RESPONSE.SUCCESS, data);
  } catch (error) {
    console.log("List students", error);
    return send(res, RESPONSE.ERROR);
  }
});
