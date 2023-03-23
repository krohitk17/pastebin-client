import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import getHandler, { GetResponse } from "../../Routes/getRoute";
import LoadingScreen from "../../Components/Loading";
import NotFound from "./NotFound";
import PasteArea from "./PasteArea";
import Unauthorized from "./Unauthorized";
import { passwordContext } from "../../Contexts/PasswordContext";

export default function PasteScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const url = useParams().url!;
  const password = useContext(passwordContext);

  const [pasteData, setPasteData] = useState<GetResponse>({
    status: 0,
    data: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getHandler({ url: url, password: password.password });
      console.log(res);
      setPasteData(res);
      setIsLoading(false);
    };
    fetchData();
  }, [password.password, url]);

  const PasteComponent = () => {
    if (pasteData.status === 200) {
      return <PasteArea data={pasteData.data} />;
    } else if (pasteData.status === 401) {
      password.isWrong = password.password === "" ? false : true;
      return <Unauthorized />;
    } else if (pasteData.status === 404) {
      return <NotFound />;
    } else {
      return <h1>Server is down, please try again later.</h1>;
    }
  };

  return (
    <LoadingScreen isLoading={isLoading}>
      <PasteComponent />
    </LoadingScreen>
  );
}
