import { useContext, useState } from "react";
import { Switch } from "@chakra-ui/switch";
import { BiPaste } from "react-icons/bi";

import TextBox from "../../Components/TextBox";
import { bodyContext } from "../../Contexts/BodyContext";
import { syntaxContext } from "../../Contexts/SyntaxContext";
import SubmitButton from "../../Components/Button";

export default function TextArea() {
  const body = useContext(bodyContext);
  const syntax = useContext(syntaxContext);

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const isDarkThemeHandler = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const pasteButtonHandler = async () => {
    const clipText = await navigator.clipboard.readText().catch((err) => {
      console.log("Could not paste", err);
    });
    body.setBody(body.body + clipText);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex items-center">
          <SubmitButton className="h-[5em]" onClick={pasteButtonHandler}>
            <p className="font-bold pr-2">Paste</p>
            <BiPaste />
          </SubmitButton>
        </div>

        <div className="flex items-center">
          <p className="font-bold pr-2">Dark Mode</p>
          <Switch defaultChecked={false} onChange={isDarkThemeHandler} />
        </div>
      </div>

      <TextBox
        value={body.body}
        onChange={(code) => {
          body.setBody(code);
          if (code.length > 0) {
            document.getElementById("paste-url")!.innerHTML = "";
          }
        }}
        isDarkTheme={isDarkTheme}
        language={syntax.isHighlighted ? syntax.syntax : "text"}
      />
    </div>
  );
}
