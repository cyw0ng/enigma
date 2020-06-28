import axios from "axios";
import privateConfig from "../../config.private";

const instance = axios.create({
  baseURL: privateConfig.restBaseUrl,
});

export default instance;
