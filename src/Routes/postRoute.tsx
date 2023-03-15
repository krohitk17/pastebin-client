import axios from "axios";

interface PasteData {
  title: string;
  body: string;
  syntax: string;
  burnOnRead: boolean;
  password: string;
}

const postHandler = async (pasteData: PasteData) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const res = await axios
    .post(baseUrl + "/save", pasteData)
    .then((res) => {
      console.log("Paste Created");
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

  return res;
};

export default postHandler;
