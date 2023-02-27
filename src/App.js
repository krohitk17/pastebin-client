import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import TextArea from "./Components/PasteField/TextArea";
import { ChakraProvider } from "@chakra-ui/react";
import PasteForm from "./Components/Form/PasteForm";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
        <div className="container mx-auto">
          <TextArea />
          <PasteForm />
        </div>
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
