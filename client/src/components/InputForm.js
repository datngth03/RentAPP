import React, { memo } from "react";

function InputForm({ label, value, setValue, type }) {
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
            value={value}
            onChange={(e) => setValue((prev) => ({ ...prev, [type]: e.target.value }))}
         />
      </div>
   );
}

export default memo(InputForm);
