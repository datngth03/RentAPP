import React from "react";
import logo from "../../assets/logowithoutbg.png";
import Button from "../../components/Button";
import icons from "../../ultils/icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";

const { AiOutlinePlusCircle } = icons;
function Header() {
   const navigate = useNavigate();

   const goLogin = () => {
      navigate(path.LOGIN);
   };

   return (
      <div className="w-[1100px] flex items-center justify-between ">
         <img src={logo} alt="logo" className="w-[240px] h-[70px] object-container  py-[10px]" />
         <div className="item-center flex gap-3">
            <span className="flex items-center">Phongtro123.com xin chào!!!</span>
            <Button text={"Đăng kí"} textcolor="text-[white]" bgcolor="bg-blue-500" />
            <Button
               text={"Đăng nhập"}
               textcolor="text-[white]"
               bgcolor="bg-blue-500"
               onClick={goLogin}
            />
            <Button
               text={"Đăng tin mới"}
               textcolor="text-[white]"
               bgcolor="bg-secondary2"
               Icon={AiOutlinePlusCircle}
            />
         </div>
      </div>
   );
}
export default Header;
