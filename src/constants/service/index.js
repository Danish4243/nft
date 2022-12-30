import { deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import * as Url from "../urls";

export const get = async (url, token, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  console.log("completeUrl", completeUrl);
  try {
    const res = await fetch(completeUrl, {
      method: "GET",
      headers,
    });
    const response = await res.json();
    if (response.statusCode == 401) {
      deleteCookie("token");
      deleteCookie("userData");

      window.location.replace("/");
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getoldchat = async (url, token, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  console.log("completeUrl", completeUrl);
  try {
    const res = await fetch(completeUrl, {
      method: "GET",
      headers,
    });
    const response = await res.json();
    if (response.statusCode == 401) {
      deleteCookie("token");
      deleteCookie("userData");
      window.location.replace("/");
    }
    if (response.status == 200) {
      const message = response.message;
      !hide ? alert({ message }) : null;
    } else {
      const message = response.message;
      !hide ? alert({ message }) : null;
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const post = async (url, token, body, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  let data = JSON.stringify(body);
  console.log("completeUrl", completeUrl, body, headers);
  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      headers,
      body: data,
    });
    const response = await res.json();
    if (response.statusCode == 401) {
      deleteCookie("token");
      deleteCookie("userData");
      // toast.error("Session Expired");
      window.location.replace("/");
    }
    if (response.error?.text) {
      toast.error(response.error.text);
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const put = async (url, token, body, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  let data = JSON.stringify(body);
  console.log("completeUrl", completeUrl, body, headers);
  try {
    const res = await fetch(completeUrl, {
      method: "PUT",
      headers,
      body: data,
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadImageApi = async (url, token, body, hide = false) => {
  console.log(body, token, url, "image upload=======");
  var headers;

  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "multipart/form-data",
    };
  } else {
    headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  console.log("completeUrl", completeUrl);
  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      // headers: headers,
      body: body,
    });
    console.log("check the response", res);
    let response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
