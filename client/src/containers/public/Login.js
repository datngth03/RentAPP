import React from "react";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";
const Login = () => {
   return (
      <div className="bg-[white] w-[600px] p-[30px] pb-[100px]  mx-auto my-0 shadow-md rounded-md">
         <h3 className="font-semibold text-2xl mb-3">Đăng nhập</h3>
         <div className="w-full flex flex-col gap-3">
            <InputForm label={"Số Điện Thoại"} />
            <InputForm label={"Mật Khẩu"} />
            <Button
               text="Đăng nhập"
               bgcolor={"bg-secondary1"}
               textcolor={"text-[white]"}
               fullWidth
            />
         </div>
         <div className="flex justify-between items-center text-[blue] pt-4">
            <span className="cursor-pointer hover:text-[red]">Bạn quên mật khẩu?</span>
            <span className="cursor-pointer hover:text-[red]">Tạo tài khoản mới</span>
         </div>
      </div>
   );
};

export default Login;
