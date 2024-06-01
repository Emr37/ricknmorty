import axios from "axios";

export const instance = axios.create();

instance.interceptors.request.use(
  (request) => {
    return { ...request, language: "tr" };
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const post = async (url, data = {}) => {
  try {
    const response = await instance.post(url, data);
    //console.log("axios response", response);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("post-url:", url);
    console.log("axios error", error);

    return {
      success: false,
      data: error.response.data,
      error: error,
      status: error.status,
    };
  }
};
