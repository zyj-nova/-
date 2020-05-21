<template>
  <div style="padding: 10px;">
    <div style="background: #fff; border-radius: 8px; padding: 10px;font-weight:bold">
      <h2>信息查询</h2>
      <div style="border-bottom:1px solid #A9A9A9; padding-top:5px;padding-right:10px;">
        <Form ref="formData" :model="formData" :label-width="120">
          <Row type="flex" justify="space-between">
            <Col span="11">
              <FormItem prop="route_no" label="交路号">
                <Input type="text" v-model="formData.route_no">
                  <Icon type="ios-map" slot="prepend"></Icon>
                </Input>
              </FormItem>

              <FormItem prop="train_no" label="车次">
                <Input type="text" v-model="formData.train_no" clearable>
                  <Icon type="ios-subway" slot="prepend"></Icon>
                </Input>
              </FormItem>

              <FormItem label="司机号" prop="driver_no">
                <Input type="text" clearable v-model="formData.driver_no">
                  <Icon type="ios-man" slot="prepend"></Icon>
                </Input>
              </FormItem>

              <FormItem label="起始时间" prop="start_time">
                <DatePicker
                  type="datetime"
                  confirm
                  placeholder="选择起始时间"
                  style="width:200px"
                  v-model="formData.start_time"
                ></DatePicker>
              </FormItem>
              <FormItem label="牵引重量(kg)" prop="low_weight">
                <Row type="flex">
                  <Col span="11">
                    <FormItem prop="low_weight">
                      <Input v-model="formData.low_weight" />
                    </FormItem>
                  </Col>
                  <Col span="2" style="text-align:center;">-</Col>
                  <Col span="11">
                    <FormItem prop="high_weight">
                      <Input v-model="formData.high_weight" />
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>
            </Col>
            <Col span="11">
              <FormItem label="车站号" prop="station_no">
                <Input type="text" clearable v-model="formData.station_no">
                  <Icon type="md-cog" slot="prepend"></Icon>
                </Input>
              </FormItem>

              <FormItem label="车号" prop="car_no">
                <Input type="text" clearable v-model="formData.car_no">
                  <Icon type="md-bus" slot="prepend"></Icon>
                </Input>
              </FormItem>

              <FormItem label="副司机号" prop="driver_no2">
                <Input type="text" clearable v-model="formData.driver_no2">
                  <Icon type="ios-man-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <FormItem label="终止时间" prop="end_time">
                <DatePicker
                  type="datetime"
                  confirm
                  placeholder="选择终止时间"
                  style="width:200px;"
                  v-model="formData.end_time"
                ></DatePicker>
              </FormItem>
              <FormItem label="速度(km/h)" prop="velocity_flag">
                <Row type="flex" justify="space-around">
                  <Col span="8">
                    <FormItem>
                      <Select v-model="formData.velocity_flag">
                        <Option value="gt">&gt;</Option>
                        <Option value="lt">&lt;</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="15">
                    <FormItem prop="velocity">
                      <Input v-model="formData.velocity" />
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>
            </Col>
            <FormItem>
              <Button type="primary" @click="submitData">查询</Button>&nbsp;
              <Button type="warning" @click="handleReset('formData')">重置</Button>
            </FormItem>
          </Row>
        </Form>
      </div>
    </div>
    <div style="margin-bottom:8px;">
      <Button type="info" style="margin-right:5px;">导出上行</Button>
      <Button type="success">导出下行</Button>
    </div>
    <Table border ref="selection" :columns="columns" :data="showList"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="dataCount" :current="1" @on-change="changePage" :page-size="pageSize"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { getTrainData } from "@/apis/data";
import { formatDate } from "../utils/util.js";
export default {
  name: "t1",
  data() {
    return {
      formData: {
        route_no: "",
        station_no: "",
        train_no: "",
        car_no: "",
        driver_no: "",
        driver_no2: "",
        start_time: null,
        end_time: null,
        low_weight: "",
        high_weight: "",
        velocity: "",
        velocity_flag: ""
      },
      columns: [
        {
          type: "selection",
          width: 50,
          align: "center",
          fixed: "left"
        },
        {
          title: "运行时间",
          width: 115,
          key: "run_time" //"runTime"
        },
        {
          title: "速度",
          width: 70,
          key: "run_speed" //"runSpeed"
        },
        {
          title: "车次",
          width: 80,
          key: "train_no" //"trainNo"
        },
        {
          title: "车号",
          width: 70,
          key: "car_no" //"carNo"
        },
        {
          title: "里程",
          width: 120,
          key: "run_mileage" //"runMileage"
        },
        {
          title: "正向有功",
          width: 100,
          key: "positive_work" //"positiveWork"
        },
        {
          title: "反向有功",
          width: 100,
          key: "negative_work" //"negtiveWork"
        },
        {
          title: "车站号",
          width: 80,
          key: "station_no" //"trainId"
        },
        {
          title: "交路号",
          width: 80,
          key: "routing_no" //"wayNo"
        },
        {
          title: "司机号",
          width: 100,
          key: "driver_no" //"driverNo"
        },
        {
          title: "副司机号",
          width: 100,
          key: "driver_no2" //"driverNo2"
        },
        {
          title: "总重",
          width: 80,
          key: "weight" //"weight"
        },
        {
          title: "计长",
          width: 80,
          key: "length" //"length"
        },
        {
          title: "辆数",
          width: 80,
          key: "num_of_car" //"carNumber"
        },
        {
          title: "手柄级位",
          width: 50,
          key: "handle_level" //"level"
        },
        {
          title: "大闸指令",
          width: 80,
          key: "big_brake_order" //"brakeOrder"
        },
        {
          title: "小闸指令",
          width: 50,
          key: "small_brake_order" // "brakeOrderSmall"
        }
      ],
      totalTableData: [],
      pageSize: 12,
      dataCount: 0,
      showList: []
    };
  },
  mounted() {},
  methods: {
    getData(page = 1) {
      getTrainData(this.formData, page).then(resp => {
        resp.data.map(x => {
          x.run_time = x.run_time.replace("T", " ");
        });
        this.showList = resp.data;
        this.dataCount = resp.count;
      });
    },
    submitData() {
      if (this.formData.start_time instanceof Date) {
        this.formData.start_time = formatDate(this.formData.start_time);
      }

      if (this.formData.end_time instanceof Date) {
        this.formData.end_time = formatDate(this.formData.end_time);
      }
      this.getData();
    },

    changePage(index) {
      this.getData(index);
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped></style>
