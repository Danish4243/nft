import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import MuiPhoneNumber from "material-ui-phone-number";
import { toast } from "react-toastify";
import { imageUpload, sendOtp, user } from "../../redux/actions";
import LoginArt from "../../features/login/LoginArt";
import OtpPopUp from "../../features/login/OtpPopUp";
import { isString } from "../../utils/validations";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const SignUp = ({ nft, marketplace, account }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [countryName, setCountryName] = useState("in");
  const [dob, setDob] = useState(null);
  const [error, setError] = useState(false);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const tempData = useSelector((state) => state.authReducer.tempData);
  const isAuthorised = useSelector((state) => state.authReducer.isAuthorised);
  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch(imageUpload.request(formData));
  };

  useEffect(() => {
    const img = tempData?.uploadedImage?.image;
    if (img) {
      setImage(img);
    }
  }, [tempData]);

  useEffect(() => {
    if (isAuthorised) {
      router.push("/");
    }
  }, [isAuthorised]);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(25)
        .required("Email is required"),
      firstName: Yup.string().max(15).required("First Name is required"),
      lastName: Yup.string().max(15).required("Last Name is required"),
      password: Yup.string()
        .max(15)
        .required("Password is requird")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is requird"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      if (phone.length) {
        setError(false);
      }
      if (phone?.length < 10) {
        toast.error("Phone number should not less than 10 digits.");
        return;
      }
      let body = {
        email: formik.values.email,
        phone: phone.split(`+${phoneCode}`).join(""),
        countryCode: phoneCode,
        phoneCode: "",
        password: formik.values.password,
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        dob: dob ? dayjs(dob).format("MM-DD-YYYY") : "",
        image,
        countryName,
        walletAddress: account ? account : "",
      };
      handleOtp();
      dispatch(user.updateUserData(body));
      formik.setSubmitting(false);
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePhoneChange = (rawValue, countryData) => {
    setCountryName(countryData?.countryCode);
    setPhone(rawValue.split(`+${phoneCode}`).join(""));
    setPhoneCode(countryData?.dialCode);
  };

  const handleOtp = async () => {
    let body = {
      key: phone,
      countryCode: phoneCode,
    };
    dispatch(sendOtp.request(body));
  };

  return (
    <Box className="conta_iner signup_wrp">
      <OtpPopUp />
      <figure className="logo">
        <img
          onClick={() => router.replace("/")}
          src="/static/images/apptunix.png"
          alt="apptunix"
        />
      </figure>
      <Box className="fdx">
        <Box className="wrp_left ">
          <h3>
            Sign up
            <span>Enter To Continue And Explore Within Your Grasp. </span>
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <Box className="fdx">
              <Box className="lft">
                <Box className="upload">
                  <Box className="img_upload" sx={{ mt: 2 }}>
                    <img src={image || "/static/images/dummy.png"} alt="" />
                    <label htmlFor="icon-button-file">
                      <TextField
                        inputProps={{
                          accept: "image/jpeg, image/jpg, image/png",
                        }}
                        id="icon-button-file"
                        type="file"
                        sx={{ display: "none" }}
                        onChange={(val) => {
                          const files = val.target;
                          const file = files.files[0];
                          uploadImage(file);
                        }}
                      />
                      <EditIcon />
                    </label>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="input-group">
              <TextField
                type="text"
                className="line_form"
                placeholder="First Name"
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                margin="none"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={(val) => {
                  if (isString(val.target.value)) {
                    formik.handleChange(val);
                  }
                }}
                value={formik.values.firstName}
                variant="standard"
              />
            </Box>
            <Box className="input-group">
              <TextField
                type="lastName"
                className="line_form"
                placeholder="Last Name"
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                margin="none"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={(val) => {
                  if (isString(val.target.value)) {
                    formik.handleChange(val);
                  }
                }}
                value={formik.values.lastName}
                variant="standard"
              />
            </Box>
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
            <Box className="input-group c_pikr">
              <MuiPhoneNumber
                className="line_form ph_input  "
                name="phone"
                label="Phone Number"
                dropdownClass="drop_down"
                defaultCountry={countryName}
                value={phone}
                error={Boolean(error && !phone.length)}
                helperText={
                  error && !phone.length ? "Phone number is required" : ""
                }
                autoFormat={false}
                onChange={handlePhoneChange}
              />
            </Box>
            <Box className="input-group">
              <TextField
                className="line_form"
                placeholder="**********"
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="none"
                name="password"
                onBlur={formik.handleBlur}
                onChange={(val) => {
                  if (
                    val.target.value[val.target.value.length - 1] != " " ||
                    val.target.value == ""
                  ) {
                    formik.handleChange(val);
                  }
                }}
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
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box className="input-group">
              <TextField
                className="line_form"
                placeholder="**********"
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
            <Box className="input-group vrfy-ico">
              <Box className="datepicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="line_form"
                    value={dob}
                    onChange={(date) => {
                      setDob(date);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "Date of Birth",
                          readOnly: true,
                        }}
                        fullWidth
                        variant="standard"
                      />
                    )}
                    disableFuture
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box className="btm">
              <LoadingButton
                type="submit"
                disabled={formik.isSubmitting || isLoading}
                variant="contained"
                className="btn-log"
                onClick={() => setError(true)}
              >
                SignUp
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
              Already have an account ?
              <Button variant="text" onClick={() => router.back()}>
                <Typography>Sign In</Typography>
              </Button>
              {/* <Typography
                onClick={() => props.setLoginActive("changePassword")}
              >
                Change Password
              </Typography> */}
            </p>
          </Box>
        </Box>
        <LoginArt />
      </Box>
    </Box>
  );
};
export default SignUp;
