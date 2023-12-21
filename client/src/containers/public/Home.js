import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
const Home = () => {
   return (
      <div className="w-full flex flex-col items-center">
         <Header />
         <Navigation />
         <div className="w-[1100px] flex flex-col items-center mt-3 justify-start border border-red-300">
            <Outlet />
         </div>
      </div>
   );
};

export default Home;
