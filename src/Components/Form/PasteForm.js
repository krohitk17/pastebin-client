import React from "react";
import { Select, Input, Button } from "@chakra-ui/react";
import FormItem from "./FormItem";

function PasteForm() {
  return (
    <>
      <div className="pt-4">
        <p className="pb-1 border-black border-b-2">Optional Paste Settings</p>
        <div className="flex flex-col pt-3">
          <FormItem label="Category">
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormItem>
          <FormItem label="Tags">
            <Input placeholder="Basic usage" />
          </FormItem>
          <FormItem label="Syntax Highlighting">
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormItem>
          <FormItem label="Paste Expiration">
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormItem>
          <FormItem label="Paste Exposure">
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormItem>
          <FormItem label="Folder">
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormItem>
          <FormItem label="Password">
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormItem>
          <FormItem label="Paste Name/ Title">
            <Input placeholder="Basic usage" />
          </FormItem>
          <div className="w-[20em] py-8">
            <Button colorScheme="blue" variant="solid">
              Create New Paste
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasteForm;
