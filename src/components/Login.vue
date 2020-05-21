<template>
  <div class="login-vue">
    <div class="container">
      <p class="title">登录</p>
      <div class="input-c">
        <Input
          prefix="ios-contact"
          v-model="account"
          placeholder="用户名"
          clearable
          @on-blur="verifyAccount"
        />
        <p class="error">{{ accountError }}</p>
      </div>
      <div class="input-c">
        <Input
          type="password"
          v-model="pwd"
          prefix="md-lock"
          placeholder="密码"
          clearable
          @on-blur="verifyPwd"
        />
        <p class="error">{{ pwdError }}</p>
      </div>
      <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登录</Button>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/MyAxios";
export default {
  name: "login",
  data() {
    return {
      account: "",
      pwd: "",
      accountError: "",
      pwdError: "",
      isShowLoading: false
    };
  },
  created() {},
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    verifyAccount() {
      if (this.account === "") {
        this.accountError = "账号不能为空";
      } else {
        this.accountError = "";
      }
    },
    verifyPwd() {
      if (this.pwd === "") {
        this.pwdError = "密码不能为空";
      } else {
        this.accountError = "";
      }
    },
    register() {},
    forgetPwd() {},
    submit() {
      let user = { name: this.account, password: this.pwd };
      axios.post("/login", user).then(resp => {
        if (resp.data.code == "200" || resp.code == "200") {
          //token存在登录成功
          this.isShowLoading = true;
          // 登陆成功 设置用户信息
          localStorage.setItem("userImg", "../assets/user.jpg");
          localStorage.setItem("userName", resp.data.name);
          // 登陆成功 假设这里是后台返回的 token
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("loginName", resp.data.login_name);
          localStorage.setItem("is_admin", resp.data.is_admin);
          this.$router.push({ path: this.redirect || "/" });
        } else {
          this.pwdError = "账号或密码错误";
          this.accountError = "账号或密码错误";
        }
      });
    }
  }
};
</script>

<style>
.login-vue {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 145px auto;
  width: 350px;
  /* padding: 35px 35px 15px 35px; */
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-vue .container {
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
  border-radius: 10px;
  padding: 30px;
}
.login-vue .ivu-input {
  /* background-color: transparent; */
  color: #000;
  outline: #fff;
  border-color: #3cf;
}
.login-vue ::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(223, 208, 208, 0.89);
}
.login-vue :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(223, 208, 208, 0.89);
}
.login-vue ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(223, 208, 208, 0.89);
}
.login-vue :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(223, 208, 208, 0.89);
}
.login-vue .title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
}
.login-vue .input-c {
  margin: auto;
  width: 200px;
}
.login-vue .error {
  color: red;
  text-align: left;
  margin: 5px auto;
  font-size: 12px;
  padding-left: 30px;
  height: 20px;
}
.login-vue .submit {
  width: 200px;
}
.login-vue .account {
  margin-top: 30px;
}
.login-vue .account span {
  cursor: pointer;
}
/* .login-vue .ivu-icon {
  color: #eee;
} */
.login-vue .ivu-icon-ios-close-circle {
  color: #777;
}
</style>
