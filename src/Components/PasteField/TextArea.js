import React, { useState } from "react";
import { Switch } from "@chakra-ui/switch";

function TextArea() {
  const [text, setText] = useState("");
  const [isHighlight, setIsHighlight] = useState(false);

  const onChangeHandler = (e) => {
    setText(e.target.value);
    console.log(e.target.value);
    console.log(text);
  };

  const isHighlightHandler = () => {
    setIsHighlight(!isHighlight);
    console.log(isHighlight);
  };

  const pasteButtonHandler = () => {
    navigator.clipboard.readText()
      .then((clipText) => {
        setText(text + clipText);
        console.log(clipText);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  return (
    <div className=" pt-4 px-4">
      <div className="flex flex-row justify-between">
        <div className="flex pb-2 items-center">
          <p className="font-bold pr-2">New Paste</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={pasteButtonHandler}>+ Paste</button>
        </div>

        <div className="font-bold pb-2">
          <span className="pr-2">Syntax Highlighting</span>
          <Switch
            size="md"
            defaultChecked={false}
            onChange={isHighlightHandler}
          />
        </div>
      </div>
      <textarea
        className="w-full p-3 h-[300px] bg-gray-100 rounded-lg overflow-scroll resize-none focus-visible:outline-none"
        placeholder="Paste your code here..."
        onChange={onChangeHandler}
        value={text}
      ></textarea>
    </div>
  );
}

export default TextArea;
