import React from "react";
import { CreatePost } from "../containers/system";

const UpdatePost = ({ setIsEdit }) => {
   return (
      <div
         className="absolute top-0 bottom-0 right-0 left-0 bg-overlay-70 flex justify-center"
         onClick={(e) => {
            e.stopPropagation();
            setIsEdit(false);
         }}
      >
         <div
            className="max-w-[1100px] bg-white w-full overflow-y-auto"
            onClick={(e) => {
               e.stopPropagation();
            }}
         >
            <CreatePost isEdit />
         </div>
      </div>
   );
};

export default UpdatePost;
