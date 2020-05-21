<template>
  <div style="padding: 10px; ">
    <div style="background: #fff; border-radius: 8px; padding: 10px;height:calc(100vh);">
      <h3>基本资料</h3>
      <!-- 登录名 -->
      <div class="container">
        <div class="box">
          <div class="left_box">
            <span style="font-weight:bold;">登录名(不支持修改)</span>
          </div>
          <div class="right_box">
            <div class="data" v-show="!show1">
              <span>{{ user.login_name }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 名字 -->
      <div class="container">
        <div class="box">
          <div class="left_box">
            <span style="font-weight:bold;">姓名</span>
          </div>
          <div class="right_box">
            <div
              @click="show2 = true"
              style="cursor:pointer"
              v-show="(user.name == '' || user.name == null) && show2 == false"
            >编辑</div>
            <div class="data" v-show="!show2">
              <span>{{ user.name }}</span>
              <div @click="show2 = true" class="editbtn">编辑</div>
            </div>

            <el-form v-show="show2">
              <input type="text" v-model="user.name" />
              <br />
              <el-button
                size="small"
                style="width: 50px;
  height: 24px;padding:0 7px;"
                @click="show2 = false"
              >取消</el-button>
              <el-button
                @click="updateName"
                size="small"
                style="width: 50px;
  height: 24px;padding:0 7px;color:white;background-color:#455A64;"
              >保存</el-button>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 邮箱 -->
      <div class="container">
        <div class="box">
          <div class="left_box">
            <span style="font-weight:bold;">邮箱</span>
          </div>
          <div class="right_box">
            <div
              @click="show3 = true"
              v-show="(user.mail == '' || user.mail == null) && show3 == false"
              style="cursor:pointer"
            >编辑</div>
            <div class="data" v-show="!show3">
              <span>{{ user.mail }}</span>
              <div @click="show3 = true" class="editbtn">编辑</div>
            </div>

            <el-form v-show="show3">
              <input type="text" v-model="user.mail" />
              <br />
              <el-button
                size="small"
                style="width: 50px;
  height: 24px;padding:0 7px;"
                @click="show3 = false"
              >取消</el-button>
              <el-button
                @click="updateMail"
                size="small"
                style="width: 50px;
  height: 24px;padding:0 7px;color:white;background-color:#455A64;"
              >保存</el-button>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 简介 -->
      <div class="container">
        <div class="box">
          <div class="left_box">
            <span style="font-weight:bold;">简介</span>
          </div>
          <div class="right_box">
            <div
              @click="show4 = true"
              v-show="(user.info == '' || user.info == null) && show4 == false"
              style="cursor:pointer"
            >编辑</div>
            <div class="data" v-show="!show4">
              <span>{{ user.info }}</span>
              <div @click="show4 = true" class="editbtn">编辑</div>
            </div>

            <el-form v-show="show4">
              <textarea placeholder="最多输入100字" maxlength="100" v-model="user.info"></textarea>
              <br />
              <el-button
                size="small"
                style="width: 50px;
  height: 24px;padding:0 7px;"
                @click="show4 = false"
              >取消</el-button>
              <el-button
                @click="updateInfo"
                size="small"
                style="width: 50px;
  height: 24px;padding:0 7px;color:white;background-color:#455A64;"
              >保存</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/MyAxios";
export default {
  name: "userinfo",
  data() {
    return {
      user: {
        login_name: "",
        name: "",
        mail: "",
        info: "",
        is_admin: ""
      },
      show1: false,
      show2: false,
      show3: false,
      show4: false
    };
  },
  created() {
    axios.get("/get_user/" + localStorage.getItem("loginName")).then(resp => {
      this.user = resp;
    });
  },
  methods: {
    updateName() {
      let u = {
        code: 1,
        name: this.user.name,
        login_name: this.user.login_name
      };
      axios.post("/update_user_info", u).then(resp => {
        if (resp == "ok") {
          this.$message({
            type: "success",
            message: "更新成功!"
          });
        }
        this.show2 = false;
      });
      localStorage.setItem("userName", this.user.name);
    },
    updateMail() {
      let u = {
        code: 2,
        login_name: this.user.login_name,
        mail: this.user.mail
      };
      axios.post("/update_user_info", u).then(resp => {
        if (resp == "ok") {
          this.$message({
            type: "success",
            message: "更新成功!"
          });
        }
        this.show3 = false;
      });
    },
    updateInfo() {
      let u = {
        code: 3,
        login_name: this.user.login_name,
        info: this.user.info
      };
      axios.post("/update_user_info", u).then(resp => {
        if (resp == "ok") {
          this.$message({
            type: "success",
            message: "更新成功!"
          });
        }
        this.show4 = false;
      });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  font-size: 14px;
}
.box {
  display: flex;
  flex-direction: row;
  height: 60px;
}
.left_box {
  padding-right: 15px;
  width: 100px;
}
.editbtn {
  display: none;
  color: rgb(184, 159, 159);
}
.data {
  width: 200px;
}
.data:hover .editbtn {
  display: inline;
  padding-left: 20px;
  cursor: pointer;
}

input {
  width: 200px;
  height: 32px;
  padding: 0 15px;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 3px;
  outline: none;
  transition: color 0.3s ease 0s, border-color 0.3s ease 0s,
    background 0.3s ease 0s;
  margin-bottom: 10px;
}
input:focus {
  border: 1px solid rgb(20, 20, 20);
}
textarea {
  width: 500px;
  height: 70px;
  font-size: 12px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(224, 224, 224);
  border-image: initial;
  padding: 7px 10px;
  outline: none;
}
</style>
