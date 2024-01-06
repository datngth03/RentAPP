import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import chothuematbang from "../../data/matbang_vanphong.json";
import chothuecanho from "../../data/chothuecanho.json";
import nhachothue from "../../data/nhachothue.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import { generateCode } from "../utlis/generateCode";
import { dataPrice, dataArea } from "../utlis/data";
import { getNumberFromString, getNumberFromStringV2 } from "../utlis/common";
require("dotenv").config();
const data = [
   {
      header: chothuephongtro.header,
      body: chothuephongtro.body,
      code: "CTPT",
      name: "Cho Thuê Phòng Trọ",
   },
   {
      header: chothuematbang.header,
      body: chothuematbang.body,
      code: "CTMB",
      name: "Cho Thuê Mặt Bằng",
   },
   {
      header: chothuecanho.header,
      body: chothuecanho.body,
      code: "CTCH",
      name: "Cho Thuê Căn Hộ",
   },
   {
      header: nhachothue.header,
      body: nhachothue.body,
      code: "NCT",
      name: "Nhà Cho Thuê",
   },
];

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = () =>
   new Promise(async (resolve, reject) => {
      try {
         const provinceCodes = [];
         const labelCodes = [];
         data.forEach((cate) => {
            cate.body.forEach(async (item) => {
               let postId = v4();
               let labelCode = generateCode(item?.header?.nav?.content).trim();
               labelCodes?.every((item) => item?.code !== labelCode) &&
                  labelCodes.push({
                     code: labelCode,
                     value: item?.header?.nav?.content?.trim(),
                  });
               let provinceCode = generateCode(
                  item?.header?.address?.content?.split(",")?.slice(-1)[0]
               ).trim();
               provinceCodes?.every((item) => item?.code !== provinceCode) &&
                  provinceCodes.push({
                     code: provinceCode,
                     value: item?.header?.address?.content?.split(",")?.slice(-1)[0].trim(),
                  });
               let attributesId = v4();
               let userId = v4();
               let imagesId = v4();
               let featureId = v4();
               let desc = JSON.stringify(item?.mainContent?.content_section);
               let currentArea = getNumberFromString(item?.header?.attributes?.acreage);
               let currentPrice = getNumberFromString(item?.header?.attributes?.price);
               await db.Post.create({
                  id: postId,
                  title: item?.header?.title,
                  star: item?.header?.stars,
                  labelCode,
                  address: item?.header?.address?.content,
                  attributesId,
                  categoryCode: cate.code,
                  description: desc,
                  userId,
                  featureId,
                  imagesId,
                  areaCode: dataArea.find(
                     (area) => area.max > currentArea && area.min <= currentArea
                  )?.code,
                  priceCode: dataPrice.find(
                     (area) => area.max > currentPrice && area.min <= currentPrice
                  )?.code,
                  provinceCode,
                  priceNumber: getNumberFromStringV2(item?.header?.attributes?.price),
                  areaNumber: getNumberFromStringV2(item?.header?.attributes?.acreage),
               });
               await db.Attribute.create({
                  id: attributesId,
                  price: item?.header?.attributes?.price,
                  acreage: item?.header?.attributes?.acreage,
                  published: item?.header?.attributes?.published,
                  hashtag: item?.header?.attributes?.hashtag,
                  ignoreDuplicates: true,
               });

               await db.Image.create({
                  id: imagesId,
                  image: JSON.stringify(item?.images),
                  ignoreDuplicates: true,
               });
               await db.Feature.create({
                  id: featureId,
                  code: item?.features?.content_section.find((i) => i.key === "Mã tin:")?.value,
                  area: item?.features?.content_section.find((i) => i.key === "Khu vực")?.value,
                  type: item?.features?.content_section.find((i) => i.key === "Loại tin rao:")
                     ?.value,
                  target: item?.features?.content_section.find((i) => i.key === "Đối tượng thuê:")
                     ?.value,
                  bonus: item?.features?.content_section.find((i) => i.key === "Gói tin:")?.value,
                  created: item?.features?.content_section.find((i) => i.key === "Ngày đăng:")
                     ?.value,
                  expired: item?.features?.content_section.find((i) => i.key === "Ngày hết hạn:")
                     ?.value,
                  ignoreDuplicates: true,
               });
               await db.User.create({
                  id: userId,
                  name: item?.contact?.content_section.find((i) => i.key === "Liên hệ:")?.value,
                  password: hashPassword("123456"),
                  phone: item?.contact?.content_section.find((i) => i.key === "Điện thoại:")?.value,
                  zalo: item?.contact?.content_section.find((i) => i.key === "Zalo")?.value,
                  fbUrl: null,
                  avatar: null,
                  ignoreDuplicates: true,
               });
            });
         });

         // console.log(provinceCodes);

         provinceCodes?.forEach(async (item) => {
            await db.Province.create(item);
         });
         labelCodes?.forEach(async (item) => {
            await db.Label.create(item);
         });

         data.forEach(async (cate) => {
            await db.Category.create({
               code: cate.code,
               value: cate.name,
               header: cate.header?.title,
               subtitle: cate.header?.description,
            });
         });

         dataPrice.forEach(async (item, index) => {
            await db.Price.create({
               code: item.code,
               value: item.value,
               order: index + 1,
            });
         });
         dataArea.forEach(async (item, index) => {
            await db.Area.create({
               code: item.code,
               value: item.value,
               order: index + 1,
            });
         });

         resolve("Done.");
      } catch (error) {
         reject(error);
      }
   });
// export const createPricesAndAreas = () =>
//    new Promise((resolve, reject) => {
//       try {
//          dataPrice.forEach(async (item, index) => {
//             await db.Price.create({
//                code: item.code,
//                value: item.value,
//                order: index + 1,
//             });
//          });
//          dataArea.forEach(async (item, index) => {
//             await db.Area.create({
//                code: item.code,
//                value: item.value,
//                order: index + 1,
//             });
//          });
//          resolve("OK");
//       } catch (err) {
//          reject(err);
//       }
//    });
