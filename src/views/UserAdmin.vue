<template>
  <div style="padding: 10px;">
    <div style="background: #fff; border-radius: 8px; padding: 10px;font-weight:bold;">
      <el-row style="width: 100%;">
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addVis = true">新增</el-button>
        </el-col>
        <el-col :span="12">
          <div class="el-input" style="width:200px; float: right;">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
          </div>
        </el-col>
      </el-row>
      <br />
      <Table border ref="selection" :columns="columns" :data="users" style="color:#000">
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="changeRole(index)"
          >配置角色</Button>
          <Button type="error" size="small" @click="handleDelete(index)">删除</Button>
        </template>
      </Table>
    </div>
    <!--更改权限对话框-->
    <Modal
      title="用户角色"
      v-model="changemod"
      style=" display: flex;
        align-items: center;
        justify-content: center;"
      @on-ok="submitRole"
    >
      <el-radio-group v-model="user.is_admin">
        <el-radio :label="1">管理员</el-radio>
        <el-radio :label="0">普通用户</el-radio>
      </el-radio-group>
    </Modal>
    <!-- 新增用户对话框 -->
    <Modal
      title="添加用户"
      v-model="addVis"
      style=" display: flex;
        align-items: center;
        justify-content: center;"
      @on-ok="addUser"
    >
      <Form ref="formInline" :model="new_user" inline>
        <FormItem prop="user" label="登录名">
          <Input type="text" placeholder="输入登录名" v-model="new_user.name">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password" label="密码">
          <Input type="password" placeholder="输入密码" v-model="new_user.pass_word">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getAllUsers, addUser, deleteUser, updateUserRole } from "@/apis/user";
export default {
  name: "user_admin",
  data() {
    return {
      addVis: false,
      changemod: false,
      users: [],
      user: {
        id: "",
        is_admin: ""
      },
      new_user: {
        name: "",
        pass_word: ""
      },
      columns: [
        {
          type: "selection",
          width: 40,
          key: "id"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "登录名",
          key: "login_name"
        },
        {
          title: "邮箱",
          key: "mail"
        },
        {
          title: "角色",
          key: "is_admin",
          width: 100
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ]
    };
  },
  created() {
    this.get_User();
  },
  methods: {
    get_User() {
      getAllUsers().then(resp => {
        resp.map(r =>
          r.is_admin == 1 ? (r.is_admin = "管理员") : (r.is_admin = "普通用户")
        );
        this.users = resp;
      });
    },
    changeRole(index) {
      this.user.id = this.users[index].id;

      this.user.is_admin = this.users[index].is_admin == "管理员" ? 1 : 0;
      this.changemod = true;
    },
    submitRole() {
      updateUserRole(this.user).then(resp => {
        if (resp == "ok") {
          this.$message({
            type: "success",
            message: "更新成功!"
          });
          this.get_User();
        }
      });
    },
    addUser() {
      addUser(this.new_user);
      this.get_User();
    },
    handleDelete(index) {
      this.$confirm(
        "确认删除,:" + this.users[index].name + ",是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          deleteUser(this.users[index].id).then(resp => {
            if (resp == "ok") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.get_User();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>
<style scoped></style>
