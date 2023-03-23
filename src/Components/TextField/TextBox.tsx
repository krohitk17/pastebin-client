import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";

import "prismjs/themes/prism-tomorrow.css";
import "./TextBox.css";

const TextBox = ({
  className = "",
  value,
  onChange,
  isDarkTheme = false,
  language,
  disabled = false,
}: {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  isDarkTheme?: boolean;
  language: string;
  disabled?: boolean;
}) => {
  const hightlightWithLineNumbers = (input: string, language: string) =>
    highlight(input, languages[language], language)
      .split("\n")
      .map(
        (line, i) =>
          `<span class='w-[30px] text-line-number left-0 text-right absolute'>${
            i + 1
          }</span>${line}`
      )
      .join("\n");

  return (
    <div className="max-h-[800px] overflow-scroll outline outline-1">
      <Editor
        className={"editor focus: outline-none" + className}
        value={value}
        onValueChange={(code) => onChange(code)}
        placeholder="Paste your code here..."
        highlight={(code) => hightlightWithLineNumbers(code, language)}
        disabled={disabled}
        textareaClassName="focus outline-none"
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          minHeight: "400px",
          backgroundColor: isDarkTheme ? "#1e1e1e" : "white",
          color: isDarkTheme ? "white" : "black",
        }}
      />
    </div>
  );
};

export default TextBox;
