import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import TextArea from "./Components/PasteField/TextArea";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
        <TextArea />
      </div>
    </ChakraProvider>
  );
}

export default App;
