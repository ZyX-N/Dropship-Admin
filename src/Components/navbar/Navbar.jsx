import { Bars3Icon } from "@heroicons/react/20/solid";
import React from "react";
import LogoutIcon from "../icons/Logout";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {

  const navigate = useNavigate();

  const logoutHandler = () =>{
    navigate("/auth");
  }

  return (
    
    <nav className="body-font   bg-transparent w-full ">
      <div className="w-full mx-auto my-auto flex justify-between pr-4 p-2 items-center">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          >
          <Bars3Icon className="size-7" />
        </button>

        <button className="flex items-center bg-blue-600 border-0 p-2  rounded-full focus:outline-none hover:bg-bue-700 hover:scale-105 transition-all duration-300 text-white mt-4 md:mt-0" onClick={logoutHandler}>
          <LogoutIcon />
        </button>
      </div>
    </nav>
    
  );
};

export default Navbar;