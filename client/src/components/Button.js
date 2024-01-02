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
}) {
   return (
      <button
         type="button"
         className={`px-2 py-2 ${className} ${textColor} ${bgColor} ${fullWidth && "w-full"} 
         outline-none rounded-[4px] ${underlineOnHover && "hover:underline"} hover:${hoverBgColor}
         flex items-center justify-center gap-1`}
         onClick={onClick}
      >
         <span>{text}</span>
         <span>{Icon && <Icon />}</span>
      </button>
   );
}

export default Button;
