import React from "react";

import TextArea from "../Components/PasteField/TextArea";
import PasteForm from "../Components/Form/PasteForm";
import { BodyContextProvider } from "../Contexts/BodyContext";
import { PasteFormContextProvider } from "../Contexts/PasteFormContext";

const Home = () => {
  return (
    <BodyContextProvider>
      <PasteFormContextProvider>
        <div className="container mx-auto">
          <TextArea />
          <PasteForm />
        </div>
      </PasteFormContextProvider>
    </BodyContextProvider>
  );
};

export default Home;
