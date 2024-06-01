import { post, get } from "../config/axios";

export const baseURL = "https://rickandmortyapi.com/api/";
export const episodesURL = "https://rickandmortyapi.com/api/episode/";
export const episodeDetailURL = "https://rickandmortyapi.com/api/episode/";
export const charactersURL = "https://rickandmortyapi.com/api/character/";
export const characterDetailURL = "https://rickandmortyapi.com/api/character/";

const loadNewsService = async () => {
  console.log("LoadNewsService çalıştı.");
  const response = await post(baseURL);

  console.log("Load sonrası response success ?", response.success);
  console.log("Load sonrası response data status ?", response.data.status);

  if (response.data.status == "0") {
    return {
      status: true,
      companyInfo: response.data.data.Company,
      categories: response.data.data.categories,
      lastNews: response.data.data.lastnews,
    };
  } else {
    return {
      status: false,
      error: response.data.data,
    };
  }
};

const categoryNewsService = async (data) => {
  console.log("CategoryNewsService Çalıştı :", data);
  const response = await post(`${categoryURL}${data}`);

  console.log("Category sonrası response success ?", response.success);
  console.log("Category sonrası response data status ?", response.data.status);

  if (response.data.status == "0") {
    return {
      status: true,
      companyInfo: response.data.data.Company,
      categories: response.data.data.categories,
      lastNews: response.data.data.lastnews,
    };
  } else {
    return {
      status: false,
      error: response.data.data,
    };
  }
};

const loadDetailService = async (data) => {
  console.log("Load Detail Çalıştı :", data);
  const response = await post(`${detailURL}${data}`);

  console.log("Load Details sonrası response success ?", response.success);
  //console.log("Load Details sonrası response data status ?", response.data.status);

  if (response.data.status == "0") {
    return {
      status: true,
      newsDetail: response.data.data.content,
      relatedNews: response.data.data.lastnews,
    };
  } else {
    return {
      status: false,
      error: response.data.data,
    };
  }
};

const searchNewsService = async (data) => {
  console.log("Search Service Çalıştı :", data);
  const response = await post(`${searchURL}${data}`);

  console.log("Search Service sonrası response success ?", response.success);
  if (response.data.status == "0") {
    return {
      status: true,
      searchedNews: response.data.data.lastnews,
    };
  } else {
    return {
      status: false,
      error: response.data.data,
    };
  }
};
const deviceTokenService = async (data) => {
  console.log("DeviceToken Service Çalıştı :", data);
  const response = await post(`${deviceTokenURL}`, data);

  console.log("DeviceToken Service sonrası response success ?", response.success);
  if (response.data.status == "success") {
    return {
      status: true,
      message: response.data.data.message,
    };
  } else {
    return {
      status: false,
      error: response.data.data.message,
    };
  }
};

export { loadNewsService, categoryNewsService, loadDetailService, searchNewsService, deviceTokenService };
