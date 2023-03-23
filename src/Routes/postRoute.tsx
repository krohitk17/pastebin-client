import axios from "axios";

interface PasteData {
  title: string;
  body: string;
  syntax: string;
  password: string;
  expiresAt: string;
}

const postHandler = async (pasteData: PasteData) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const res = await axios.post(baseUrl + "/save", pasteData).catch((err) => {
    return err.response;
  });

  return res;
};

export default postHandler;
