import { Modal, Box } from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../redux/actions";
import OtpVerify from "../../features/login/OTP";

const OtpPopUp = () => {
  const dispatch = useDispatch();
  const isOtpPopUpVisible = useSelector(
    (state) => state.authReducer.isOtpPopUpVisible
  );

  return (
    <Modal
      open={isOtpPopUpVisible} // condition
      onClose={() => dispatch(sendOtp.isOpen(false))}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableBackdropClick={true}
    >
      <Box sx={{ background: "transparent" }}>
        <OtpVerify phone={"abc"} phoneCode={"abc"} />
      </Box>
    </Modal>
  );
};

export default memo(OtpPopUp);
