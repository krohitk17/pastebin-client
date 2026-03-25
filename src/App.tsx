import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeScreen from "./Pages/Home/HomeScreen";
import PasteScreen from "./Pages/Paste/PasteScreen";
import NotFound from "./Pages/Paste/NotFound";
import UpdatePaste from "./Pages/Paste/UpdatePaste";
import { PasswordContextProvider } from "./Contexts/PasswordContext";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/:url" element={<UpdatePaste />} />
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
