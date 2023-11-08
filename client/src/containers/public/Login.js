import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { apiRegister } from "../../services/auth";
import * as actions from "../../store/actions";

const Login = () => {
   const location = useLocation();
   const dispatch = useDispatch();
   const [isRegister, setRegister] = useState(location.state?.flag);
   const [payload, setPayload] = useState({
      phone: "",
      password: "",
      name: "",
   });
   useEffect(() => {
      setRegister(location.state?.flag);
   }, [location.state?.flag]);
   // console.log(location);

   const handleSubmit = async () => {
      console.log(payload);
      dispatch(actions.register(payload));
   };

   return (
      <div className="bg-[white] w-[600px] p-[30px] pb-[100px]  mx-auto my-0 shadow-md rounded-md">
         <h3 className="font-semibold text-2xl mb-3">
            {isRegister ? "Đăng kí tài khoản" : "Đăng nhập"}
         </h3>
         <div className="w-full flex flex-col gap-3">
            {isRegister && (
               <InputForm
                  label={"Họ Tên"}
                  value={payload.name}
                  setValue={setPayload}
                  type={"name"}
               />
            )}
            <InputForm
               label={"Số Điện Thoại"}
               value={payload.phone}
               setValue={setPayload}
               type={"phone"}
            />
            <InputForm
               label={"Mật Khẩu"}
               value={payload.password}
               setValue={setPayload}
               type={"password"}
            />
            <Button
               text={isRegister ? "Đăng kí" : "Đăng nhập"}
               bgcolor={"bg-secondary1"}
               textcolor={"text-[white]"}
               fullWidth
               onClick={handleSubmit}
            />
         </div>
         <div className="flex justify-between items-center text-[blue] pt-4">
            {isRegister ? (
               <span className="text-sm text-black">
                  Bạn đã có tài khoản?{" "}
                  <span
                     onClick={() => setRegister(false)}
                     className="cursor-pointer hover:text-[red] text-[blue]"
                  >
                     Đăng nhập ngay
                  </span>
               </span>
            ) : (
               <>
                  <span className="cursor-pointer hover:text-[red] text-sm">
                     Bạn quên mật khẩu?
                  </span>
                  <span
                     onClick={() => setRegister(true)}
                     className="cursor-pointer hover:text-[red] text-sm"
                  >
                     Tạo tài khoản mới
                  </span>
               </>
            )}
         </div>
      </div>
   );
};

export default Login;
