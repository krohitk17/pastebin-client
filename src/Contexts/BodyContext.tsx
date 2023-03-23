import { createContext, useState } from "react";

export const bodyContext = createContext({
  body: "",
  setBody: (body: string) => {},
});

export function BodyContextProvider({ children }: { children: any }) {
  const [body, setBody] = useState("");
  const context = {
    body: body,
    setBody: setBody,
  };

  return (
    <bodyContext.Provider value={context}>{children}</bodyContext.Provider>
  );
}
