<template>
  <div style="padding: 10px">
    <div style="background: #fff; border-radius: 8px; padding: 20px;">
      <div class="query-c">
        <h2>文件上传</h2>
        <br />

        <el-upload
          multiple
          class="upload-demo"
          ref="upload"
          action
          :file-list="fileList"
          :auto-upload="false"
          :http-request="uploadFile"
        >
          <el-button slot="trigger" size="large" type="primary" icon="el-icon-upload">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="large"
            type="success"
            @click="submitUpload"
          >上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">能上传csv/txt/excel文件，且单个文件大小不超过10M</div>
        </el-upload>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import axios from "@/utils/MyAxios";
export default {
  name: "home",
  data() {
    return {
      obj: null,
      fileList: [],
      loadingStatus: false
    };
  },
  created() {
    // axios.get("/login").then(resp => {
    //   this.obj = resp;
    //   console.log(this.obj);
    // });
  },
  methods: {
    uploadFile(files) {
      let name = files.file.name;
      if (name.split(".")[1] != "csv" || name.split(".")[1] != "txt") {
        this.$message.error("错误的文件类型，请重新选择");
        return;
      }
      let formData = new FormData();
      formData.append("file", files.file);
      axios
        .post("/save/", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(resp => {
          if (resp == "ok") {
            this.fileList = [];
            this.$message({
              message: "上传成功",
              type: "success"
            });
          } else {
            this.$message.error("未知错误，请重试");
          }
        });
    },
    submitUpload() {
      this.$refs.upload.submit();
    }
  }
};
</script>

<style scoped></style>
