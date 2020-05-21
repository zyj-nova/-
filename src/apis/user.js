import axios from "@/utils/MyAxios";

export const getAllUsers = () => {
  return axios({
    url: "/query/users",
    method: "get",
  });
};

export const addUser = (data) => {
  return axios({
    url: "/add_user",
    method: "post",
    data,
  });
};

export const deleteUser = (id) => {
  return axios({
    url: `/delete_user/${id}`,
    method: "get",
  });
};

export const updatePass = (data) => {
  return axios({
    url: "/update_pass",
    method: "post",
    data,
  });
};

export const confirmPass = (data) => {
  return axios({
    url: "/confirm_pwd",
    method: "post",
    data,
  });
};

export const updateUserRole = (data) => {
  return axios({
    url: "/update_user_role",
    method: "post",
    data,
  });
};
