import React from "react";

import ReactLoading from "react-loading";
import { LoadingContext } from "../Contexts/LoadingContext";

const Loading = (props: any) => {
  const isLoading = React.useContext(LoadingContext);

  if (isLoading.isLoading) {
    return (
      <div>
        <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
      </div>
    );
  } else {
    return <div className={props.className}>{props.children}</div>;
  }
};

export default Loading;
