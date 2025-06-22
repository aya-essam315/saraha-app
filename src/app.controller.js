import authController from "./modules/auth/auth.controller.js"
import userController from "./modules/user/user.controller.js"
import messageController from "./modules/message/message.controller.js"
import { globalError } from "./utils/error/global.error.js";
const bootStrap = (app, express) => {
    app.use(express.json());

    app.get("/", (req, res, next) => {
        return res.status(200).json({ message: "done" });
    });

    app.use("/auth", authController)
    app.use("/user", userController)
    app.use("/message", messageController)

    // app.all("*", (req, res, next) => {
    //         res.status(404).json({
    //         success: false,
    //         message: "Page not found"
    //     })
    // });

app.use(globalError)
    
};

export default bootStrap;
