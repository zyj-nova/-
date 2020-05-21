<template>
  <div style="padding: 10px;">
    <div style="background: #fff; border-radius: 8px; padding: 10px;font-weight:bold;">
      <div class="query-c">
        <Tabs>
          <TabPane label="总重" icon="ios-calculator">
            <Form :model="form" inline ref="form" :rules="ruleValidate">
              <FormItem label="交路号" prop="route">
                <Select v-model="form.route_no" style="width:200px">
                  <Option v-for="item in routing_nos" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </FormItem>
              <FormItem label="起始时间" prop="start_time">
                <DatePicker
                  type="datetime"
                  placeholder="选择起始时间"
                  v-model="form.start_time"
                  style="width:200px"
                ></DatePicker>
              </FormItem>
              <FormItem label="截止时间" prop="end_time">
                <DatePicker
                  type="datetime"
                  placeholder="选择截止时间"
                  v-model="form.end_time"
                  style="width:200px"
                ></DatePicker>
              </FormItem>
              <FormItem label="起始公里标" prop="start_mile">
                <Input v-model="form.start_mile" type="text" number />
              </FormItem>
              <FormItem label="终止公里标" prop="end_mile">
                <Input v-model="form.end_mile" type="text" number />
              </FormItem>

              <br />
            </Form>
            <Button type="primary" @click="sumit('form')">查询</Button>
            <div class="res">
              <ve-histogram :data="chartData" :extend="chartExtend" :data-empty="dataEmpty"></ve-histogram>
            </div>
          </TabPane>
          <TabPane label="车次" icon="md-train">
            <Form :model="form2" inline>
              <FormItem label="交路号" prop="route">
                <Select v-model="form2.route_no" style="width:200px">
                  <Option v-for="item in routing_nos" :value="item" :key="item">{{ item }}</Option>
                </Select>
              </FormItem>
              <FormItem label="起始时间" prop="start_time">
                <DatePicker
                  type="datetime"
                  confirm
                  placeholder="选择起始时间"
                  v-model="form2.start_time"
                  style="width:200px"
                ></DatePicker>
              </FormItem>
              <FormItem label="截止时间" prop="end_time">
                <DatePicker
                  type="datetime"
                  confirm
                  placeholder="选择截止时间"
                  v-model="form2.end_time"
                  style="width:200px"
                ></DatePicker>
              </FormItem>
              <FormItem label="起始公里标" prop="start_mile">
                <Input v-model="form2.start_mile" type="text" number />
              </FormItem>
              <FormItem label="终止公里标" prop="end_time">
                <Input v-model="form2.end_mile" type="text" number />
              </FormItem>

              <br />
            </Form>
            <Button type="primary" @click="submit2">查询</Button>
            <div class="res">
              <ve-histogram :data="chartData2" :extend="chartExtend2" :data-empty="dataEmpty2"></ve-histogram>
            </div>
          </TabPane>
          <TabPane label="不同交路对比" icon="md-crop">
            <Form :model="form3" inline>
              <FormItem label="起始时间" prop="start_time">
                <DatePicker
                  type="datetime"
                  confirm
                  placeholder="选择起始时间"
                  v-model="form3.start_time"
                  style="width:200px"
                ></DatePicker>
              </FormItem>
              <FormItem label="截止时间" prop="end_time">
                <DatePicker
                  type="datetime"
                  confirm
                  placeholder="选择截止时间"
                  v-model="form3.end_time"
                  style="width:200px"
                ></DatePicker>
              </FormItem>
              <FormItem label="起始公里标" prop="start_mile">
                <Input v-model="form3.start_mile" type="text" number />
              </FormItem>
              <FormItem label="终止公里标" prop="end_time">
                <Input v-model="form3.end_mile" type="text" number />
              </FormItem>
            </Form>
            <Button type="primary" @click="submit3">查询</Button>
            <div class="res">
              <ve-histogram :data="chartData3" :extend="chartExtend3" :data-empty="dataEmpty3"></ve-histogram>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getRouteData,
  analysisDataByWeight,
  analysisDataByTrain,
  analysisDataByRoute
} from "@/apis/data";
import { formatDate } from "@/utils/util";
import "v-charts/lib/style.css";
export default {
  name: "analysis",
  data() {
    const judgeMile = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("公里标不能为空"));
      }
      if (Number.isInteger(value) == false) {
        callback(new Error("请输入整数"));
      } else {
        if (value < 0) {
          callback(new Error("请输入大于0的数"));
        } else {
          callback();
        }
      }
    };
    const judgeDate = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("日期不可为空"));
      }
      if (this.form.start_date != "" || this.form.end_date != "") {
        if (this.form.start_time > this.form.end_time) {
          callback(new Error("开始日期不可以大于结束日期"));
        } else {
          callback();
        }
      }
    };
    return {
      form: {
        route_no: "",
        start_time: "",
        end_time: "",
        start_mile: "",
        end_mile: "",
        type: "weight"
      },
      form2: {
        route_no: "",
        start_time: "",
        end_time: "",
        start_mile: "",
        end_mile: "",
        type: "train_no"
      },
      form3: {
        start_time: "",
        end_time: "",
        start_mile: "",
        end_mile: ""
      },
      routing_nos: [],
      chartData: {
        columns: ["总重", "总功耗"],
        rows: []
      },

      chartSettings: {
        dimension: ["总重"],
        metrics: ["总功耗"]
      },
      chartExtend: {
        series: {
          barWidth: 30
        },
        xAxis: {
          name: "总重"
        }
      },
      chartData2: {
        columns: ["车次", "总功耗"],
        rows: []
      },
      chartData3: {
        columns: ["交路", "总功耗"],
        rows: []
      },
      chartExtend2: {
        series: {
          barWidth: 30
        },
        xAxis: {
          name: "车次"
        }
      },
      chartExtend3: {
        series: {
          barWidth: 30
        },
        xAxis: {
          name: "交路"
        }
      },
      chartSettings2: {
        dimension: ["车次"],
        metrics: ["总功耗"]
      },
      chartSettings3: {
        dimension: ["交路"],
        metrics: ["总功耗"]
      },
      dataEmpty: true,
      dataEmpty2: true,
      dataEmpty3: true,

      ruleValidate: {
        route_no: [
          { required: true, message: "交路号不可为空", trigger: "change" }
        ],
        start_time: [
          {
            required: true,
            type: "date",
            validator: judgeDate,
            trigger: "change"
          }
        ],
        end_time: [
          {
            required: true,
            type: "date",
            validator: judgeDate,
            trigger: "change"
          }
        ],
        start_mile: [
          {
            required: true,
            validator: judgeMile,
            trigger: "blur"
          }
        ],
        end_mile: [{ required: true, validator: judgeMile, trigger: "blur" }]
      }
    };
  },
  created() {
    getRouteData().then(resp => {
      this.routing_nos = resp.data.route;
    });
  },
  methods: {
    sumit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.form.start_time instanceof Date) {
            this.form.start_time = formatDate(this.form.start_time);
          }
          if (this.form.end_time instanceof Date) {
            this.form.end_time = formatDate(this.form.end_time);
          }
          analysisDataByWeight(this.form).then(
            resp => {
              if (resp) {
                this.dataEmpty = false;
                let list = [];
                for (let key in resp.data) {
                  let tmp = { 总重: key, 总功耗: resp.data[key] };
                  list.push(tmp);
                }
                this.chartData.rows = list;
              }
            },
            erro => {
              let code = erro.response.status;
              if (code == 500) {
                this.dataEmpty = true;
              }
            }
          );
        } else {
          this.$Message.error("请完成必选项");
        }
      });
    },
    submit2() {
      if (this.form2.start_time instanceof Date) {
        this.form2.start_time = formatDate(this.form2.start_time);
      }
      if (this.form2.end_time instanceof Date) {
        this.form2.end_time = formatDate(this.form2.end_time);
      }
      analysisDataByTrain(this.form2).then(
        resp => {
          if (resp) {
            this.dataEmpty2 = false;
            let list = [];
            for (let key in resp.data) {
              let tmp = { 车次: key, 总功耗: resp.data[key] };
              list.push(tmp);
            }
            this.chartData2.rows = list;
          }
        },
        erro => {
          let code = erro.response.status;
          if (code == 500) {
            this.dataEmpty = true;
          }
        }
      );
    },
    submit3() {
      if (this.form3.start_time instanceof Date) {
        this.form3.start_time = formatDate(this.form3.start_time);
      }
      if (this.form3.end_time instanceof Date) {
        this.form3.end_time = formatDate(this.form3.end_time);
      }
      analysisDataByRoute(this.form3).then(
        resp => {
          if (resp) {
            this.dataEmpty3 = false;
            let list = [];
            for (let key in resp.data) {
              let tmp = { 交路: key, 总功耗: resp.data[key] };
              list.push(tmp);
            }
            this.chartData3.rows = list;
          }
        },
        erro => {
          let code = erro.response.status;
          if (code == 500) {
            this.dataEmpty = true;
          }
        }
      );
    }
  }
};
</script>
<style scoped></style>
