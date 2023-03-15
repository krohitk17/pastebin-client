import axios from "axios";

const checkHandler = async (): Promise<boolean> => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const isRunning = await axios
    .request({
      method: "GET",
      url: baseUrl,
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
  return isRunning;
};

export default checkHandler;
