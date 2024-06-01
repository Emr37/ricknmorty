import axios from "axios";

export const baseURL = "https://rickandmortyapi.com/api";
export const api = axios.create({ baseURL });

api.interceptors.request.use(
  (request) => {
    return { ...request, language: "tr" };
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const post = async (url, data = {}) => {
  try {
    const response = await api.post(url, data);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("post-url:", url);
    console.log("axios-post error", error);

    return {
      success: false,
      data: error.response.data,
    };
  }
};

export const get = async (url) => {
  try {
    const response = await api.get(url);
    //console.log("axios response", response);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("get-url:", url);
    console.log("axios-get error", error);

    return {
      success: false,
      data: error.response.data,
    };
  }
};
