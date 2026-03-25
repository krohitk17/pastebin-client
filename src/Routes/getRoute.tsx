import axios, { AxiosError, AxiosResponse } from "axios";

interface GetData {
  url: string;
  password: string;
}
const getHandler = async (getData: GetData) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "";
  const res = await axios.post(baseUrl + "/paste", getData).catch((err: AxiosError) => {
    return (
      err.response ||
      ({
        status: 500,
        data: { message: "Unable to reach server" },
      } as AxiosResponse<unknown, any>)
    );
  });

  return {
    status: res.status,
    data: res.data,
  };
};

export default getHandler;
