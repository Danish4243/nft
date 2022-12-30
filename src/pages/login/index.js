import {
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Modal,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions";
import { LoadingButton } from "@mui/lab";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import LoginArt from "../../features/login/LoginArt";
import * as Yup from "yup";

const Login = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isAuthorised = useSelector((state) => state.authReducer.isAuthorised);

  useEffect(() => {
    if (isAuthorised) {
      router.push("/");
    }
  }, [isAuthorised]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(25)
        .required("Email is required"),
      password: Yup.string().max(15).required("Password is requird"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      let body = {
        email: formik.values.email,
        password: formik.values.password,
        role: "user",
      };
      console.log(body);
      dispatch(login.request(body));
      formik.setSubmitting(false);
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
            Log in
            <span>Enter To Continue And Explore Within Your Grasp. </span>
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <Box className="input-group">
              <TextField
                type="email"
                className="line_form"
                placeholder="Youraddres@email.com"
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                margin="none"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                variant="standard"
              />
            </Box>

            <Box className="input-group">
              <TextField
                className="line_form"
                placeholder="Enter your password"
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="none"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Typography
              onClick={() => router.push("/forget")}
              style={{
                color: "white",
                cursor: "pointer",
                marginLeft: "auto",
                opacity: 0.4,
              }}
            >
              Forgot Password ?
            </Typography>
            <Box className="btm">
              <LoadingButton
                type="submit"
                disabled={formik.isSubmitting || isLoading}
                variant="contained"
                className="btn-log"
              >
                Login to Continue
              </LoadingButton>
              <p>Or social login</p>
            </Box>
          </form>
          <Box className="social">
            <ul className="fdx">
              <li>
                <a href="https://www.facebook.com/">
                  <img src="/static/images/facebook.svg" alt="facebook" />
                </a>
              </li>
              <li>
                <a href="https://www.icloud.com/">
                  <img src="/static/images/apple.svg" alt="apple" />
                </a>
              </li>
              <li>
                <a href="https://www.google.com/">
                  <img src="/static/images/google.svg" alt="google" />
                </a>
              </li>
            </ul>

            <p>
              Don't have an account ?
              <Button variant="text" onClick={() => router.push("/signup")}>
                <Typography>Sign up</Typography>
              </Button>
            </p>
          </Box>
        </Box>
        <LoginArt />
      </Box>
    </Box>
  );
};

export default Login;
