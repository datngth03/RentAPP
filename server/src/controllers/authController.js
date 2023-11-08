import * as authService from "../services/auth";

export const register = async (req, res, next) => {
   const { name, phone, password } = req.body;

   try {
      if (!name || !phone || !password)
         return res.status(400).json({
            err: -1,
            message: "missing input...",
         });
      const response = await authService.registerService(req.body);
      return res.status(200).json(response);
   } catch (err) {
      return res.status(500).json({
         error: -1,
         message: "co loi o authController " + err,
      });
   }
};
export const login = async (req, res, next) => {
   const { phone, password } = req.body;

   try {
      if (!phone || !password)
         return res.status(400).json({
            err: -1,
            message: "missing input...",
         });
      const response = await authService.loginService(req.body);
      return res.status(200).json(response);
   } catch (err) {
      return res.status(500).json({
         error: -1,
         message: "co loi o authController " + err,
      });
   }
};
