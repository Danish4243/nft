// import Alert from "@material-ui/lab/Alert";
import React from "react";
import { useSelector } from "react-redux";

export const Message = () => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  return (
    <>
      {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
    </>
  );
};
