<template>
  <div style="padding: 10px">
    <div style="background: #fff; border-radius: 8px; padding: 10px;">
      <div class="query-c">
        <h2>能耗计算</h2>
        <div style="font-weight:bold;">
          <el-card shadow="never">
            <el-form :inline="true" label-width="80px" v-model="form">
              <el-form-item label="交路号">
                <el-select placeholder="交路号" v-model="form.routing_no" @change="handle_route">
                  <el-option v-for="item in routing_nos" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="公里标">
                <el-input
                  placeholder="请输入起始公里标"
                  prefix-icon="el-icon-location-outline"
                  v-model="form.start_mile"
                ></el-input>
              </el-form-item>
              <el-form-item label="公里标">
                <el-input
                  placeholder="请输入终止公里标"
                  prefix-icon="el-icon-location-outline"
                  v-model="form.end_mile"
                ></el-input>
              </el-form-item>
              <el-form-item label="车次">
                <el-select placeholder="车次" v-model="form.train_no" @change="handle_weight">
                  <el-option v-for="item in train_nos" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="时间区间">
                <el-date-picker v-model="form.start_time" type="datetime" placeholder="开始日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="时间区间">
                <el-date-picker v-model="form.end_time" type="datetime" placeholder="结束日期"></el-date-picker>
              </el-form-item>
              <el-tag type="warning" size="medium">时间区间可选</el-tag>
              <el-form-item label="牵引重量">
                <el-switch v-model="setWeight" active-text="设置重量" inactive-text="取消设置"></el-switch>
              </el-form-item>

              <el-form-item label="牵引重量" v-show="setWeight">
                <el-select placeholder="请选择牵引重量" v-model="form.weight">
                  <el-option v-for="item in weight_list" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <br />
              <el-form-item>
                <el-button @click="submit" type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
        <div style="background:#eee;padding: 20px">
          <strong>单耗</strong>
          <h3>{{ energy_res }} kW·h</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/utils/MyAxios";
import { formatDate } from "@/utils/util";
export default {
  name: "energy_cal",
  data() {
    return {
      form: {
        routing_no: "",
        start_mile: 0,
        end_mile: 0,
        train_no: "",
        start_time: null,
        end_time: null,
        weight: ""
      },
      setWeight: false,
      energy_res: null,
      train_nos: [],
      routing_nos: [],
      weight_list: []
    };
  },
  created() {
    axios.get("/query/route").then(resp => {
      this.routing_nos = resp.data.route;
      // this.train_nos = resp.data.train;
    });
  },
  methods: {
    handle_route(value) {
      this.train_nos = [];
      axios.get("/query/" + value).then(resp => {
        this.train_nos = resp.data.train;
      });
    },
    //根据所选车次查出牵引重量
    handle_weight(value) {
      this.weight_list = [];
      axios.get("/weight/" + value).then(resp => {
        this.weight_list = resp.data.weight;
      });
    },
    submit() {
      if (this.form.start_time instanceof Date) {
        this.form.start_time = formatDate(this.form.start_time);
      }
      if (this.form.end_time instanceof Date) {
        this.form.end_time = formatDate(this.form.end_time);
      }
      axios.post("/cal/", this.form).then(resp => {
        this.energy_res = resp.data;
      });
    }
  }
};
</script>
<style scoped></style>
