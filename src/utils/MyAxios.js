import axios from "axios";

// 设置基础URL
axios.defaults.baseURL = "/api";

// 已经为ajax请求设置了loading 请求前自动调用 请求完成自动结束

export default axios;
