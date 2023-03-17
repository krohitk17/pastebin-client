import { createContext, useState } from "react";

export const passwordContext = createContext({
  password: "",
  isWrong: false,
  setPassword: (password: string) => {},
});

export function PasswordContextProvider({ children }: { children: any }) {
  const [password, setPassword] = useState<string>("");
  const context = {
    password: password,
    isWrong: false,
    setPassword: setPassword,
  };

  return (
    <passwordContext.Provider value={context}>
      {children}
    </passwordContext.Provider>
  );
}
