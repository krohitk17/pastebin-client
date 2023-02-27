import React from "react";
import NavItem from "./NavItem";
import { SiPastebin } from "react-icons/si";
import { BsGithub } from "react-icons/bs";

function Navbar() {
  return (
    <>
      <div className="w-[100%] z-40 bg-opacity-10 backdrop-blur-sm bg-red-500 ">
        <div className="container mx-auto">
          <ul className="flex flex-row mx-auto xl:py-1">
            <li className="p-1 m-1 text-2xl pr-4 ">
              <div className="flex items-center">
                <SiPastebin />
                <div className="pl-2">PASTEBIN</div>
              </div>
            </li>
            <NavItem className="ml-auto">
              <BsGithub size={30} />
            </NavItem>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
