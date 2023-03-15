import axios from "axios";

interface GetData {
  url: string;
  password: string;
}

export interface GetResponse {
  status: number;
  data: {
    body: string;
  };
}

const getHandler = async (getData: GetData): Promise<GetResponse> => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const res = await axios
    .get(baseUrl + "/get", {
      params: getData,
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

  return {
    status: res.status,
    data: res.data,
  };
};

export default getHandler;
