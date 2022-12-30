import { Box, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import LoginArt from "../../features/login/LoginArt";
import { changePassword } from "../../redux/actions";
import { getCookie } from "cookies-next";

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const token = getCookie("token");

  useEffect(() => {
    if (router.isReady) {
      if (!token) {
        router.back();
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().max(15).required("Password is requird"),
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
        oldPassword: formik.values.password,
        password: formik.values.newPassword,
      };
      console.log(body);
      dispatch(changePassword.request(body));

      formik.setSubmitting(false);
    },
  });

  return (
    <Box className="conta_iner">
      <figure className="logo">
        <img
          onClick={() => router.replace("/")}
          src="/static/images/apptunix.png"
          alt="apptunix"
        />
      </figure>
      <Box className="fdx">
        <Box className="wrp_left">
          <h3>
            Change Password ?<span>Please Change Your Password. </span>
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <Box className="input-group">
              <TextField
                className="line_form"
                placeholder="**************"
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Current Password"
                margin="none"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={"password"}
                value={formik.values.password}
                variant="standard"
              />
            </Box>
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
                type={"password"}
                value={formik.values.newPassword}
                variant="standard"
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
                label=" Confirm Password"
                margin="none"
                name="passwordConfirmation"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={"password"}
                value={formik.values.passwordConfirmation}
                variant="standard"
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
export default ChangePassword;
