import React from "react";

export const BodyContext = React.createContext({ 
  body: "",
  setBody: (body: string) => {},
});

export function BodyContextProvider({ children }: { children: any}) {
  const [body, setBody] = React.useState("");

  const context = {
    body: body,
    setBody: setBody,
  };

  return (
    <BodyContext.Provider value={context}>
      {children}
    </BodyContext.Provider>
  );
}
