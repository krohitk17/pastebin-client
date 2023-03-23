import axios from "axios";

const checkHandler = (): Promise<boolean> => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL!;
  const isRunning = axios
    .get(baseUrl)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return false;
    });
  return isRunning;
};

export default checkHandler;
