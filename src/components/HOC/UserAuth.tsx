import React from "react";

function UserAuth(OriginalComponent: any) {
  const NewComponent = () => {
    const message = "this message from HOC";
    return <OriginalComponent message={message} />;
  };
  return NewComponent;
}

export default UserAuth;
