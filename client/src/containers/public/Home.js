import React from "react";
import Header from "./Header";
import { Navigation, Search } from "./index";
import { Intro, Contact } from "../../components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
   const { isLoggedIn } = useSelector((state) => state.auth);
   return (
      <div className="w-full flex flex-col items-center h-full">
         <Header />
         <Navigation />
         {isLoggedIn && <Search />}
         <div className="w-4/5 lg:w-4/5 flex flex-col items-start justify-start mt-3">
            <Outlet />
         </div>
         <Intro />
         <Contact />
      </div>
   );
};

export default Home;
