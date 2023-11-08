import React from "react";

function Button({ text, textcolor, bgcolor, Icon, onClick, fullWidth }) {
   return (
      <button
         type="button"
         className={`px-2 py-2 ${textcolor} ${bgcolor} ${
            fullWidth && "w-full"
         } outline-none rounded-[4px] hover:underline flex items-center justify-center gap-1`}
         onClick={onClick}
      >
         <span>{text}</span>
         <span>{Icon && <Icon />}</span>
      </button>
   );
}
export default Button;
