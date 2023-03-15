import React from "react";
import { Select, Input } from "@chakra-ui/react";
import FormItem from "./FormItem";
import { SubmitButton } from "./SubmitButton";
import { PasteFormContext } from "../../Contexts/PasteFormContext";

function PasteForm() {
  const options = React.useContext(PasteFormContext);

  return (
    <div className="pt-4">
      <h1 className="pb-1 border-black border-b-2">Optional Paste Settings</h1>
      <div className="flex flex-col pt-3">
        <FormItem label="Syntax Highlighting">
          <Select
            defaultValue={options.syntax}
            onChange={(e) => options.setSyntax(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="javascript">JavaScript</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormItem>

        <FormItem label="Burn On Read">
          <Select
            defaultValue={options.burnOnRead.toString()}
            onChange={(e) => options.setBurn(e.target.value === "true")}
          >
            <option value="false">false</option>
            <option value="true">true</option>
          </Select>
        </FormItem>

        <FormItem label="Password">
          <Input
            placeholder="Enter password"
            type="password"
            onChange={(e) => options.setPassword(e.target.value)}
          />
        </FormItem>

        <FormItem label="Paste Name/ Title">
          <Input
            placeholder="Basic usage"
            onChange={(e) => options.setTitle(e.target.value)}
          />
        </FormItem>

        <SubmitButton />
      </div>
    </div>
  );
}

export default PasteForm;
