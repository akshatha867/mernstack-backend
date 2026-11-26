import studentApiHandler from "./src/controllers/managestudents/apiHelper.js";
import authApiHandler from "./src/controllers/auth/apiHelper.js";
import adminHandler from "./src/controllers/manageAdmin/apiHelper.js";
import courseHandler from "./src/controllers/manageCourse/apiHelper.js";

const routes = (app) => {
  app.use("/api/student", studentApiHandler);
  app.use("/api/auth", authApiHandler);
  app.use("/api/admin", adminHandler);
  app.use("/api/course", courseHandler);
};
export default routes;
