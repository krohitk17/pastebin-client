import React from "react";

import { LoadingContext } from "../Contexts/LoadingContext";
import { useParams } from "react-router-dom";
import getHandler, { GetResponse } from "../Routes/getRoute";
import NotFound from "./NotFound";

const Paste = () => {
  const url = useParams().url!;

  const [paste, setPaste] = React.useState<GetResponse>({
    status: 0,
    data: {
      body: "",
    },
  });
  const isLoading = React.useContext(LoadingContext);

  React.useEffect(() => {
    const fetchData = async () => {
      isLoading.setIsLoading(true);
      const res = await getHandler({ url: url, password: ""  });
      console.log(res);
      setPaste(res);
      isLoading.setIsLoading(false);
    };
    fetchData();
  }, [url]);

  if (paste.status === 200) {
    return (
      <div>
        <h1>{paste.data.body}</h1>
      </div>
    );
  } else if (paste.status === 404) {
    return <NotFound />;
  } else if (paste.status === 401) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Paste;
