import React from "react";

function InputForm({ label }) {
   return (
      <div>
         <label className="text-xs" htmlFor="label">
            {label}
         </label>
         <input
            type="text"
            id="label"
            name="label"
            className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
         />
      </div>
   );
}

export default InputForm;
