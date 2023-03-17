import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeScreen from "./Pages/Home/HomeScreen";
import PasteScreen from "./Pages/Paste/PasteScreen";
import NotFound from "./Pages/Paste/NotFound";
import { PasswordContextProvider } from "./Contexts/PasswordContext";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route
              path="/:url"
              element={
                <PasswordContextProvider>
                  <PasteScreen />
                </PasswordContextProvider>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}
