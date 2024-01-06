import db from "../models";

// GET CURRENT
export const getOne = (id) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
               exclude: ["password"],
            },
         });
         resolve({
            err: response ? 0 : 1,
            msg: response ? "OK" : "Failed to get user.",
            response,
         });
      } catch (error) {
         reject(error);
      }
   });
export const getUpdateUser = (payload, id) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await db.User.update(payload, {
            where: { id },
         });
         resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? "OK" : "Failed to update user.",
            response,
         });
      } catch (error) {
         reject(error);
      }
   });
