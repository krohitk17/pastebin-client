import React from "react";

function TextArea() {
  return (
    <div className=" pt-4 px-4">
      <p className="bold pb-2">New Paste</p>
      <textarea
        className="w-full p-3 h-[300px] bg-gray-100 rounded-lg overflow-hidden resize-none focus-visible:outline-none"
        placeholder="Paste your code here..."
      ></textarea>
    </div>
  );
}

export default TextArea;
