// The code is based on  "Adam Lapinski's" walk-through project "Moments"!
// https://github.com/Code-Institute-Solutions/moments

import axios from "axios";

axios.defaults.baseURL = "https://recipe-star-api.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();