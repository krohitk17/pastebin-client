import React from "react";
import NavItem from "./NavItem";

function Navbar() {
  return (
    <div className="w-[100%] z-40 bg-opacity-10 backdrop-blur-sm bg-red-500">
      <ul className="flex flex-row mx-auto xl:py-1">
        <li className="p-1 m-1 text-2xl pr-4 ">PASTEBIN</li>
        <NavItem className="ml-auto">01</NavItem>
        <NavItem>02</NavItem>
      </ul>
    </div>
  );
}

export default Navbar;
