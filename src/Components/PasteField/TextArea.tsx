import React, { useState } from "react";
import { Switch } from "@chakra-ui/switch";
import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import { BiPaste } from "react-icons/bi";
import { BodyContext } from "../../Contexts/BodyContext";

function TextArea() {
  const body = React.useContext(BodyContext);
  const [isHighlighted, setisHighlighted] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const isHighlightedHandler = () => {
    setisHighlighted(!isHighlighted);
  };

  const isDarkThemeHandler = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const pasteButtonHandler = () => {
    navigator.clipboard
      .readText()
      .then((clipText) => {
        body.setBody(body.body + clipText);
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
          <span className="pr-2">Dark Mode</span>
          <Switch
            size="md"
            defaultChecked={false}
            onChange={isDarkThemeHandler}
          />
        </div>
      </div>
      <Editor
        value={body.body}
        onValueChange={body.setBody}
        highlight={(code) =>
          isHighlighted ? highlight(code,languages.js, "javascript") : code
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
