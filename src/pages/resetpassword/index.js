import { Box, IconButton, InputAdornment, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import LoginArt from "../../features/login/LoginArt";
import { resetPassword } from "../../redux/actions";
import { getCookie } from "cookies-next";

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const tempData = useSelector((state) => state.authReducer.tempData);

  useEffect(() => {
    if (router.isReady) {
      if (!tempData) {
        router.back();
      }
    }
  }, [tempData]);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .max(15)
        .required("New Password Field is Requird")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm Password Field is Requird"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      let body = {
        password: formik.values.newPassword,
      };
      console.log(body);
      dispatch(resetPassword.request(body, tempData.token));
      formik.setSubmitting(false);
    },
  });

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box className="conta_iner reset_wrp ">
      <figure className="logo">
        <img
          onClick={() => router.push("/")}
          src="/static/images/apptunix.png"
          alt="apptunix"
        />
      </figure>
      <Box className="fdx">
        <Box className="wrp_left">
          <h3>
            New Password<span>Please Reset Your Password. </span>
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <Box className="input-group">
              <TextField
                className="line_form"
                placeholder="4464646464"
                error={Boolean(
                  formik.touched.newPassword && formik.errors.newPassword
                )}
                fullWidth
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
                label=" New Password"
                margin="none"
                name="newPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showNewPassword ? "text" : "password"}
                value={formik.values.newPassword}
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {!showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className="input-group">
              <TextField
                className="line_form"
                placeholder="************"
                error={Boolean(
                  formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation
                )}
                fullWidth
                helperText={
                  formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation
                }
                label=" Re Enter New Password"
                margin="none"
                name="passwordConfirmation"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showConfirmPassword ? "text" : "password"}
                value={formik.values.passwordConfirmation}
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {!showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box className="btm">
              <LoadingButton
                type="submit"
                disabled={formik.isSubmitting || isLoading}
                variant="contained"
                className="btn-log"
              >
                Update
              </LoadingButton>
            </Box>
          </form>
        </Box>
        <LoginArt />
      </Box>
    </Box>
  );
};
export default ResetPassword;
