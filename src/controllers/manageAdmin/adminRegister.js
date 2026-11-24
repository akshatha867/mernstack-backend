import { Router } from "express";
import userModel from "../../model/userModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { EMAIL_REGEX, PASSWORDREGEX, ROLE } from "../../config/constant.js";
import bcrypt from "bcrypt";

let router = Router();

export default router.post("/", async (req, res) => {
  try {
    let { name, email, password } = req.body || {};
    if (!name) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "Name"));
    }
    if (!email) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "Email"));
    }
    if (!password) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "Password"));
    }

    let isEmail = email.match(EMAIL_REGEX);
    let isPassword = password.match(PASSWORDREGEX);

    if (!isEmail) {
      return send(res, setErrMsg(RESPONSE.INVALID, "Email"));
    }
    if (!isPassword) {
      return send(res, setErrMsg(RESPONSE.INVALID, "Password"));
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    userModel.create({
      name: name,
      email: email,
      role: ROLE.ADMIN,
      password: hashedPassword,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Admin error", error);
    return send(res, RESPONSE.ERROR);
  }
});
