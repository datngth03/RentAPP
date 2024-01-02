// ProvinceBtn.js

import React, { memo } from "react";

const ProvinceBtn = ({ name, image }) => {
   return (
      <div className="shadow-md overflow-hidden text-blue-700 cursor-pointer hover:text-orange-600 rounded-tl-md rounded-tr-md">
         <div className="relative">
            <img
               src={image}
               alt={name}
               className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md transition-transform transform hover:scale-110 duration-300"
            />
         </div>
         <div className="font-medium px-2 py-3 text-center">{name}</div>
      </div>
   );
};

export default memo(ProvinceBtn);
