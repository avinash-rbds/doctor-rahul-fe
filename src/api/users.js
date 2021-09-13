import axios from "./axios";

export const getUsers = () => {
  return axios({
    url: "/users",
  });
};

export const getUserDetails = (dId) => {
  return axios({
    url: `/user/${dId}`,
  });
};
