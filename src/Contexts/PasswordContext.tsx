import { createContext, useState } from "react";

export const passwordContext = createContext({
  password: "",
  isWrong: false,
  setIsWrong: (isWrong: boolean) => {},
  setPassword: (password: string) => {},
});

export function PasswordContextProvider({ children }: { children: any }) {
  const [password, setPassword] = useState<string>("");
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const context = {
    password: password,
    isWrong,
    setIsWrong,
    setPassword: setPassword,
  };

  return (
    <passwordContext.Provider value={context}>
      {children}
    </passwordContext.Provider>
  );
}
