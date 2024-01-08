import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import icons from "../ultils/icons";

const { GrStar } = icons;

const Sitem = ({ title, star, newPost, price, image, createdAt }) => {
   const formatTime = (createdAt) => {
      return moment(createdAt).fromNow();
   };
   const handleStar = (star) => {
      let stars = [];
      for (let i = 1; i <= +star; i++)
         stars.push(<GrStar className="star-item" size={18} color="yellow" />);
      return stars;
   };
   return (
      <div className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
         <img
            src={image[0]}
            alt="anh"
            className="w-[65px] h-[65px] object-cover flex-none rounded-md"
         />
         <div className="w-full flex-auto flex flex-col justify-between gap-1">
            <h4 className={`text-[14px] ${newPost ? "text-blue-600" : "text-orange-600"}`}>
               {handleStar(+star).length > 0 &&
                  handleStar(+star).map((star, number) => {
                     return <span key={number}>{star}</span>;
                  })}
               {`${title?.slice(0, 45)}...`}
            </h4>
            <div className=" flex items-center justify-between w-full">
               <span className="text-sm font-medium text-green-500">{price}</span>
               <span className="text-sm text-gray-300">{formatTime(createdAt)}</span>
            </div>
         </div>
      </div>
   );
};

export default memo(Sitem);
