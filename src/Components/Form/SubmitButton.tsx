import React from "react";
import { Button } from "@chakra-ui/react";
import { BodyContext } from "../../Contexts/BodyContext";
import { PasteFormContext } from "../../Contexts/PasteFormContext";
import postHandler from "../../Routes/postRoute";

export const SubmitButton = () => {
  const body = React.useContext(BodyContext);
  const options = React.useContext(PasteFormContext);

  const SubmitButtonHandler = async () => {
    const url = await postHandler({
      body: body!.body,
      ...options,
    });
    document.getElementById("paste-url")!.innerHTML =
      "Paste Created: " + url.data.url;
  };

  return (
    <div className="w-[20em] py-8">
      <Button colorScheme="blue" variant="solid" onClick={SubmitButtonHandler}>
        Create New Paste
      </Button>
      <div id="paste-url"></div>
    </div>
  );
};
