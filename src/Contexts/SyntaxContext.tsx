import { createContext, useState } from "react";

export const syntaxContext = createContext({
  syntax: "",
  setSyntax: (syntax: string) => {},
  isHighlighted: false,
  setisHighlighted: (isHighlighted: boolean) => {},
});

export function SyntaxContextProvider({ children }: { children: any }) {
  const [syntax, setSyntax] = useState("text");
  const [isHighlighted, setisHighlighted] = useState(false);
  const context = {
    syntax: syntax,
    setSyntax: setSyntax,
    isHighlighted: isHighlighted,
    setisHighlighted: setisHighlighted,
  };

  return (
    <syntaxContext.Provider value={context}>{children}</syntaxContext.Provider>
  );
}
