import React, { useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { Divider } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  logout,
  resetAuth,
  tempData,
  updateProfile,
  updateWallet,
} from "../../redux/actions";
import CommonDialoge from "../CommonDialoge";

export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState({});
  const [anchorElForMenu, setAnchorElForMenu] = useState(null);

  const isAuthorised = useSelector((state) => state.authReducer.isAuthorised);
  const walletAddress = useSelector((state) => state.authReducer.walletAddress);

  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorElForMenu);

  useEffect(() => {
    const token = getCookie("token");
    const data = getCookie("userData");
    if (token) {
      dispatch(resetAuth.authorise());
    }
    if (data) {
      setUserData(JSON.parse(data));
      if (window.ethereum) {
        if (window.ethereum._state.accounts?.length) {
          if (
            JSON.parse(data)?.walletAddress ==
            window.ethereum._state.accounts[0]
          ) {
            dispatch(
              updateWallet.setWalletAddress(window.ethereum._state.accounts[0])
            );
            setCookie("walletAdd", window.ethereum._state.accounts[0]);
          }
          dispatch(
            updateWallet.setWalletAddress(window.ethereum._state.accounts[0])
          );
          setCookie("walletAdd", window.ethereum._state.accounts[0]);
          console.log(window.ethereum._state.accounts[0], "WalletAddress");
        }
      }
    }
  }, [getCookie, isAuthorised]);

  // useEffect(() => {
  //   if (walletAddress && isAuthorised) {
  //     console.log(walletAddress, window.ethereum._state.accounts[0], "lplplp");
  //     if (walletAddress != window.ethereum._state.accounts[0]) {
  //       const token = getCookie("token");
  //       dispatch(logout.request({}, token));
  //       router.replace("/login");
  //     }
  //   }
  // }, []);

  const connectWallet = async () => {
    console.log("checking account");
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length) {
          const body = {
            walletAddress: accounts[0],
          };
          const token = getCookie("token");
          dispatch(updateProfile.request(body, token));
          dispatch(updateWallet.setWalletAddress(accounts[0]));
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("meta mask not detected");
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (event) => {
    setAnchorElForMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElForMenu(null);
  };

  const logOut = () => {
    const token = getCookie("token");
    dispatch(logout.request({}, token));
    handleClose();
    handleCloseMenu();
    router.replace("/");
  };

  return (
    <Box className=" nav_wrp">
      {/* <CommonDialoge /> */}
      <Box className="conta_iner hdr_mn">
        <Box className="hdr_lft">
          <figure onClick={() => router.replace("/")}>
            <Image
              width={"100%"}
              height={"100%"}
              src={"/static/images/logo.svg"}
              alt=" "
            />
          </figure>
        </Box>
        <Box className="hdr_ryt">
          <ul className="hdr_bx">
            <li className="hdr_lst">
              <a href="/">Home</a>
            </li>
            <li className="hdr_lst">
              <a href="#">About Us</a>
            </li>
            <li className="hdr_lst">
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </Box>
        <Box className="hdr_btn">
          {isAuthorised ? (
            <>
              {!walletAddress && (
                <Button
                  onClick={connectWallet}
                  variant="contained"
                  className=""
                >
                  {/* Connect Wallet */}
                  <AccountBalanceWalletIcon />
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              variant="contained"
              className="btn_sc"
            >
              Sign In
            </Button>
          )}
          {isAuthorised ? (
            <Button
              className="dropdwn btn_sc"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {userData?.firstName || "Dashboard"}
            </Button>
          ) : null}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Box className="profile_fdx">
              <figure className="profile_log">
                <img
                  src={userData?.image || "/static/images/dummy.png"}
                  alt=""
                ></img>
              </figure>
              <p>
                Hello,{userData?.firstName ? userData?.firstName : "there"}{" "}
                {userData?.email?.length ? (
                  <span>{userData?.email}</span>
                ) : null}
              </p>
              <Divider />
            </Box>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/profile");
                dispatch(tempData.updateTempData({ uploadedImage: "" }));
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/changepassword");
              }}
            >
              Change Password
            </MenuItem>
            <MenuItem className="log" onClick={logOut}>
              LOG OUT
            </MenuItem>
          </Menu>

          {isAuthorised ? (
            <Button
              className="profile_drpdwn"
              id="basic-Box"
              aria-controls={openMenu ? "basic-menu-list" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClickMenu}
            >
              <img src={userData?.image || "/static/images/dummy.png"}></img>
            </Button>
          ) : null}
          <Menu
            id="basic-menu-list"
            anchorEl={anchorElForMenu}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-Box",
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                router.push("/create");
              }}
            >
              Create NFT
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                router.push("/profilenft");
              }}
            >
              My NFT's
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                router.push("/createCollection");
              }}
            >
              Create Collection
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                router.push("/mycollection");
              }}
            >
              My Collection
            </MenuItem>
          </Menu>
        </Box>

        <i className="fa-solid fa-caret-down"></i>
      </Box>
    </Box>
  );
};
