import React, { useState } from "react";
import { Switch } from "@chakra-ui/switch";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import { BiPaste } from "react-icons/bi";

function TextArea() {
  const [text, setText] = useState("");
  const [isHighlighted, setisHighlighted] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  const isHighlightedHandler = () => {
    setisHighlighted(!isHighlighted);
  };

  const pasteButtonHandler = () => {
    navigator.clipboard
      .readText()
      .then((clipText) => {
        setText(text + clipText);
      })
      .catch((err) => {
        console.log("Could not paste", err);
      });
  };

  return (
    <div className=" pt-4 ">
      <div className="flex flex-row justify-between">
        <div className="flex pb-2 items-center">
          <p className="font-bold pr-2">New Paste</p>
          <button
            className="bg-blue-500 text-white rounded-lg px-3 py-2"
            onClick={pasteButtonHandler}
          >
            <BiPaste />
          </button>
        </div>

        <div className="font-bold pb-2">
          <span className="pr-2">Syntax Highlighting</span>
          <Switch
            size="md"
            defaultChecked={false}
            onChange={isHighlightedHandler}
          />
        </div>
      </div>
      <Editor
        value={text}
        onValueChange={(code) => setText(code)}
        highlight={(code) =>
          isHighlighted ? highlight(code, languages.js) : code
        }
        padding={10}
        placeholder="Paste your code here..."
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          minHeight: "400px",
          backgroundColor: isDarkTheme
            ? darkTheme.plain.backgroundColor
            : lightTheme.plain.backgroundColor,
        }}
      />
    </div>
  );
}

export default TextArea;
