import { CircularProgress, Box, Modal } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

export const Loader = (props) => {
  const isLoadingNft = useSelector((state) => state.nftReducer.isLoading);
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  return (
    <Box>
      {isLoadingNft || isLoading || props.isLoad ? (
        <Modal open>
          <CircularProgress className="loader_loading" color="secondary" />
        </Modal>
      ) : (
        ""
      )}
    </Box>
  );
};
