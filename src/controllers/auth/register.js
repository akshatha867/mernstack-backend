import { Router } from "express";
import userModel from "../../model/userModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import {
  EMAIL_REGEX,
  PASSWORDREGEX,
  PHONEREGEX,
  ROLE,
  STATUS,
} from "../../config/constant.js";
import bcrypt from "bcrypt";

let router = Router();

export default router.post("/", async (req, res) => {
  try {
    let { name, email, phone, password, age } = req.body || {};

    if (!name) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "Name"));
    }
    if (!email) {
      return res.status(201).json({
        code: 201,
        message: "Email is required",
      });
    }
    if (!phone) {
      return res.status(201).json({
        code: 201,
        message: "phone is required",
      });
    }

    let isEmail = email.match(EMAIL_REGEX);
    let isPhone = phone.match(PHONEREGEX);
    let isPASSWORD = password.match(PASSWORDREGEX);

    if (!isEmail) {
      return send(res, setErrMsg(RESPONSE.INVALID, "Email"));
    }
    if (!isPhone) {
      return send(res, setErrMsg(RESPONSE.INVALID, "Phone"));
    }
    if (!isPASSWORD) {
      return send(res, setErrMsg(RESPONSE.INVALID, "Password"));
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let isEmailExists = await userModel.findOne({ email: email });
    let isPhoneExist = await userModel.findOne({ phone: phone });

    if (isEmailExists) {
      return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Email"));
    }

    if (isPhoneExist) {
      return send(res, setErrMsg(RESPONSE.ALREADY_EXISTS, "Phone no "));
    }

    userModel.create({
      name: name,
      email: email,
      phone: phone,
      age: age,
      password: hashedPassword,
      role: ROLE.TEACHER,
      status: STATUS.ACTIVE,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Create Student", error);

    return send(res, RESPONSE.ERROR);
  }
});
