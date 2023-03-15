import { createContext, useState } from "react";

export const PasteFormContext = createContext({
  syntax: "",
  setSyntax: (syntax: string) => {},
  burnOnRead: false,
  setBurn: (burnOnRead: boolean) => {},
  password: "",
  setPassword: (password: string) => {},
  title: "",
  setTitle: (title: string) => {},
});

export function PasteFormContextProvider({ children }: { children: any}) {
  const [syntax, setSyntax] = useState("text");
  const [burnOnRead, setBurn] = useState(false);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");

  const context = {
    syntax: syntax,
    setSyntax: setSyntax,
    burnOnRead: burnOnRead,
    setBurn: setBurn,
    password: password,
    setPassword: setPassword,
    title: title,
    setTitle: setTitle,
  };

  return (
    <PasteFormContext.Provider value={context}>
      {children}
    </PasteFormContext.Provider>
  );
}
