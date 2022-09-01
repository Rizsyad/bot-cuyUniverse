const axios = require("axios");

const request = async (url, method, headers = {}) => {
  headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    ...headers,
  };

  return await axios({ url, method, headers });
};

const getExistUsername = async (url, error) => {
  try {
    const response = await request(url, "GET");
    const statusCode = await response.status;
    const dataResponse = await response.data;

    if (statusCode >= 200 && statusCode <= 399) {
      if (dataResponse.includes(error)) return;
      return url;
    }
  } catch (err) {}

  return;
};

const getExtraxtPageLinks = async (url) => {
  const { data } = await request(`https://api.hackertarget.com/pagelinks/?q=${url}`, "GET");
  return data;
};

module.exports = {
  getExistUsername,
  getExtraxtPageLinks,
  request,
};
