import React from "react";
import logo from "../../assets/logowithoutbg.png";
import Button from "../../components/Button";
import User from "../../components/User";
import icons from "../../ultils/icons";
import { useNavigate, Link } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
const { AiOutlinePlusCircle } = icons;

function Header() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { isLoggedIn } = useSelector((state) => state.auth);

   const goLogin = useCallback(
      (flag) => {
         const resetPayload = flag
            ? { phone: "", password: "", name: "" }
            : { phone: "", password: "" };
         navigate(path.LOGIN, { state: { flag, resetPayload } });
      },
      [navigate]
   );

   return (
      <div className="w-[1100px] flex items-center justify-between ">
         <Link to={"/"}>
            <img src={logo} alt="logo" className="w-[240px] h-[70px] object-container  py-[10px]" />
         </Link>
         <div className="item-center flex gap-3">
            {!isLoggedIn && (
               <div className="flex items-center gap-1">
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
               </div>
            )}
            {isLoggedIn && (
               <div className="flex items-center gap-3 relative">
                  <User />
                  <span
                     className="cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2"
                     onClick={() => dispatch(actions.logout())}
                  >
                     {/* <AiOutlineLogout /> */}
                     Đăng xuất
                  </span>
               </div>
            )}
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
