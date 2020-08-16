const axios = require("axios");
const { URL } = require("url");

const pkgJson = require("../package.json");
const { serializeRequest } = require("./util");

// Resources
const Candiates = require("./resources/Candidates");
const Evaluations = require("./resources/Evaluations");
const Offers = require("./resources/Offers");
const Placements = require("./resources/Placements");
const RecruiteeError = require("./RecruiteeError");

const DEFAULT_HOST = "https://api.recruitee.com";
const USER_AGENT = `${pkgJson.name}/${pkgJson.version} node/${pkgJson.version}`;

class Recruitee {
  constructor(companyId, apiToken) {
    this.companyId = companyId;
    this.apiToken = apiToken;

    this.baseURL = `${DEFAULT_HOST}/c/${companyId}`;

    this.axios = axios.create({
      timeout: 10000,
      transformRequest: [serializeRequest],
      headers: {
        common: {
          Authorization: `Bearer ${apiToken}`,
          "User-Agent": USER_AGENT
        }
      }
    });

    // Clear out the default headers since we always set our own
    ["post", "put", "patch"].forEach(
      method => delete this.axios.defaults.headers[method]["Content-Type"]
    );

    this.candidates = new Candiates(this);
    this.evaluations = new Evaluations(this);
    this.offers = new Offers(this);
    this.placements = new Placements(this);
  }

  request(method, path, { body, query } = {}) {
    const options = {
      method,
      url: new URL(`/c/${this.companyId}${path}`, DEFAULT_HOST).toString(),
      data: body,
      params: query
    };

    return new Promise((resolve, reject) => {
      this.axios(options)
        .then(response => {
          resolve({
            statusCode: response.status,
            body: response.data
          });
        })
        .catch(error => {
          if (error.response) {
            reject(new RecruiteeError(error.response));
          } else {
            reject(error);
          }
        });
    });
  }
}

module.exports = Recruitee;
