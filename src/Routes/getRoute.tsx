import axios, { AxiosError, AxiosResponse } from "axios";

interface GetData {
  url: string;
  password: string;
}

export interface GetResponse {
  status: number;
  data: {};
}

const getHandler = async (getData: GetData): Promise<GetResponse> => {
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
