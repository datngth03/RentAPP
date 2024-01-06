import React from "react";

function Button({
   text,
   textColor,
   bgColor,
   Icon,
   hoverBgColor,
   onClick,
   fullWidth,
   underlineOnHover,
   className,
   width,
}) {
   return (
      <button
         type="button"
         className={`${width} px-2 py-2 ${className} ${textColor} ${bgColor} ${
            fullWidth && "w-full"
         } 
         outline-none rounded-[4px] ${underlineOnHover && "hover:underline"} hover:${hoverBgColor}
         flex items-center justify-center`}
         onClick={onClick}
      >
         <span>{text}</span>
         <span>{Icon && <Icon />}</span>
      </button>
   );
}

export default Button;
