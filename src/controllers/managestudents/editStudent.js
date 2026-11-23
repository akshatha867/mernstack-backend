import { Router } from "express";
import userModel from "../../model/userModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { EMAIL_REGEX, PHONEREGEX, STATUS } from "../../config/constant.js";

let router = Router();

export default router.put("/", async (req, res) => {
  try {
    let { student_id } = req.query;
    let { name, email, phone, age } = req.body;

    let updates = {};

    if (name) {
      updates.name = name;
    }
    if (email) {
      let isEmail = email.match(EMAIL_REGEX);
      if (!isEmail) {
        return send(res, setErrMsg(RESPONSE.INVALID, "Email"));
      }
      let isEmailExists = await userModelmodel.findOne({ email: email });
      if (isEmailExists) {
        return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Email"));
      }
      updates.email = email;
    }
    if (phone) {
      let isPhone = phone.match(PHONEREGEX);
      if (!isPhone) {
        return send(res, setErrMsg(RESPONSE.INVALID, "Phone"));
      }
      let isPhoneExist = await userModel.findOne({ phone: phone });
      if (isPhoneExist) {
        return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Phone no "));
      }

      updates.phone = phone;
    }
    if (age) {
      updates.age = age;
    }

    await userModel.updateOne(
      {
        _id: student_id,
      },
      {
        $set: updates,
      },
    );

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Edit student error", error);
    return send(res, RESPONSE.ERROR);
  }
});
