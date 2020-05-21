<template>
  <div style="padding: 10px;">
    <div style="background: #fff; border-radius: 8px; padding: 10px;">
      <h2>密码设置</h2>
      <Form
        ref="formCustom"
        :model="formCustom"
        :rules="ruleCustom"
        :label-width="75"
        style="margin-top:25px;font-weight:bold;"
      >
        <FormItem label="原密码" prop="originPass">
          <Input type="password" v-model="formCustom.originPass"></Input>
        </FormItem>
        <FormItem label="新密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck"></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { updatePass, confirmPass } from "@/apis/user";
export default {
  name: "password",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再输入一次新密码"));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    const validateOriginPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("原密码不可以为空"));
      }
      let u = {
        name: localStorage.getItem("loginName"),
        passwd: value
      };

      confirmPass(u).then(resp => {
        if (resp == "erro") {
          callback(new Error("原密码错误"));
        } else {
          callback();
        }
      });
    };

    return {
      formCustom: {
        passwd: "",
        passwdCheck: "",
        originPass: ""
      },
      ruleCustom: {
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        originPass: [{ validator: validateOriginPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let u = {
            login_name: localStorage.getItem("loginName"),
            password: this.formCustom.passwd
          };
          updatePass(u).then(resp => {
            if (resp == "ok") {
              this.$Message.success("修改成功!");
            } else {
              this.$Message.error("发生错误，请重试!");
            }
          });
          this.formCustom.passwd = "";
          this.formCustom.passwdCheck = "";
          this.formCustom.originPass = "";
        } else {
          this.$Message.error("请填写完整信息!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.box {
  display: flex;
  flex-direction: row;
  border: 1px solid #fbc;
}
</style>
