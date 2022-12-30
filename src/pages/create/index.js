import React, { useState, useEffect } from "react";
import { Box, Button, Input, Switch, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import Autocomplete from "@mui/material/Autocomplete";
import { Header, Loader } from "../../components";
import { PropertiesPopUp } from "../../features/create/Properties";
import { LevelsPopUp } from "../../features/create/Levels";
import { StatsPopUp } from "../../features/create/Stats";
import {
  createNftForm,
  getUserCollection,
  imageUpload,
  tempData,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CollectionsIcon from "@mui/icons-material/Collections";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { useFormik } from "formik";
import { isNumber, isString } from "../../utils/validations";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { getCookie } from "cookies-next";
import { mintToken } from "../ramdom";
import Web3 from "web3";
import {
  ABI,
  ABIMarket,
  ADDRESS,
  ADDRESSMarket,
} from "../../utils/contractData";

const blockChainTypes = [
  {
    name: "Ethereum",
    value: 1,
  },
];

const CreatePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const data = getCookie("userData");
  // const infuraKey = data && JSON.parse(data)?.plugin;

  // console.log(data, "datadata");

  const projectId = "2FcozSQYTEohTN9yxqUAgb3K8ON";
  const projectSecret = "acecd58539fdf9dc0f1ce0fa64b7f0d2";

  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedBlockChain, setselectedBlockChain] = useState(null);
  const [videoFile, setvideoFile] = useState("");
  const [videoUrl, setvideoUrl] = useState("");

  const [mediaType, setmediaType] = useState("");
  const [audioFile, setaudioFile] = useState("");
  const [audioUrl, setaudioUrl] = useState("");

  const [imageUrl, setimageUrl] = useState("");
  const [image, setImage] = useState("");
  const [thumbnailUrl, setthumbnailUrl] = useState("");
  const [isTumbnailImage, setisTumbnailImage] = useState(false);
  const [error, setError] = useState(false);
  const [unlockableContent, setunlockableContent] = useState(false);
  const [explictAndSensitiveContent, setexplictAndSensitiveContent] =
    useState(false);

  //properties
  const [isPropertiesPopUpVisible, setIsPropertiesPopUpVisible] =
    useState(false);
  const [propertyData, setpropertyData] = useState([]);

  // levels
  const [isLevelPopUpVisible, setisLevelPopUpVisible] = useState(false);
  const [levels, setlevels] = useState([]);

  // stats
  const [isStatsPopUpVisible, setisStatsPopUpVisible] = useState(false);
  const [stats, setstats] = useState([]);

  const temporaryData = useSelector((state) => state.authReducer.tempData);
  const walletAddress = useSelector((state) => state.authReducer.walletAddress);
  const isAuthorised = useSelector((state) => state.authReducer.isAuthorised);
  const collections = useSelector(
    (state) => state.nftReducer.userCollectionData
  );

  useEffect(() => {
    {
      temporaryData && mediaSelect();
    }
  }, [temporaryData]);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      setTimeout(() => {
        toast.error("Please signIn");
        router.replace("/login");
      }, 2000);
    } else {
      dispatch(getUserCollection.request());
    }
    dispatch(tempData.updateTempData({ uploadedImage: "" }));
  }, [getCookie, dispatch]);

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result, "result");
        setImage(`https://app-nft.infura-ipfs.io/ipfs/${result.path}`);
        console.log(`https://app-nft.infura-ipfs.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  const uploadThumbnailIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result, "result");
        setthumbnailUrl(`https://app-nft.infura-ipfs.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  const mediaSelect = () => {
    const image = temporaryData?.uploadedImage?.type?.split("/");
    const mediaType = "";
    mediaType = image && image[0];
    if (mediaType == "image") {
      if (isTumbnailImage) {
        setthumbnailUrl(temporaryData?.uploadedImage?.image);
      } else {
        setimageUrl(temporaryData?.uploadedImage?.image);
      }
    } else if (mediaType == "video") {
      setvideoUrl(temporaryData?.uploadedImage?.image);
    } else if (mediaType == "audio") {
      setaudioUrl(temporaryData?.uploadedImage?.image);
    }
  };

  const mediaUploadApi = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch(imageUpload.request(formData));
  };

  const videoUpload = (file) => {
    setaudioUrl("");
    setimageUrl("");
    if (file?.size / 1000000 <= 10) {
      setvideoFile(file);
      mediaUploadApi(file);
    } else {
      toast.error("Media size should be less than 10MB");
    }
  };

  const uploadImage = (file) => {
    setisTumbnailImage(false);
    setaudioUrl("");
    setvideoUrl("");
    mediaUploadApi(file);
  };

  const uploadThumbnailImage = (val) => {
    setisTumbnailImage(true);
    const files = val.target;
    const file = files.files[0];
    mediaUploadApi(file);
  };

  const audioUpload = (file) => {
    setimageUrl("");
    setvideoUrl("");
    if (file?.size / 1000000 <= 10) {
      setaudioFile(file);
      mediaUploadApi(file);
    } else {
      toast.error("Media size should be less than 10MB");
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      externalLink: "",
      description: "",
      supply: "",
      price: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(" Name is required"),
      description: Yup.string().required(" Description is required"),
      supply: Yup.string().required(" Supply is required"),
      // price: Yup.string().required(" Price is required"),
    }),
    onSubmit: async () => {
      if (
        selectedBlockChain &&
        selectedCollection &&
        (imageUrl || audioUrl || videoUrl)
      ) {
        setError(false);
      }

      if (
        selectedBlockChain &&
        selectedCollection &&
        (imageUrl || audioUrl || videoUrl)
      ) {
      } else {
        return;
      }

      formik.setSubmitting(true);

      if (
        !image ||
        // !formik.values.price ||
        !formik.values.name ||
        !formik.values.description ||
        !selectedCollection ||
        !selectedBlockChain
      )
        return;
      try {
        let body = {
          image: image,
          // price: formik.values.price,
          name: formik.values.name,
          description: formik.values.description,
          thumbnail: thumbnailUrl,
          collectionId: selectedCollection?._id,
          blockchain: selectedBlockChain?.name,
          externalLink: formik.values.externalLink,
          levels: levels,
          stats: stats,
          supply: formik.values.supply,
          unlockableContent: unlockableContent,
          explictAndSensitiveContent: explictAndSensitiveContent,
          property: propertyData,
          tokenType: formik.values.supply == 1 ? "721" : "1155",
          creatorAddress: walletAddress ? walletAddress : "",
        };
        const result = await client.add(JSON.stringify(body));
        console.log(result, "resultttttt");
        // mintThenList(result);
        // const uri = `https://app-nft.infura-ipfs.io/ipfs/${result.path}`;

        let sendData = {
          metaData: image,
          quantity: formik.values.supply,
        };

        console.log({ sendData });

        var web3 = new Web3(Web3.givenProvider);

        let contract = new web3.eth.Contract(ABIMarket, ADDRESSMarket);

        try {
          let sTokenUri = image;
          let nQuantity = formik.values.supply;

          let sAccounts = await web3.eth.getAccounts();
          let sMsgsender = sAccounts[0];

          let nGasUsed = await contract.methods
            .mintUser(sTokenUri, nQuantity)
            .estimateGas({ from: sMsgsender });
          alert(
            "gas used for this transation is " +
              nGasUsed +
              " click on confirm in metamask to continue"
          );

          contract.methods
            .mintUser(sTokenUri, nQuantity)
            .send({ from: sMsgsender })
            .on("transactionHash", function (sHash) {
              if (
                window.confirm(
                  "Your transation hash is" +
                    sHash +
                    "press ok to visit the transation details on ether scan"
                )
              ) {
                window.open(`https://goerli.etherscan.io/tx/${sHash}`);

                // setloading(true);
              }

              console.log("goingggggg frwdddddd");
            })
            .on("receipt", function (receipt) {
              if (receipt.status == true) {
                dispatch(createNftForm.request(body));
                console.log("<><><><><><><>receipt<><><><><><><><><>");

                router.push("/profilenft");
                // alert(`You have approved ${sSpender} the amount of ${nAmount} token`);
                // console.log(receipt, "reciepttttttt");
              } else {
                alert("Transaction reverted due to some technical issues.");
              }
            })
            .catch(function (err) {
              toast.error(err.message);
            });
        } catch (err) {
          console.log(err.message, "minterror");
          toast.error(err.message);
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again");
        console.log("ipfs uri upload error: ", error);
      }

      setTimeout(() => {
        formik.setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <Box className="">
      <Header />
      <Loader />
      <Box className="conta_iner py-60 create_wrap mn_hd">
        <div className="mb-20">
          <h2>Create New Item</h2>
          <small className="text-white">* Required fields</small>
        </div>
        <label style={{ marginBottom: "9px", display: "block" }}>Image *</label>

        <span className="text-grey">
          File types supported: JPG, JPEG, PNG. Max size: 10 MB
        </span>

        <Box className="create_outr">
          <Box className="upload_img ">
            <Box className="upload_bx" sx={{ mt: 2 }}>
              <label className="upload_lbl" htmlFor="icon-button-file">
                <Box className="text_field">
                  <TextField
                    inputProps={{
                      accept: "image/jpeg, image/jpg, image/png, image/svg",
                    }}
                    id="icon-button-file"
                    type="file"
                    sx={{ display: "none" }}
                    onChange={(val) => {
                      const files = val.target;
                      const file = files?.files[0];
                      const fileType = file?.type?.split("/");
                      if (fileType) {
                        setmediaType(fileType[0]);
                        // fileType[0] == "image"
                        //   ? uploadImage(file)
                        //   : fileType[0] == "video"
                        //   ? videoUpload(file)
                        //   : audioUpload(file);
                        uploadImage(file);
                        uploadToIPFS(val);
                      }
                    }}
                  />
                </Box>
                {imageUrl ? null : <CollectionsIcon />}
                {/* {imageUrl || audioUrl || videoUrl ? null : <CollectionsIcon />} */}
              </label>
            </Box>
            {imageUrl && (
              <Box className="out_bx">
                <img src={imageUrl} alt="" width="100%" height="100%" />
              </Box>
            )}

            {/* {mediaType == "video"
              ? videoUrl && (
                  <Box
                    className="out_bx"
                    sx={{ height: "100%", width: "100%", overflow: "hidden" }}
                  >
                    <video width="100%" height="100%" controls>
                      <source src={videoUrl} type={videoFile?.type} />
                    </video>
                  </Box>
                )
              : mediaType == "image"
              ? imageUrl && (
                  <Box className="out_bx">
                    <img src={imageUrl} alt="" width="100%" height="100%" />
                  </Box>
                )
              : mediaType == "audio"
              ? audioUrl && (
                  <Box className="out_bx">
                    <audio controls>
                      <source src={audioUrl} type={audioFile?.type} />
                    </audio>
                  </Box>
                )
              : null} */}
          </Box>
        </Box>
        <label htmlFor="icon-button-file">
          <Box id="icon-button-file" className="change_text">
            {imageUrl || audioUrl || videoUrl ? <span>Change</span> : null}
          </Box>
          <Box className="erroe_txt">
            {Boolean(imageUrl || audioUrl || videoUrl) && error ? (
              <></>
            ) : (
              error && <span>Media field is required</span>
            )}
          </Box>
        </label>

        <form onSubmit={formik.handleSubmit} action="">
          {/*---------------------- for thumbnail --------------------------- */}
          <Box className="preview">
            {videoUrl || audioUrl ? (
              <Box className="input-group" sx={{ mt: 2 }}>
                <label>Preview Image </label>
                <span>
                  Because you’ve included multimedia, you’ll need to provide an
                  image (PNG, JPG, or GIF) for the card display of your item.
                </span>
                <label htmlFor="icon-button-file2">
                  <TextField
                    inputProps={{
                      accept: "image/jpeg, image/jpg, image/png",
                    }}
                    id="icon-button-file2"
                    type="file"
                    sx={{ display: "none" }}
                    onChange={(val) => {
                      uploadThumbnailImage(val);
                      uploadThumbnailIPFS(val);
                    }}
                  />
                  <Box className="out_prev">
                    <Box className="preview_inner">
                      {thumbnailUrl && <img src={thumbnailUrl} alt="" />}
                    </Box>
                    <Box className="svg_none">
                      {thumbnailUrl ? null : (
                        <CollectionsBookmarkIcon
                          onClick={() => setisTumbnailImage(true)}
                        />
                      )}
                    </Box>
                  </Box>
                </label>
              </Box>
            ) : null}
            {videoUrl || audioUrl ? (
              <label htmlFor="icon-button-file2">
                <figure onClick={() => setisTumbnailImage(true)}>
                  {thumbnailUrl && (
                    <Box className="">
                      <span>Change</span>
                    </Box>
                  )}
                </figure>
              </label>
            ) : null}
          </Box>

          <Box className="input-group">
            <label for="">Name *</label>
            <TextField
              type="text"
              className=" form-control "
              placeholder="Item name"
              value={formik.values.name}
              variant="standard"
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              margin="none"
              name="name"
              // label="Name"
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
            <label for="">External link </label>
            <span>
              Apptunix will include a link to this URL on this item’s detail
              page, so that users can click to learn more about it. You are
              welcome to link to your own webpage with more details.
            </span>

            <TextField
              type="text"
              id="outlined-textarea"
              className="form-control"
              placeholder="https://yousite/item/123"
              value={formik.values.externalLink}
              variant="standard"
              fullWidth
              margin="none"
              name="externalLink"
              onBlur={formik.handleBlur}
              onChange={(val) => {
                if (isString(val.target.value)) {
                  formik.handleChange(val);
                }
              }}
            />
          </Box>
          <Box className="input-group">
            <label for="">Description *</label>
            <span>
              The description will be included on the item’s detail page
              underneath its image. Markdown syntax is supported.
            </span>
            <TextField
              type="text"
              multiline
              minRows={5}
              maxRows={15}
              className=" form-control "
              placeholder="Provide a detailed description of your item."
              value={formik.values.description}
              variant="standard"
              error={Boolean(
                formik.touched.description && formik.errors.description
              )}
              fullWidth
              margin="none"
              name="description"
              helperText={
                formik.touched.description && formik.errors.description
              }
              onBlur={formik.handleBlur}
              onChange={(val) => {
                if (isString(val.target.value)) {
                  formik.handleChange(val);
                }
              }}
            />
          </Box>

          {/* <Box className="input-group">
            <label for="">Price *</label>
            <TextField
              type="number"
              className=" form-control "
              placeholder="enter price"
              value={formik.values.price}
              variant="standard"
              error={Boolean(formik.touched.price && formik.errors.price)}
              fullWidth
              margin="none"
              name="price"
              // label="price"
              helperText={formik.touched.price && formik.errors.price}
              onBlur={formik.handleBlur}
              onChange={(val) => {
                formik.handleChange(val);
              }}
            />
          </Box> */}

          <Box className="input-group">
            <label for="">Collection* </label>
            <span>This is the collection where your item will appear.</span>
            <Autocomplete
              disablePortal
              id="combo-box-demo-collect"
              className=" form-control "
              options={collections?.data}
              sx={{ width: 300 }}
              value={selectedCollection}
              onChange={(event, newValue) => setSelectedCollection(newValue)}
              autoComplete
              fullWidth
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select from your collections"
                  error={Boolean(!selectedCollection && error)}
                  helperText={
                    error && !selectedCollection ? "This field is required" : ""
                  }
                  id="combo-box-demo-collect"
                />
              )}
            />
          </Box>
          <Box>
            <ul>
              <li className="outr_bx">
                <Box className="lft">
                  <h5>
                    Properties
                    <span>Textual traits that show up as rectangles</span>
                  </h5>
                </Box>
                <Box className="rgt">
                  <figure onClick={() => setIsPropertiesPopUpVisible(true)}>
                    <img src="/static/images/add.svg"></img>
                  </figure>
                </Box>
              </li>
              {isPropertiesPopUpVisible && (
                <PropertiesPopUp
                  propertyData={propertyData}
                  setpropertyData={setpropertyData}
                  setIsPropertiesPopUpVisible={setIsPropertiesPopUpVisible}
                />
              )}
              {!isPropertiesPopUpVisible && (
                <Box className="prop_fdx">
                  {propertyData?.map((item, index) => {
                    return (
                      <Box className="prop_data" key={index}>
                        <span>{item?.types}</span>
                        <span>{item?.name}</span>
                      </Box>
                    );
                  })}
                </Box>
              )}
              <li className="outr_bx">
                <Box className="lft">
                  <h5>
                    Levels
                    <span>Numerical traits that show as a progress bar</span>
                  </h5>
                </Box>
                <Box className="rgt">
                  <figure onClick={() => setisLevelPopUpVisible(true)}>
                    <img src="/static/images/add.svg"></img>
                  </figure>
                </Box>
              </li>
              {isLevelPopUpVisible && (
                <LevelsPopUp
                  setisLevelPopUpVisible={setisLevelPopUpVisible}
                  levels={levels}
                  setlevels={setlevels}
                />
              )}
              {!isLevelPopUpVisible && (
                <Box className="stat_fdx">
                  {levels?.map((item, index) => {
                    return (
                      <Box key={index} className="stat_data">
                        <span>{item?.name}</span>
                        <span>
                          {item?.valueOf} of {item?.valueFrom}
                        </span>
                      </Box>
                    );
                  })}
                </Box>
              )}
              <li className="outr_bx">
                <Box className="lft">
                  <h5>
                    Stats
                    <span>Numerical traits that just show as numbers</span>
                  </h5>
                </Box>
                <Box className="rgt">
                  <figure onClick={() => setisStatsPopUpVisible(true)}>
                    <img src="/static/images/add.svg"></img>
                  </figure>
                </Box>
              </li>
              {isStatsPopUpVisible && (
                <StatsPopUp
                  setisStatsPopUpVisible={setisStatsPopUpVisible}
                  stats={stats}
                  setstats={setstats}
                />
              )}
              {!isStatsPopUpVisible && (
                <Box className="stat_fdx">
                  {stats?.map((item, index) => {
                    return (
                      <Box key={index} className="stat_data">
                        <span>{item?.name}</span>
                        <span>
                          {item?.valueOf} of {item?.valueFrom}
                        </span>
                      </Box>
                    );
                  })}
                </Box>
              )}
              <li className="outr_bx">
                <Box className="lft">
                  <h5>
                    Unlockable Content
                    <span>
                      Include unlockable content that can only be revealed by
                      the owner of the item.
                    </span>
                  </h5>
                </Box>
                <Box className="rgt">
                  <Switch
                    checked={unlockableContent}
                    onChange={(e) => setunlockableContent(e.target.checked)}
                  />
                </Box>
              </li>
              <li className="outr_bx">
                <Box className="lft">
                  <h5>
                    Explicit & Sensitive Content
                    <span>Set this item as explicit and sensitive content</span>
                  </h5>
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

              <Box className="input-group">
                <label for="">Supply *</label>
                <span>
                  The number of items that can be minted. No gas cost to you!
                </span>
                <TextField
                  type="number"
                  className="form-control"
                  placeholder="Supply"
                  value={formik.values.supply}
                  variant="standard"
                  error={Boolean(formik.touched.supply && formik.errors.supply)}
                  fullWidth
                  margin="none"
                  name="supply"
                  helperText={formik.touched.supply && formik.errors.supply}
                  onBlur={formik.handleBlur}
                  onChange={(val) => {
                    if (isNumber(val.target.value)) {
                      formik.handleChange(val);
                    }
                  }}
                  // disabled
                />
              </Box>
              <Box className="input-group">
                <label for="">BlockChain *</label>
                <span>
                  The number of items that can be minted. No gas cost to you!
                </span>
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

              {/* <Box className="input-group ">
                <label for="">Freeze metadata </label>
                <span>
                  Freezing your metadata will allow you to permanently lock and
                  store all of this item’s content in decentralized file
                  storage.
                </span>
                <TextField
                  type="number"
                  className="form-control"
                  placeholder="To freeze your metadata, you must create your item first."
                />
              </Box> */}
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
            </ul>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreatePage;
