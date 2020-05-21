<template>
  <div style="padding: 10px;height:100%;">
    <div style="background: #fff; border-radius: 8px; padding: 10px;font-weight:bold;">
      <div>
        <h2>能耗预测</h2>
        <el-card shadow="never">
          <el-form label-width="80px" v-model="form">
            <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="10">
                <el-form-item label="交路号">
                  <el-select placeholder="交路号" v-model="form.route_no">
                    <el-option v-for="item in routing_nos" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="计长">
                  <el-input v-model="form.length"></el-input>
                </el-form-item>
                <el-form-item label="公里标">
                  <el-input
                    placeholder="请输入起始公里标"
                    prefix-icon="el-icon-location-outline"
                    v-model="form.start_mile"
                  ></el-input>
                </el-form-item>
                <el-form-item label="速度">
                  <el-input v-model="form.velocity_begin" placeholder="请输入开始速度"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="牵引重量">
                  <el-input placeholder="请输入牵引重量" type="text" v-model="form.weight"></el-input>
                </el-form-item>
                <el-form-item label="辆数">
                  <el-input v-model="form.numofcars"></el-input>
                </el-form-item>
                <el-form-item label="公里标">
                  <el-input
                    placeholder="请输入终止公里标"
                    prefix-icon="el-icon-location-outline"
                    v-model="form.end_mile"
                  ></el-input>
                </el-form-item>
                <el-form-item label="速度">
                  <el-input v-model="form.velocity_end" placeholder="请输入结束速度"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item>
              <el-button @click="submit" type="primary">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      <div style="background:#eee;padding: 20px" v-show="true">
        <strong>预测结果:{{ pred_res }}</strong>
      </div>
    </div>
  </div>
</template>
<script>
import { getRouteData, predictData } from "@/apis/data";
export default {
  name: "predict",
  data() {
    return {
      form: {
        route_no: "",
        start_mile: "",
        end_mile: "",
        length: "",
        weight: "",
        numofcars: "",
        velocity_begin: "",
        velocity_end: ""
      },
      routing_nos: [],
      pred_res: ""
    };
  },
  created() {
    getRouteData().then(resp => {
      this.routing_nos = resp.data.route;
    });
  },
  methods: {
    submit() {
      console.table(this.form);
      predictData(this.form).then(resp => {
        this.pred_res = resp.data;
      });
    }
  }
};
</script>
