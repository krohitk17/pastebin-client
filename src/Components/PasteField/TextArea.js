import React from "react";
import { Switch } from "@chakra-ui/switch";

function TextArea() {
  return (
    <div className=" pt-4 px-4">
      <div className="flex flex-row justify-between">
        <p className="font-bold pb-2">New Paste</p>

        <div className="font-bold pb-2">
          <span className="pr-2">Syntax Highlighting</span>
          <Switch size="md" />
        </div>
      </div>
      <textarea
        className="w-full p-3 h-[300px] bg-gray-100 rounded-lg overflow-hidden resize-none focus-visible:outline-none"
        placeholder="Paste your code here..."
      ></textarea>
    </div>
  );
}

export default TextArea;
