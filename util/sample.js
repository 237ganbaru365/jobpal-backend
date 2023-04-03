const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "";

/*
Async function to access thir party API
*/

// encodeURIComponent()
async function getDummyExample() {
  const response = await axios.get(``);
  const data = response.data;

  // it's depends on API, so read doccuments
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError("ERROR MSG HERE", 422);
    throw error;
  }

  // this also depends on the API, here is just sample for now
  const SAMPLE = data.SOMETHING;

  return SAMPLE;
}

module.exports = getDummyExample;
