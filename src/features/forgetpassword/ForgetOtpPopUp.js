import { Modal, Box } from "@mui/material";
import { fontGrid } from "@mui/material/styles/cssUtils";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotOtpVerify } from "../../redux/actions";
import ForgetOtpVerify from "./VerifyOtp";

const ForgetOtpPopUp = () => {
  const dispatch = useDispatch();
  const isForgetOtpPopUpVisible = useSelector(
    (state) => state.authReducer.isForgetOtpPopUpVisible
  );

  return (
    <Modal
      open={isForgetOtpPopUpVisible} // condition
      onClose={() => dispatch(forgotOtpVerify.isOpen(false))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableBackdropClick={true}
    >
      <Box sx={{ background: "transparent" }}>
        <ForgetOtpVerify phone={"abc"} phoneCode={"abc"} />
      </Box>
    </Modal>
  );
};

export default memo(ForgetOtpPopUp);
