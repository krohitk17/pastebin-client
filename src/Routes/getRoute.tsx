import axios, { AxiosError, AxiosResponse } from "axios";

interface GetData {
  url: string;
  password: string;
}
const getHandler = async (getData: GetData) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const res = await axios
    .get(baseUrl + "/get", {
      params: getData,
    })
    .catch((err: AxiosError): AxiosResponse<unknown, any> => {
      return err.response!;
    });

  return {
    status: res.status,
    data: res.data,
  };
};

export default getHandler;
