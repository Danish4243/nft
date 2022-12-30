import { Box, Button, Select, Switch, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createCollection,
  getCategoryAction,
  imageUpload,
  tempData,
} from "../../redux/actions";
import { isString } from "../../utils/validations";
import * as Yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LoadingButton } from "@mui/lab";
import { Header, Loader } from "../../components";
import { useRouter } from "next/router";
import placeholder from "../../../public/static/images/placeholder.png";
import CollectionsIcon from "@mui/icons-material/Collections";

const blockChainTypes = [
  {
    name: "Ethereum",
    value: 1,
  },
];

const payToken = [
  {
    id: 1,
    token: "Eth",
    name: "Ethereum",
    image: "/static/images/ETH.svg",
  },
];

const CreateCollection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [explictAndSensitiveContent, setexplictAndSensitiveContent] =
    useState(false);
  const [selectedBlockChain, setselectedBlockChain] = useState(null);
  const [error, setError] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [earnings, setearnings] = useState([]);
  const [logoImage, setlogoImage] = useState("");
  const [featureImage, setfeatureImage] = useState("");
  const [bannerImage, setbannerImage] = useState("");
  const [imageType, setimageType] = useState("");
  const [paymentToken, setpaymentToken] = useState(null);

  const categoryArray = useSelector((state) => state.nftReducer.categoryData);

  const temporaryData = useSelector((state) => state.authReducer.tempData);

  useEffect(() => {
    const img = temporaryData?.uploadedImage?.image;
    if (img && imageType == "1") {
      setlogoImage(img);
    } else if (img && imageType == "2") {
      setfeatureImage(img);
    }
    if (img && imageType == "3") {
      setbannerImage(img);
    }
  }, [temporaryData]);

  useEffect(() => {
    dispatch(getCategoryAction.request());
    dispatch(tempData.updateTempData({ uploadedImage: "" }));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      description: "",
      supply: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(" Name is required"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);

      if (selectedBlockChain && logoImage) {
        setError(false);
      }

      if (selectedBlockChain && logoImage) {
      } else {
        return;
      }

      let body = {
        categoryId: selectedCategory?._id,
        name: formik.values.name,
        logoImage: logoImage,
        featuredImage: featureImage,
        bannerImage: bannerImage,
        description: formik.values.description,
        blockChain: selectedBlockChain?.name,
        paymentToken: paymentToken?.token,
        explictAndSensitiveContent: explictAndSensitiveContent,
        collectionUrl: formik.values.url,
      };
      // console.log(body);
      dispatch(createCollection.request(body));
      setTimeout(() => {
        formik.setSubmitting(false);
      }, 3000);
      router.push("/mycollection");
    },
  });

  const uploadImage = (val, id) => {
    const files = val.target;
    const file = files?.files[0];
    console.log(file, "file");
    if (id == "icon-button-file") {
      setimageType(1);
    } else if (id == "icon-button-file-feature") {
      setimageType(2);
    } else if (id == "icon-button-file-banner") {
      setimageType(3);
    }
    const formData = new FormData();
    formData.append("file", file);
    dispatch(imageUpload.request(formData));
    console.log(formData, file, "ff file");
  };

  const addMoreClick = () => {
    console.log(file, "file");

    setearnings([...earnings, { address: "", percent: "" }]);
  };

  const removeProp = (i) => {
    let newEarning = [...earnings];
    newEarning.splice(i, 1);
    setearnings(newEarning);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let data = [...earnings];
    data[index][name] = value;
    setearnings(data);
  };

  const clickPayToken = (item) => {
    if (paymentToken == item) {
      setpaymentToken(null);
    } else {
      setpaymentToken(item);
    }
  };

  return (
    <Box>
      <Header />
      <Loader />
      <Box className=" py-60">
        <Box className="conta_iner">
          <h2 className="">Create a Collection</h2>
          <Box>
            <small className="text-white mb-20">* Required fields</small>

            <form onSubmit={formik.handleSubmit} action="">
              <Box>
                {/* ----------- LOGO IMAGE ---------- */}
                <Box className="logo_Image mt-20 mb-30">
                  <Box className="sl_cntnt">
                    <h2>
                      Logo image *
                      <span>
                        This image will also be used for navigation. 350 x 350
                        recommended.
                      </span>
                    </h2>
                  </Box>
                  <Box className="imgUpld_wpr logo_wpr">
                    <label className="upload_lbl" htmlFor="icon-button-file">
                      <Box className="col_uplod">
                        {logoImage ? (
                          <img src={logoImage} alt="img" />
                        ) : (
                          <CollectionsIcon />
                        )}

                        <TextField
                          inputProps={{
                            accept: "image/jpeg, image/jpg, image/png",
                          }}
                          id="icon-button-file"
                          type="file"
                          sx={{ display: "none" }}
                          onChange={(val) => {
                            uploadImage(val, "icon-button-file");
                          }}
                          className="valid"
                        />
                      </Box>
                      <Box>
                        {error && !logoImage ? (
                          <span className="erroe_txt">
                            This field is required
                          </span>
                        ) : (
                          ""
                        )}
                      </Box>
                    </label>
                  </Box>
                </Box>

                {/* ----------- FEATURED IMAGE ---------- */}
                <Box className="feature_image  mb-30">
                  <Box className="sl_cntnt">
                    <h2>
                      Featured Image
                      <span>
                        This image will be used for featuring your collection on
                        the homepage, category pages, or other promotional areas
                        of OpenSea. 600 x 400 recommended.
                      </span>
                    </h2>
                  </Box>
                  <Box className="imgUpld_wpr fetur_wpr">
                    <label
                      className="upload_lbl"
                      htmlFor="icon-button-file-feature"
                    >
                      <Box className=" featuree_uplod col_uplod">
                        {featureImage ? (
                          <img src={featureImage} alt="" />
                        ) : (
                          <CollectionsIcon />
                        )}

                        <TextField
                          inputProps={{
                            accept: "image/jpeg, image/jpg, image/png",
                          }}
                          id="icon-button-file-feature"
                          type="file"
                          onChange={(val) => {
                            uploadImage(val, "icon-button-file-feature");
                          }}
                          className={featureImage ? "valid imgfile" : "valid"}
                        />
                      </Box>
                    </label>
                  </Box>
                </Box>

                {/* ----------- BANNER IMAGE ---------- */}
                <Box className="banner_image mb-30">
                  <Box className="sl_cntnt">
                    <h2>
                      Banner Image
                      <span>
                        This image will appear at the top of your collection
                        page. Avoid including too much text in this banner
                        image, as the dimensions change on different devices.
                        1400 x 350 recommended.
                      </span>
                    </h2>
                  </Box>
                  <Box className="imgUpld_wpr bnr_wpr">
                    <label
                      className="upload_lbl"
                      htmlFor="icon-button-file-banner"
                    >
                      <Box className="col_uplod">
                        {bannerImage ? (
                          <img src={bannerImage} alt="" />
                        ) : (
                          <CollectionsIcon />
                        )}

                        <TextField
                          inputProps={{
                            accept: "image/jpeg, image/jpg, image/png",
                          }}
                          id="icon-button-file-banner"
                          type="file"
                          sx={{ display: "none" }}
                          onChange={(val) => {
                            uploadImage(val, "icon-button-file-banner");
                          }}
                          className={bannerImage ? "imgfile valid" : "valid"}
                        />
                      </Box>
                    </label>
                  </Box>
                </Box>

                <Box className="input-group">
                  <label for="" className="text-white">
                    Name *
                  </label>
                  <TextField
                    type="text"
                    className=" form-control"
                    placeholder="Item name"
                    value={formik.values.name}
                    variant="standard"
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    fullWidth
                    margin="none"
                    name="name"
                    helperText={formik.touched.name && formik.errors.name}
                    onBlur={formik.handleBlur}
                    onChange={(val) => {
                      if (isString(val.target.value)) {
                        formik.handleChange(val);
                      }
                    }}
                  />
                </Box>

                <Box className="input-group">
                  <Box className="sl_cntnt">
                    <h2 for="">
                      URL{" "}
                      <span>
                        Customize your URL on OpenSea. Must only contain
                        lowercase letters, numbers, and hyphens.
                      </span>{" "}
                    </h2>
                  </Box>
                  <TextField
                    type="text"
                    id="outlined-textarea"
                    className="form-control"
                    placeholder="https://yousite/item/123"
                    value={formik.values.url}
                    variant="standard"
                    fullWidth
                    margin="none"
                    name="url"
                    onBlur={formik.handleBlur}
                    onChange={(val) => {
                      if (isString(val.target.value)) {
                        formik.handleChange(val);
                      }
                    }}
                  />
                </Box>

                <Box className="input-group">
                  <Box className="sl_cntnt">
                    <h2 for="">
                      Description{" "}
                      <span>
                        Markdown syntax is supported. 0 of 1000 characters used.
                      </span>
                    </h2>
                  </Box>
                  <TextField
                    type="text"
                    multiline
                    minRows={5}
                    maxRows={15}
                    className=" form-control "
                    placeholder="Provide a detailed description of your item."
                    value={formik.values.description}
                    variant="standard"
                    fullWidth
                    margin="none"
                    name="description"
                    onBlur={formik.handleBlur}
                    onChange={(val) => {
                      if (isString(val.target.value)) {
                        formik.handleChange(val);
                      }
                    }}
                  />
                </Box>

                <Box className="input-group">
                  <Box className="sl_cntnt">
                    <h2 for="">
                      Category
                      <span>
                        Adding a category will help make your item discoverable
                        on OpenSea.
                      </span>{" "}
                    </h2>
                  </Box>

                  <Autocomplete
                    disablePortal
                    id="combo-box-demo-category"
                    className=" form-control "
                    options={categoryArray?.data}
                    sx={{ width: 300 }}
                    value={selectedCategory}
                    onChange={(event, newValue) =>
                      setselectedCategory(newValue)
                    }
                    autoComplete
                    fullWidth
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select from your list"
                        id="combo-box-demo-category"
                      />
                    )}
                  />
                </Box>

                {/* <Box className="input-group">
                <Box className="sl_cntnt">
                  <h2>
                    Creator earnings
                    <span>
                      Earn a percentage of the sale price every time one of your
                      items is sold. Adding multiple addresses may increase gas
                      fees for buyers.
                    </span>
                  </h2>
                </Box>

                {earnings?.map((item, index) => {
                  return (
                    <Box key={index} className="modal_inputt_outr">
                      <TextField
                        className="modl_input"
                        id="outlined-basic"
                        // label="Type"
                        placeholder="Please enter an address"
                        variant="outlined"
                        name="address"
                        value={item?.address}
                        onChange={(e) => handleChange(e, index)}
                      />
                      <TextField
                        className="modl_input"
                        id="outlined-basic"
                        type="number"
                        // label="Name"
                        placeholder="0"
                        name="percent"
                        variant="outlined"
                        value={item?.percent}
                        onChange={(e) => handleChange(e, index)}
                      />
                      <Box className="close">
                        <DeleteOutlineIcon onClick={() => removeProp(index)} />
                      </Box>
                    </Box>
                  );
                })}

                <Box className="more">
                  <Button onClick={addMoreClick}>Add More</Button>
                </Box>
              </Box> */}

                <Box className="input-group">
                  <Box className="sl_cntnt">
                    <h2>
                      BlockChain *
                      <span>
                        The number of items that can be minted. No gas cost to
                        you!
                      </span>
                    </h2>
                  </Box>

                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    className=" form-control "
                    options={blockChainTypes}
                    sx={{ width: 300 }}
                    value={selectedBlockChain}
                    onChange={(event, newValue) =>
                      setselectedBlockChain(newValue)
                    }
                    autoComplete
                    fullWidth
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select from your list"
                        error={Boolean(!selectedBlockChain && error)}
                        helperText={
                          error && !selectedBlockChain
                            ? "This field is required"
                            : ""
                        }
                        id="combo-box-demo"
                      />
                    )}
                  />
                </Box>

                <Box className="input-group">
                  <Box className="sl_cntnt">
                    <h2>
                      Payment tokens
                      <span>
                        These tokens can be used to buy and sell your items.
                      </span>
                    </h2>
                  </Box>

                  <Box className="outr_bx ETH_fdx">
                    {payToken?.map((item, index) => {
                      return (
                        <Box
                          onClick={() => clickPayToken(item)}
                          key={index}
                          className="ETH_inr"
                          style={{
                            borderWidth: paymentToken?.id == item?.id ? 4 : 1,
                          }}
                        >
                          <figure>
                            <img src={item?.image}></img>
                          </figure>
                          <h3>
                            {item?.token} <span>{item?.name}</span>
                          </h3>
                        </Box>
                      );
                    })}
                    {/* <Box className="ETH_inr">
                    <figure>
                      <img src="/static/images/pinketh.svg"></img>
                    </figure>
                    <h3>
                      WETH <span>Ethereum</span>
                    </h3>
                  </Box> */}
                  </Box>
                </Box>

                <Box>
                  <li className="outr_bx">
                    <Box className="sl_cntnt">
                      <h2>
                        Explicit & Sensitive Content
                        <span>
                          Set this item as explicit and sensitive content
                        </span>
                      </h2>
                    </Box>

                    <Box className="rgt">
                      <Switch
                        checked={explictAndSensitiveContent}
                        onChange={(e) =>
                          setexplictAndSensitiveContent(e.target.checked)
                        }
                      />
                    </Box>
                  </li>
                </Box>
              </Box>
              <Box className="btn ">
                <LoadingButton
                  type="submit"
                  disabled={formik.isSubmitting}
                  variant="contained"
                  className="btn_sc"
                  onClick={() => setError(true)}
                >
                  Create
                </LoadingButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCollection;
