import React from "react";
import logo from "../../assets/logowithoutbg.png";
import Button from "../../components/Button";
import icons from "../../ultils/icons";
import { useNavigate, Link } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useCallback } from "react";

const { AiOutlinePlusCircle } = icons;
function Header() {
   const navigate = useNavigate();

   const goLogin = useCallback(
      (flag) => {
         navigate(path.LOGIN, { state: { flag } });
      },
      [navigate]
   );

   return (
      <div className="w-[1100px] flex items-center justify-between ">
         <Link to={"/"}>
            <img src={logo} alt="logo" className="w-[240px] h-[70px] object-container  py-[10px]" />
         </Link>
         <div className="item-center flex gap-3">
            <span className="flex items-center">Phongtro123.com xin chào!!!</span>
            <Button
               text={"Đăng kí"}
               textcolor="text-[white]"
               bgcolor="bg-blue-500"
               onClick={() => goLogin(true)}
            />
            <Button
               text={"Đăng nhập"}
               textcolor="text-[white]"
               bgcolor="bg-blue-500"
               onClick={() => goLogin(false)}
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
