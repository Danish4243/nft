import React, { useEffect, useState } from "react";
import { Box, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { forgotPassword, tempData } from "../../redux/actions";
import LoginArt from "../../features/login/LoginArt";
import ForgetOtpPopUp from "../../features/forgetpassword/ForgetOtpPopUp";
import { deleteCookie } from "cookies-next";

const Forget = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [key, setKey] = useState("");
  const [error, setError] = useState(false);

  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const data = useSelector((state) => state.authReducer.tempData);

  useEffect(() => {
    if (data?.token) {
      deleteCookie("token");
      deleteCookie("userData");
      router.push("/resetpassword");
    }
  }, [data]);

  const onSubmit = () => {
    setError(true);
    if (key.length != 0) {
      dispatch(forgotPassword.request({ key: key }));
      dispatch(tempData.updateTempData({ key: key }));
      setError(false);
    }
  };

  return (
    <Box className="forgot_wrap bg_img">
      <Box className="conta_iner">
        <ForgetOtpPopUp />
        <figure className="logo">
          <img
            onClick={() => router.back()}
            src="/static/images/apptunix.png"
            alt="apptunix"
          />
        </figure>
        <Box className="fdx">
          <Box className="wrp_left">
            <h3>
              Forgot Password ?
              <span>Please Enter Email or Phone Number to Continue.</span>
            </h3>
            <Box className="input-group">
              <TextField
                type="email"
                className="line_form"
                placeholder="Email or Phone Number"
                fullWidth
                label="Email or Phone Number"
                margin="none"
                name="email"
                error={Boolean(error && !key.length)}
                helperText={
                  error && !key.length ? "This field is required" : ""
                }
                value={key}
                onChange={(val) => setKey(val.target.value)}
                variant="standard"
              />
            </Box>
            <Box className="btm">
              <LoadingButton
                onClick={onSubmit}
                loading={isLoading}
                variant="contained"
                className="btn-log"
              >
                Verify
              </LoadingButton>
            </Box>
          </Box>
          <Box className="wrp_right">
            <LoginArt />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Forget;
