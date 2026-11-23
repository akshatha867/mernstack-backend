import { Router } from "express";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import userModel from "../../model/userModel.js";
import { STATUS } from "../../config/constant.js";
let router = Router();

export default router.put("/", async (req, res) => {
  try {
    let {student_id} = req.query;

    console.log("hjbhjbbh",student_id);
    
    if (!student_id) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "Student id"));
    }
    let student_data = await userModel.find({
      _id: student_id,
      status: STATUS.ACTIVE,
    });

    if (!student_data.length) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "Student "));
    }

    // await studentmodel.updateOne(
    //   {
    //     _id: student_id,
    //   },
    //   {
    //     $set: { status: STATUS.INACTIVE },
    //   },
    // );


    //permanent delete
     await userModel.findByIdAndDelete({
      _id:student_id,
     })

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return send(res, RESPONSE.ERROR);
  }
});



