import axios from "./axios";

export const updatePoints = (data) => {
  return axios({
    url: "/points",
    method: "POST",
    data,
  });
};
