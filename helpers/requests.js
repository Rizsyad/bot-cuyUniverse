const axios = require("axios");

const getExistUsername = async (url, error) => {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    };

    const response = await axios({ url, method: "GET", headers });
    const statusCode = await response.status;
    const dataResponse = await response.data;

    if (statusCode >= 200 && statusCode <= 399) {
      if (dataResponse.includes(error)) return;
      return url;
    }
  } catch (err) {}

  return;
};

module.exports = {
  getExistUsername,
};
