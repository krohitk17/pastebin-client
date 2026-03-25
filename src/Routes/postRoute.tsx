import axios from "axios";

interface PasteData {
  title: string;
  body: string;
  syntax: string;
  password: string;
  expiresAt: string;
}

const postHandler = async (pasteData: PasteData) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "";
  const accessToken = localStorage.getItem("accessToken");
  const res = await axios
    .post(baseUrl + "/paste/create", pasteData, {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    })
    .catch((err) => {
      return err.response;
    });

  return res;
};

export default postHandler;
