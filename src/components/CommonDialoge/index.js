import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalVisible } from "../../redux/actions";
import CloseIcon from "@mui/icons-material/Close";
import { Modules } from "../../constants/Modules";
import { ConfirmSale } from "../../features/modals";

const CommonDialoge = (props) => {
  const dispatch = useDispatch();

  const isDialogeOpen = useSelector((state) => state.authReducer.isDialogeOpen);
  const dialogType = useSelector((state) => state.authReducer.modalCategory);

  const modalType = () => {
    switch (dialogType) {
      case Modules.CONFIRM_SALE:
        return <ConfirmSale />;

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isDialogeOpen}
      className="main_dialog"
      maxWidth="xl"
      // onClose={() => dispatch(modalVisible.modalClose())}
      disableEnforceFocus
    >
      {modalType()}
    </Dialog>
  );
};

export default CommonDialoge;
