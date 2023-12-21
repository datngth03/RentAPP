import authRouter from "./auth";
import insertRouter from "./insert";

const initRouter = (app) => {
   app.use("/api/v1/auth", authRouter);
   app.use("/api/v1/insert", insertRouter);

   app.use("/", (req, res) => {
      res.send("server starting");
   });
};

export default initRouter;
