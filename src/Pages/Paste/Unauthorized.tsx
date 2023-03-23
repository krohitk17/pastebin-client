import { useContext, useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";

import { passwordContext } from "../../Contexts/PasswordContext";
import SubmitButton from "../../Components/Button";

export default function Unauthorized() {
  const [localPassword, setLocalPassword] = useState<string>("");
  const password = useContext(passwordContext);

  useEffect(() => {
    if (password.isWrong) {
      document.getElementById("password-error")!.innerHTML =
        "Wrong password, please try again.";
    } else {
      document.getElementById("password-error")!.innerHTML = "";
    }
  }, [password.isWrong]);

  const submitPasswordHandler = (pass: string) => {
    password.setPassword(pass);
    console.log(pass);
  };

  return (
    <div className="flex flex-col justify-center">
      <p className="my-5">The paste is password protected.</p>
      <Input
        placeholder="Enter password"
        onChange={(e) => setLocalPassword(e.target.value)}
      />
      <SubmitButton
        className="my-1"
        onClick={() => {
          submitPasswordHandler(localPassword);
        }}
      >
        Submit
      </SubmitButton>
      <p id="password-error" className="my-5 text-red-600"></p>
    </div>
  );
}
