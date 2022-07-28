import axios from "axios";

const instance = axios.create({
  timeout: 30000,
});

function axiosRequest(url, method, data, config) {
  return instance
    .request({ method, url, data, ...config })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response?.data;
    });
}
