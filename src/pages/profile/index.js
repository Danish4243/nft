import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCookie } from "cookies-next";
import MuiPhoneNumber from "material-ui-phone-number";
import VerifiedIcon from "@mui/icons-material/Verified";
import { imageUpload, tempData, updateProfile } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { isString } from "../../utils/validations";
import { Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { LoadingButton } from "@mui/lab";

const Profile = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const infuraProjectId = "34dea4d9f7fd4d338cd362c23797534b";
  const temporaryData = useSelector((state) => state.authReducer.tempData);
  const walletAddress = useSelector((state) => state.authReducer.walletAddress);

  const [toolTipMessage, setToolTipMessage] = useState("Copy wallet address.");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [dob, setDob] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = getCookie("userData");
    if (data) {
      setUserData(JSON.parse(data));
      setCountryName(JSON.parse(data).countryName);
      setPhoneCode(JSON.parse(data).countryCode);
      setPhone(`${JSON.parse(data).countryCode} ${JSON.parse(data).phone}`);
      setImage(JSON.parse(data).image);
      setDob(JSON.parse(data).dob);
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const img = temporaryData?.uploadedImage?.image;
    if (img) {
      setImage(img);
    }
  }, [temporaryData]);

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch(imageUpload.request(formData));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userData?.email || "",
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(25)
        .required("Email is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is Required"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      let body = {
        email: formik.values.email,
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        phone,
        dob: dob ? dayjs(dob).format("MM-DD-YYYY") : "",
      };
      if (image?.length) {
        body["image"] = image;
      }
      dispatch(updateProfile.request(body));
      setTimeout(() => {
        formik.setSubmitting(false);
      }, 3000);
    },
  });

  const handlePhoneChange = (rawValue, countryData) => {
    setCountryName(countryData?.countryCode);
    setPhone(rawValue.split(`+${phoneCode}`).join(""));
    setPhoneCode(countryData?.dialCode);
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(walletAddress);
    setToolTipMessage("Copied to clipboard.");
    setTimeout(() => {
      setToolTipMessage("Copy wallet address.");
    }, 2000);
  };

  return (
    <Box className="conta_iner">
      <form onSubmit={formik.handleSubmit}>
        <Box className="profile_wrp">
          <Box className="d_sub">
            <figure className="logo">
              <img
                onClick={() => router.push("/")}
                src="/static/images/apptunix.png"
                alt="apptunix"
              />
            </figure>
            <h2>Edit Profile</h2>
          </Box>

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
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {walletAddress && (
                  <>
                    <Tooltip title={toolTipMessage}>
                      <ContentCopyIcon
                        onClick={copyToClipBoard}
                        sx={{ color: "#fff", mr: 1, cursor: "pointer" }}
                      />
                    </Tooltip>
                    <Typography color={"#fff"}>{walletAddress}</Typography>
                  </>
                )}
              </Box>

              <Box className="btm">
                <LoadingButton
                  type="submit"
                  loading={formik.isSubmitting}
                  disabled={formik.isSubmitting}
                  className="btn-log"
                >
                  Save
                </LoadingButton>
              </Box>
            </Box>

            <Box className="right">
              <ul className="profile_outr">
                <li>
                  <label>First Name</label>
                  <Box className="input-group">
                    <TextField
                      placeholder="Your First Name"
                      type="text"
                      error={Boolean(
                        formik.touched.firstName && formik.errors.firstName
                      )}
                      fullWidth
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
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
                </li>
                <li>
                  <label>Last Name</label>
                  <Box className="input-group">
                    <TextField
                      placeholder="Your Last Name"
                      type="text"
                      error={Boolean(
                        formik.touched.lastName && formik.errors.lastName
                      )}
                      fullWidth
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
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
                </li>
                <li>
                  <label>Phone Number</label>
                  <Box className="input-group vrfy-ico">
                    <MuiPhoneNumber
                      name="phone"
                      defaultCountry={countryName || "in"}
                      value={phone || ""}
                      autoFormat={false}
                      dropdownClass="drop_down"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              // onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              <VerifiedIcon color="#fff" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={handlePhoneChange}
                    />
                  </Box>
                </li>
                <li>
                  <label> Email Address</label>
                  <Box className="input-group">
                    <TextField
                      placeholder="Your Email Address"
                      type="email"
                      error={Boolean(
                        formik.touched.email && formik.errors.email
                      )}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      margin="none"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email || ""}
                      variant="standard"
                    />
                  </Box>
                </li>
                <li>
                  <label>Date of birth</label>
                  <Box className="input-group vrfy-ico">
                    <Box className="datepicker">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={dob || null}
                          onChange={(date) => {
                            setDob(date);
                          }}
                          className="date_picker"
                          disableFuture
                          maxDate={new Date()}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              variant="standard"
                              inputProps={{
                                ...params.inputProps,
                                placeholder: "Date of Birth",
                                readOnly: true,
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Profile;
