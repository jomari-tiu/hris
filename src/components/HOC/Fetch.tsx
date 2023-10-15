import React from "react";

function Fetch(OriginalComponent: any) {
  const NewComponent = () => {
    const message = "this message from HOC";
    console.log(message);
    return <OriginalComponent message={message} />;
  };
  return NewComponent;
}

export default Fetch;
