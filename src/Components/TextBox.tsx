import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";

import "prismjs/themes/prism-coy.css";

import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";

export default function TextBox({
  value,
  onChange,
  isDarkTheme = false,
  language,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  isDarkTheme?: boolean;
  language: string;
  disabled?: boolean;
}) {
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
    <div className="overflow-scroll outline outline-1 max-h-[80vh] my-2">
      <Editor
        value={value}
        onValueChange={(code) => onChange(code)}
        placeholder="Paste your code here..."
        highlight={(code) => hightlightWithLineNumbers(code, language)}
        disabled={disabled}
        textareaClassName="focus outline-none !pl-[50px]"
        preClassName="!pl-[50px] "
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          minHeight: "40vh",
          color: isDarkTheme ? "#fff" : "#000",
          backgroundColor: isDarkTheme ? "#111" : "#fff",
        }}
      />
    </div>
  );
}
