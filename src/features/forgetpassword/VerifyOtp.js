import { Box } from "@material-ui/core";
import React, { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";

import { useDispatch, useSelector } from "react-redux";
import { forgotOtpVerify, forgotPassword } from "../../redux/actions";

const OTPInput = dynamic(() => import("otp-input-react"), { ssr: false });

const ForgetOtpVerify = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.authReducer.tempData);

  const [OTP, setOTP] = useState("");
  const [counter, setCounter] = useState(30);
  const [resent, setResent] = useState(true);

  useEffect(() => {
    if (!counter) {
      setResent(false);
      return;
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleOtp = async (val) => {
    setOTP(val);
    let body = {
      key: data?.key,
      code: val,
    };
    if (val.length == 4) {
      dispatch(forgotOtpVerify.request(body));
    }
  };

  const handleResend = () => {
    let body = {
      key: data?.key,
    };
    dispatch(forgotPassword.request(body));
  };

  return (
    <Box className="conta_iner1">
      <Box className="otp_wrp">
        <h3>Verify Account</h3>
        <p>Please Enter The Verification Code We Sent To You</p>

        <Box className="otp_fdx">
          <OTPInput
            className=" custom"
            value={OTP}
            onChange={(val) => {
              {
                handleOtp(val);
              }
            }}
            hasErrored={false}
            autoFocus
            OTPLength={4}
            otpType="number"
            disabled={false}
            inputStyles={{
              height: 50,
              width: 50,
            }}
          />
        </Box>
        <Box className="btm">
          <ul>
            <li>
              <span>{`00 : ${counter < 10 ? "0" + counter : counter}`}</span>
            </li>
            <li>
              <h6>Didn't get the code?</h6>
            </li>
            {!resent && (
              <li onClick={() => handleResend()}>
                <h6 className="lst_name">Resend</h6>
              </li>
            )}
          </ul>
        </Box>
        <div
          className="cros_div"
          onClick={() => dispatch(forgotOtpVerify.open(false))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46.102"
            height="46.102"
            viewBox="0 0 46.102 46.102"
          >
            <g
              id="Group_902933"
              data-name="Group 902933"
              transform="translate(5017.776 1493.757)"
            >
              <rect
                id="Rectangle_138542"
                data-name="Rectangle 138542"
                width="36.59"
                height="36.59"
                rx="18"
                transform="translate(-5013.02 -1489.001)"
                fill="#f6f6f6"
              />

              <g
                id="vuesax_linear_add"
                data-name="vuesax/linear/add"
                transform="translate(-4994.725 -1493.757) rotate(45)"
              >
                <g id="add" transform="translate(0 0)">
                  <path
                    id="Vector"
                    d="M0,0H16.3"
                    transform="translate(8.15 16.299)"
                    fill="none"
                    stroke="#9d9d9d"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />

                  <path
                    id="Vector-2"
                    data-name="Vector"
                    d="M0,16.3V0"
                    transform="translate(16.299 8.15)"
                    fill="none"
                    stroke="#9d9d9d"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />

                  <path
                    id="Vector-3"
                    data-name="Vector"
                    d="M0,0H32.6V32.6H0Z"
                    fill="none"
                    opacity="0"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </Box>
    </Box>
  );
};

export default memo(ForgetOtpVerify);
