import React from "react";

function FormItem({ label, children }) {
  return (
    <div className="flex pt-2">
      <p className="font-bold pt-2 w-[14em]">{label}</p>
      <div className="w-[15em]">{children}</div>
    </div>
  );
}

export default FormItem;
