import React from "react";

function NavItem({ children, className, onClick }: { children: any, className: string, onClick: any })
{
  return (
    <li
      onClick={onClick}
      className={`p-1 m-1 ${className}  hover:cursor-pointer text-lg tracking-wider `}
    >
      {children}
    </li>
  );
}

export default NavItem;
