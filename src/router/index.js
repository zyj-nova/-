import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const commonRoutes = [
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/404",
    name: "404",
    meta: { title: "404" },
    component: () => import("../components/404.vue"),
  },
  { path: "/", redirect: "/home" },
];

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
  home: {
    path: "home",
    name: "home",
    meta: { title: "主页" },
    component: () => import("../views/Home.vue"),
  },
  t1: {
    path: "t1",
    name: "t1",
    meta: { title: "数据查询" },
    component: () => import("../views/T1.vue"),
  },
  password: {
    path: "password",
    name: "password",
    meta: { title: "修改密码" },
    component: () => import("../views/Password.vue"),
  },

  userinfo: {
    path: "userinfo",
    name: "userinfo",
    meta: { title: "用户信息" },
    component: () => import("../views/UserInfo.vue"),
  },
  analysis: {
    path: "analysis",
    name: "analysis",
    meta: { title: "能耗分析" },
    component: () => import("../views/Analysis.vue"),
  },
  energy_cal: {
    path: "energy_cal",
    name: "energy_cal",
    meta: { title: "能耗计算" },
    component: () => import("../views/EnergyCal.vue"),
  },
  data_admin: {
    path: "admin",
    name: "data_admin",
    mata: { title: "数据管理" },
    component: () => import("../views/DataAdmin.vue"),
  },
  predict: {
    path: "predict",
    name: "predict",
    meta: { title: "能耗预测" },
    component: () => import("../views/Predict.vue"),
  },
  user_admin: {
    path: "users",
    name: "user_admin",
    meta: { title: "用户管理" },
    component: () => import("../views/UserAdmin.vue"),
  },
};

const createRouter = () =>
  new Router({
    routes: commonRoutes,
    mode: "history",
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
