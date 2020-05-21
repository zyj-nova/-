import axios from "@/utils/MyAxios";

export const getTrainData = (dataQuery, page) => {
  return axios({
    url: `/trains/${page}`,
    method: "post",
    data: dataQuery,
  });
};

export const getRouteData = () => {
  return axios({
    url: "/query/route",
    method: "get",
  });
};

export const analysisDataByWeight = (data) => {
  return axios({
    url: "/analysis/a1",
    method: "post",
    data,
  });
};

export const analysisDataByTrain = (data) => {
  return axios({
    url: "/analysis/a1",
    method: "post",
    data,
  });
};

export const analysisDataByRoute = (data) => {
  return axios({
    url: "/analysis/a2",
    method: "post",
    data,
  });
};

export const predictData = (data) => {
  return axios({
    url: "/predict",
    method: "post",
    data,
  });
};
