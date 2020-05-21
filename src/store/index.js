import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 左侧菜单栏数据
    menuItems: [
      {
        name: "home", // 要跳转的路由名称 不是路径
        size: 18, // icon大小
        type: "md-home", // icon类型
        text: "主页", // 文本内容
      },
      {
        text: "能耗统计",
        type: "ios-stats-outline",
        size: 18,
        children: [
          {
            type: "ios-search",
            name: "t1",
            text: "数据查询",
            // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
            // hidden: true,
          },
          {
            name: "energy_cal",
            text: "能耗计算",
            type: "md-pulse",
          },
        ],
      },
      {
        name: "analysis",
        size: 18,
        text: "能耗分析",
        type: "ios-analytics-outline",
      },
      {
        name: "predict",
        size: 18,
        text: "能耗预测",
        type: "md-code-working",
      },
      {
        name: "data_admin",
        size: 18, // icon大小
        type: "md-apps", // icon类型
        text: "数据管理", // 文本内容
      },
      {
        name: "user_admin",
        size: 18,
        type: "ios-people",
        text: "用户管理",
      },
      {
        // 要跳转的路由名称 不是路径
        size: 18, // icon大小
        type: "md-barcode", // icon类型
        text: "个人信息", // 文本内容
        children: [
          {
            type: "md-lock",
            name: "password",
            text: "修改密码",
          },
          {
            type: "md-person",
            name: "userinfo",
            text: "基本资料",
          },
        ],
      },
    ],
    menuItemsNormal: [
      {
        name: "home", // 要跳转的路由名称 不是路径
        size: 18, // icon大小
        type: "md-home", // icon类型
        text: "主页", // 文本内容
      },
      {
        text: "能耗统计",
        type: "ios-stats-outline",
        size: 18,
        children: [
          {
            type: "ios-search",
            name: "t1",
            text: "数据查询",
            // hidden 属性 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
            // hidden: true,
          },
          {
            name: "energy_cal",
            text: "能耗计算",
            type: "md-pulse",
          },
        ],
      },
      {
        name: "analysis",
        size: 18,
        text: "能耗分析",
        type: "ios-analytics-outline",
      },
      {
        name: "predict",
        size: 18,
        text: "能耗预测",
        type: "md-code-working",
      },
      {
        // 要跳转的路由名称 不是路径
        size: 18, // icon大小
        type: "md-barcode", // icon类型
        text: "个人信息", // 文本内容
        children: [
          {
            type: "md-lock",
            name: "password",
            text: "修改密码",
          },
          {
            type: "md-person",
            name: "userinfo",
            text: "基本资料",
          },
        ],
      },
    ],
  },
  mutations: {
    setMenus(state, items) {
      state.menuItemsNormal = [...items];
    },
  },
});

export default store;
