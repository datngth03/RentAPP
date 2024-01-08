import db from "../models";
const { Op } = require("sequelize");
import { v4 } from "uuid";
import moment from "moment";
import { generateCode } from "../utlis/generateCode";
import generateDate from "../utlis/generateDate";

export const getPostsService = () =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
               { model: db.Image, as: "images", attributes: ["image"] },
               {
                  model: db.Attribute,
                  as: "attributes",
                  attributes: ["price", "acreage", "published", "hashtag"],
               },
               { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
            ],
            attributes: ["id", "title", "star", "address", "description"],
         });
         resolve({
            err: response ? 0 : 1,
            msg: response ? "OK" : "Getting posts is failed.",
            response,
         });
      } catch (error) {
         reject(error);
      }
   });
export const getPostsLimitService = (
   page,
   { limitPost, order, ...query },
   { priceNumber, areaNumber }
) =>
   new Promise(async (resolve, reject) => {
      try {
         let offset = !page || +page <= 1 ? 0 : +page - 1;
         const queries = { ...query };
         const limit = +limitPost || +process.env.LIMIT;
         queries.limit = limit;
         if (priceNumber) query.priceNumber = { [Op.between]: priceNumber };
         if (areaNumber) query.areaNumber = { [Op.between]: areaNumber };
         if (order) queries.order = [order];
         const response = await db.Post.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            include: [
               { model: db.Image, as: "images", attributes: ["image"] },
               {
                  model: db.Attribute,
                  as: "attributes",
                  attributes: ["price", "acreage", "published", "hashtag"],
               },
               { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
               { model: db.Feature, as: "features" },
               { model: db.Label, as: "labels" },
            ],
         });
         resolve({
            err: response ? 0 : 1,
            msg: response ? "OK" : "Getting posts is failed.",
            response,
         });
      } catch (error) {
         reject(error);
      }
   });

export const getNewPostService = () =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [["createdAt", "DESC"]],
            limit: +process.env.LIMIT,
            include: [
               { model: db.Image, as: "images", attributes: ["image"] },
               {
                  model: db.Attribute,
                  as: "attributes",
                  attributes: ["price", "acreage", "published", "hashtag"],
               },
            ],
            attributes: ["id", "title", "star", "createdAt"],
         });
         resolve({
            err: response ? 0 : 1,
            msg: response ? "OK" : "Getting posts is failed.",
            response,
         });
      } catch (error) {
         reject(error);
      }
   });

export const createNewPostService = (body, userId) =>
   new Promise(async (resolve, reject) => {
      try {
         const attributesId = v4();
         const imagesId = v4();
         const featureId = v4();
         const hashtag = Math.floor(Math.random() * Math.pow(10, 6));
         const labelCode = generateCode(body.label);
         const cleanedProvince = body.province.replace(/^(Tỉnh|Thành phố)\s*/i, "").trim();
         const provinceCode = generateCode(cleanedProvince);
         const getDate = generateDate();
         const response = await db.Post.create({
            id: v4(),
            title: body.title || null,
            labelCode,
            address: body.address || null,
            attributesId,
            categoryCode: body.categoryCode || null,
            description: JSON.stringify(body.description),
            userId,
            featureId,
            imagesId,
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode,
            priceNumber: body.priceNumber || null,
            areaNumber: body.areaNumber,
         });
         await db.Attribute.create({
            id: attributesId,
            price:
               +body.priceNumber < 1
                  ? `${+body.priceNumber * 1000000} đồng/tháng`
                  : `${+body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber}m2`,
            published: moment(new Date()).format("DD/MM/YYYY"),
            hashtag: hashtag,
            ignoreDuplicates: true,
         });
         await db.Image.create({
            id: imagesId,
            image: JSON.stringify(body?.images),
            // ignoreDuplicates: true,
         });
         await db.Feature.create({
            id: featureId,
            code: `#${hashtag}`,
            area: body.label,
            type: body?.category,
            target: body.target,
            bonus: "Tin VIP",
            created: getDate.today,
            expired: getDate.expired,
            ignoreDuplicates: true,
         });

         await db.Province.findOrCreate({
            where: { value: cleanedProvince },
            defaults: {
               code: provinceCode,
               value: cleanedProvince,
            },
         });
         await db.Label.findOrCreate({
            where: { code: labelCode },
            defaults: {
               code: labelCode,
               value: body.label,
            },
         });
         resolve({
            err: response ? 0 : 1,
            msg: response ? "OK" : "Getting createPosts is failed.",
            response,
         });
      } catch (error) {
         reject(error);
      }
   });

export const getPostsLimitAdminService = (id, page, query) =>
   new Promise(async (resolve, reject) => {
      try {
         let offset = !page || +page <= 1 ? 0 : +page - 1;
         const queries = { ...query, userId: id };
         const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            order: [["createdAt", "DESC"]],
            include: [
               { model: db.Image, as: "images", attributes: ["image"] },
               {
                  model: db.Attribute,
                  as: "attributes",
                  attributes: ["price", "acreage", "published", "hashtag"],
               },
               { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
               { model: db.Feature, as: "features" },
            ],
            // attributes: ["id", "title", "star", "address", "description"],
         });
         resolve({
            err: response ? 0 : 1,
            msg: response ? "OK" : "Getting posts is failed.",
            response,
         });
      } catch (error) {
         reject(error);
      }
   });
export const updatePostService = ({ postId, attributesId, imagesId, featureId, ...body }) =>
   new Promise(async (resolve, reject) => {
      try {
         const labelCode = generateCode(body.label);
         const cleanedProvince = body.province.replace(/^(Tỉnh|Thành phố)\s*/i, "").trim();
         const provinceCode = generateCode(cleanedProvince);
         let desc;
         if (body.description && body.description.includes("\n")) {
            desc = JSON.stringify(body.description.split("\n"));
         } else {
            desc = JSON.stringify(body.description);
         }

         await db.Post.update(
            {
               title: body.title || null,
               labelCode,
               address: body.address || null,
               categoryCode: body.categoryCode || null,
               description: desc,
               areaCode: body.areaCode || null,
               priceCode: body.priceCode || null,
               provinceCode,
               priceNumber: body.priceNumber || null,
               areaNumber: body.areaNumber,
            },
            { where: { id: postId } }
         );
         await db.Attribute.update(
            {
               price:
                  +body.priceNumber < 1
                     ? `${+body.priceNumber * 1000000} đồng/tháng`
                     : `${+body.priceNumber} triệu/tháng`,
               acreage: `${body.areaNumber}m2`,
               ignoreDuplicates: true,
            },
            { where: { id: attributesId } }
         );
         await db.Image.update(
            {
               image: JSON.stringify(body?.images),
            },
            { where: { id: imagesId } }
         );
         await db.Feature.update(
            {
               area: body?.label,
               type: body?.category,
               target: body.target,
               ignoreDuplicates: true,
            },
            { where: { id: featureId } }
         );

         await db.Province.findOrCreate({
            where: { value: cleanedProvince },
            defaults: {
               code: provinceCode,
               value: cleanedProvince,
            },
         });
         await db.Label.findOrCreate({
            where: { code: labelCode },
            defaults: {
               code: labelCode,
               value: body.label,
            },
         });
         resolve({
            err: 0,
            msg: "updated",
         });
      } catch (error) {
         reject(error);
      }
   });
export const deletePostService = (postId) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await db.Post.destroy({
            where: { id: postId },
         });
         resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? "OK" : "Getting posts is failed.",
            response,
         });
      } catch (error) {
         reject(error);
      }
   });
