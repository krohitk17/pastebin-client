import { useContext, useState } from "react";
import { Select, Input, Switch } from "@chakra-ui/react";

import FormItem from "../../Components/Form/FormItem";
import postHandler from "../../Routes/postRoute";
import { bodyContext } from "../../Contexts/BodyContext";
import { syntaxContext } from "../../Contexts/SyntaxContext";
import SubmitButton from "../../Components/Button";

function PasteForm() {
  const body = useContext(bodyContext).body;
  const syntax = useContext(syntaxContext);
  const [burnOnRead, setBurn] = useState(false);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [expiresAt, setExpiresAt] = useState("1d");

  const SubmitButtonHandler = async () => {
    const url = await postHandler({
      title: title,
      body: body,
      password: password,
      burnOnRead: burnOnRead,
      syntax: syntax.syntax,
      expiresAt: expiresAt,
    });
    window.location.href = url.data.url;
  };

  const burnSwitchHandler = () => {
    setBurn(!burnOnRead);
    if (burnOnRead === false) {
      setExpiresAt("1M");
      document.getElementById("expiry-select")!.style.display = "none";
    } else {
      document.getElementById("expiry-select")!.style.display = "flex";
    }
  };

  return (
    <div className="pt-4">
      <h1 className="pb-1 border-black border-b-2 font-bold">Paste Settings</h1>
      <div className="flex flex-col pt-3">
        <FormItem label="Syntax Highlighting">
          <Switch
            className="mx-2"
            defaultChecked={false}
            onChange={() => syntax.setisHighlighted(!syntax.isHighlighted)}
          />
        </FormItem>

        <FormItem label="Syntax">
          <Select
            defaultValue={syntax.syntax}
            onChange={(e) => syntax.setSyntax(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
          </Select>
        </FormItem>

        <FormItem label="Burn After Reading">
          <Switch
            className="mx-2"
            defaultChecked={false}
            onChange={burnSwitchHandler}
          />
        </FormItem>

        <FormItem label="Expires In" id="expiry-select">
          <Select
            defaultValue={"1h"}
            onChange={(e) => setExpiresAt(e.target.value)}
          >
            <option value="10m">10 Minutes</option>
            <option value="1h">1 Hour</option>
            <option value="6h">6 Hours</option>
            <option value="1d">1 Day</option>
            <option value="1w">1 Week</option>
            <option value="1M">1 Month</option>
          </Select>
        </FormItem>

        <FormItem label="Password">
          <Input
            placeholder="Enter password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>

        <FormItem label="Paste Name/ Title">
          <Input
            placeholder="Basic usage"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormItem>
        <SubmitButton
          className="w-[10em] py-5 my-5"
          onClick={SubmitButtonHandler}
        >
          Create New Paste
        </SubmitButton>
        <div className="w-[20em] py-8">
          <div id="paste-url"></div>
        </div>
      </div>
    </div>
  );
}

export default PasteForm;
