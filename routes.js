
import studentApiHandler from "./src/controllers/managestudents/apiHelper.js";
import authApiHandler from "./src/controllers/auth/apiHelper.js";

const routes=(app)=>{
    app.use("/api/student",studentApiHandler);
    app.use("/api/auth",authApiHandler);
    
};
export default routes;