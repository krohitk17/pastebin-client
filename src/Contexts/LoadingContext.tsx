import React from "react";

export const LoadingContext = React.createContext({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => {},
});

export function LoadingContextProvider({ children }: { children: any}) {
  const [isLoading, setLoading] = React.useState(true);

  const context = {
    isLoading: isLoading,
    setIsLoading: setLoading,
  };

  return (
    <LoadingContext.Provider value={context}>
      {children}
    </LoadingContext.Provider>
  );
}
