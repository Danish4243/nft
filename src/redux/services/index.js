import { getCookie } from "cookies-next";
import * as Service from "../../constants/service";

export const application_json = async (body, url, tempToken) => {
  const token = getCookie("token");
  // console.log(token, "<<<<<==========token");

  try {
    const response = await Service.post(
      url,
      token ? token : tempToken ? tempToken : "",
      body
    );
    if (response) {
      console.log(response, `${url}-----------`);
    }
    return response;
  } catch (error) {
    console.log(error, "err-----------");
    return { message: error };
  }
};

export const get_response = async (url) => {
  const token = getCookie("token");
  console.log(token);
  try {
    const response = await Service.get(url, token || "");
    if (response) {
      console.log(response, `${url}-----------`);
    }
    return response;
  } catch (error) {
    console.log(error, "err-----------");
    return { message: error };
  }
};

export const multipart_form = async (body, url) => {
  try {
    const response = await Service.uploadImageApi(url, null, body);
    if (response) {
      console.log(response, `${url}-----------`);
    }
    return response;
  } catch (error) {
    console.log(error, "err-----------");
    return { message: error };
  }
};

export const putApi = async (body, url, tempToken) => {
  const token = getCookie("token");
  try {
    const response = await Service.put(url, token, body);
    if (response) {
      // console.log(response, `${url}-----------`);
    }
    return response;
  } catch (error) {
    // console.log(error, ‘err-----------’);
    return { message: error };
  }
};
