import * as services from "../services/user";

export const getCurrent = async (req, res) => {
   const { id } = req.user;
   try {
      const response = await services.getOne(id);
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Failed at category controller: " + error,
      });
   }
};

export const UpdateUser = async (req, res) => {
   const { id } = req.user;
   const payload = req.body;
   try {
      if (!payload)
         return res.status(400).json({
            err: 1,
            msg: "Thieu payload update user",
         });
      const response = await services.getUpdateUser(payload, id);
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         err: -1,
         msg: "Failed at category controller: " + error,
      });
   }
};
