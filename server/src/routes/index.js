import authRouter from "./auth";

const initRouter = (app) => {
   app.use("/api/v1/auth", authRouter);

   app.use("/", (req, res) => {
      res.send("server starting");
   });
};

export default initRouter;
