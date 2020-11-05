<template>
  <div>
    <template>
      <div>
        <el-row class="mr20">
          <el-col :span="24">
            <span class="float-left ml20 mt20">订单管理</span>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="float-left">
            <el-input class="ml20 mt20" v-model="searchParams.mobile" placeholder="下单手机号"></el-input>
          </div>
          <div class="float-left ml20">
            <el-input class="ml20 mt20" v-model="searchParams.orderNo" placeholder="订单编号"></el-input>
          </div>
          <div class="float-left ml20">
            <el-input class="ml20 mt20" v-model="searchParams.thirdOrderNo" placeholder="外部订单编号"></el-input>
          </div>
          <div class="float-left ml20">
            <el-select
              class="ml20 mt20"
              v-model="searchParams.orderStatus"
              clearable
              placeholder="状态"
            >
              <el-option
                v-for="item in orderStatusOptions"
                :key="item.orderStatusId"
                :label="item.orderStatusName"
                :value="item.orderStatusId"
              ></el-option>
            </el-select>
          </div>
          <div class="float-left ml20">
            <el-select
              class="ml20 mt20"
              v-model="searchParams.channel"
              clearable
              placeholder="渠道来源"
            >
              <el-option
                v-for="item in channelOptions"
                :key="item.channelId"
                :label="item.channelName"
                :value="item.channelId"
              ></el-option>
            </el-select>
          </div>
          <!-- <div v-if="showSort" class="float-right mr20">
                <el-select 
                    v-model="searchParams.sortValue"
                    @change="sortSelect(searchParams.sortValue)"
                    class="select" placeholder="默认排序">
                    <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
          </div>-->
        </el-col>
        <el-col>
          <div class="float-left ml20 w240">
            <el-date-picker
              v-model="searchParams.orderStartTime"
              type="datetime"
              placeholder="开始时间"
              class="w240 mt20"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
          <div class="float-left ml20 w240">
            <el-date-picker
              v-model="searchParams.orderEndTime"
              type="datetime"
              placeholder="结束时间"
              class="w240 mt20"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
          <div class="float-left w120">
            <el-button class="mt20" @click="searchClick">确定</el-button>
          </div>
        </el-col>
        <el-col>
          <div class="float-left ml20">
            <el-button class="mt20" type="primary" @click="downLoad">下载数据</el-button>
          </div>
          <div class="float-left ml20">
            <el-button class="mt20" type="primary" @click="deliver">批量发货</el-button>
          </div>
          <div class="float-left ml20">
            <el-button class="mt20" type="primary" @click="waitDelivery">截单待发</el-button>
          </div>
        </el-col>
      </el-row>
      <div style="margin-top:20px">
        <el-table :data="labelDataTable" @selection-change="handleSelectionChange">
          <!-- <el-table-column prop="categoryCode" label="分类编码" min-width="80" align="center"></el-table-column> -->
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="orderNo" label="订单编号" min-width="80" align="center"></el-table-column>
          <el-table-column prop="thirdOrderNo" label="外部订单编号" min-width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="收货人姓名" min-width="80" align="center"></el-table-column>
          <el-table-column prop="mobile" label="手机号" min-width="80" align="center"></el-table-column>
          <el-table-column
            prop="orderTime"
            sortable="custom"
            label="下单时间"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="deliveredTime"
            sortable="custom"
            label="发货时间"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column prop="orderStatusName" label="状态" min-width="80" align="center"></el-table-column>
          <!-- <el-table-column prop="categoryStatusDesc" label="分类状态" min-width="80" align="center"></el-table-column> -->
          <!-- <el-table-column prop="statusName" label="任务状态" min-width="80" align="center">
          </el-table-column>-->
          <el-table-column prop="operation" label="操作" min-width="80" align="center">
            <template slot-scope="scope" style="text-align:center">
              <div style="display:flex;justify-content: center">
                <!-- <el-button
                  v-if="scope.row.categoryStatus === 0"
                  type="text"
                  v-model="scope.row.categoryStatusDesc"
                  @click="statusChange(scope.$index,scope.row)"
                >启用</el-button>
                <el-button
                  v-else-if="scope.row.categoryStatus === 1"
                  type="text"
                  v-model="scope.row.categoryStatusDesc"
                  @click="statusChange(scope.$index,scope.row)"
                >禁用</el-button>
                <el-button
                  v-else
                  type="text"
                  v-model="scope.row.categoryStatusDesc"
                  @click="statusChange(scope.$index,scope.row)"
                >启用</el-button>-->
                <!-- <el-button
                                    type="text"
                                    @click="cityConfig(scope.$index,scope.row)">配置城市
                                </el-button>
                                <el-dialog title="城市配置" :visible.sync="dialogCityVisible">
                                    <el-row>
                                        <el-col :span="24" v-for="item in cityList" :key="item.value">
                                            <el-checkbox v-model="item.hasCheck"  class="mt10" :label="item.cityName" :checked="item.hasCheck" :key="item.cityCode" @change="checkCity(item)">
                                            </el-checkbox>
                                        </el-col>
                                    <el-button class="mt20" @click="cityCommit()">确认</el-button>
                                    </el-row>
                </el-dialog>-->
                <!-- <el-button class="ml10" type="text" @click="labelCheck(scope.$index,scope.row)">查看</el-button> -->
                <!-- v-if="scope.row.categoryStatus === 0" -->
                <el-button type="text" @click="labelCheck(scope.$index,scope.row)">查看</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="categoryDesc" label min-width="80" align="center">
            <template slot-scope="slot_scope" style="text-align:center">
              <div style="display:flex;justify-content: center">
                <el-button
                  v-if="slot_scope.row.orderStatus != 1 && slot_scope.row.orderStatus !=-1 && slot_scope.row.refundStatus != 0  && slot_scope.row.refundStatus != 1
                   && slot_scope.row.orderStatus != 6 && slot_scope.row.orderStatus != 7 "
                  type="text"
                  @click="saleRefund(slot_scope.$index,slot_scope.row)"
                >售后退款</el-button>
                <el-dialog title="售后退款" :visible.sync="saleRefundVisible">
                  <el-row>
                    <el-form ref="tableForm" :model="tableForm" label-width="120px" :rules="rules">
                      <el-form-item label="退款金额" prop="refundAmt">
                        <el-input v-model="tableForm.refundAmt" class="w240" placeholder="退款金额"></el-input>
                      </el-form-item>
                      <el-form-item label="退款原因" prop="refundReason">
                        <el-input
                          type="textarea"
                          v-model="tableForm.refundReason"
                          class="w240"
                          placeholder="退款原因"
                        ></el-input>
                      </el-form-item>

                      <el-form-item class="text-center">
                        <el-button type="primary" @click="submitForm('tableForm')" class="mt20">提交</el-button>
                        <el-button type="primary" @click="cancel()" class="mt20">取消</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                      </el-form-item>
                    </el-form>
                    <!-- <el-button class="mt20" type="primary"  @click="cityCommit()">确认</el-button>
                    <el-button class="mt20" type="danger" @click="cityCommit()">取消</el-button>-->
                  </el-row>
                </el-dialog>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="logistic" label="快递公司" min-width="100" align="center">
            <template slot-scope="slot_scope" style="text-align:center">
              <div style="display:flex;justify-content: center">
                <el-input class="ml20 mt20" v-model="slot_scope.row.logistic" placeholder="快递公司"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mailNo" label="快递单号" min-width="140" align="center">
            <template slot-scope="slot_scope" style="text-align:center">
              <div style="display:flex;justify-content: center">
                <el-input class="ml20 mt20" v-model="slot_scope.row.mailNo" placeholder="快递单号"></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="foot-page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchParams.page"
          :page-sizes="[10,20, 30, 50, 100]"
          :page-size="searchParams.pageSize"
          layout="total, prev, pager,next,sizes,jumper "
          :total="totalSize"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
import labelsClassificationService from "../../service/categoryManagement/orderManagement.js";

export default {
  data() {
    return {
      orderStatusOptions: [],
      channelOptions: [],
      secondTypeOptions: [],
      showSort: false,
      cityList: [],
      saleRefundVisible: false,
      multipleSelection: [],
      selectedIDs: [],
      orderNoList: [],
      waitDeliveryParams: {
        orderNoList: []
      },
      commonCity: {
        cityCode: "",
        cityName: "通用",
        hasCheck: false
      },
      tableForm: {
        orderNo: "",
        refundAmt: "",
        refundReason: ""
      },
      searchParams: {
        mobile: "",
        channel: "",
        categoryName: "",
        orderNo: "",
        orderStartTime: "",
        orderEndTime: "",
        page: 1,
        pageSize: 10
      },
      statusChangeParams: {
        categoryId: 0,
        categoryStatus: 0
      },
      labelDataTable: [],
      totalSize: 0,
      rules: {
        refundAmt: [
          { required: true, message: "请输入退款金额", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        refundReason: [
          { required: true, message: "请输入退款原因", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getStatus();
    this.getChannel();
    this.getTableList();
  },
  methods: {
    cancel() {
      this.saleRefundVisible = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("multipleSelection", this.multipleSelection);
      let ids = [];
      let orderNos = [];
      this.multipleSelection.map(item => {
        ids.push(item);
        orderNos.push(item.orderNo);
      });
      this.selectedIDs = ids;
      this.orderNoList = orderNos;
      console.log("多选", this.selectedIDs);
    },

    deliver() {
      const array = this.selectedIDs;
      let isCheck = true;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (
          element.logistic &&
          element.logistic != "" &&
          element.mailNo &&
          element.mailNo != ""
        ) {
        } else {
          isCheck = false;
        }
      }
      if (isCheck) {
        const data = this.handparams(array);
        if (array.length != 0) {
          labelsClassificationService.deliver(data).then(
            response => {
              if (response.code) {
                if (response.code === "20000") {
                  this.getTableList();
                } else {
                  this.$message.error(
                    response.message ||
                      response.sub_msg ||
                      response.msg ||
                      "服务器未返回数据!"
                  );
                }
              } else {
                this.$message.error(
                  response.message ||
                    response.sub_msg ||
                    response.msg ||
                    "服务器未返回数据!"
                );
              }
            },
            response => {
              this.$message.error(
                response.message ||
                  response.sub_msg ||
                  response.msg ||
                  "请求服务器失败!"
              );
            }
          );
        } else {
          this.$message.error("请先选择订单!");
        }
      } else {
        this.$message.error("请填写完整选中订单的快递公司和快递单号!");
      }
    },
    downLoad() {
      this.waitDeliveryParams.orderNoList = this.orderNoList;
      let orderNos = "";
      this.waitDeliveryParams.orderNoList.forEach(element => {
        orderNos = element + "," + orderNos;
      });
      if (orderNos != "") {
        orderNos = orderNos.substring(0, orderNos.length - 1);
      }
      // const url = `${host}operation-order/mallOrder/orderExport?orderNos=${orderNos}`;
      //   this.$router.push(url)
      // console.log("Nos====="+orderNos);
      // const data = this.handparams(this.waitDeliveryParams);
      if (this.orderNoList.length != 0) {
        labelsClassificationService.downLoad(orderNos);
        //   labelsClassificationService.downLoad(orderNos).then(
        //     response => {
        //       if (response.code) {
        //         if (response.code === "20000") {
        //           // this.getTableList();
        //         } else {
        //           this.$message.error(
        //             response.message ||
        //               response.sub_msg ||
        //               response.msg ||
        //               "服务器未返回数据!"
        //           );
        //         }
        //       } else {
        //         this.$message.error(
        //           response.message ||
        //             response.sub_msg ||
        //             response.msg ||
        //             "服务器未返回数据!"
        //         );
        //       }
        //     },
        //     response => {
        //       this.$message.error(
        //         response.message ||
        //         response.sub_msg ||
        //           response.msg ||
        //           "请求服务器失败!"
        //       );
        //     }
        //   );
      } else {
        this.$message.error("请先选择订单!");
      }
    },
    waitDelivery() {
      this.waitDeliveryParams.orderNoList = this.orderNoList;
      const data = this.handparams(this.waitDeliveryParams);
      if (this.orderNoList.length != 0) {
        labelsClassificationService.waitDelivery(data).then(
          response => {
            if (response.code) {
              if (response.code === "20000") {
                this.getTableList();
              } else {
                this.$message.error(
                  response.message ||
                    response.sub_msg ||
                    response.msg ||
                    "服务器未返回数据!"
                );
              }
            } else {
              this.$message.error(
                response.message ||
                  response.sub_msg ||
                  response.msg ||
                  "服务器未返回数据!"
              );
            }
          },
          response => {
            this.$message.error(
              response.message ||
                response.sub_msg ||
                response.msg ||
                "请求服务器失败!"
            );
          }
        );
      } else {
        this.$message.error("请先选择订单!");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.refundReason();
        } else {
          //console.log('提交失败!!')
          return false;
        }
      });
    },
    refundReason() {
      // console.log("order===",this.tableForm.orderNo);
      const data = this.handparams(this.tableForm);
      labelsClassificationService.refundReason(data).then(
        response => {
          if (response.code === "20000") {
            this.saleRefundVisible = false;
            this.getTableList();
          } else {
            this.$message.error(
              response.message ||
                response.sub_msg ||
                response.msg ||
                "服务器未返回数据!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message ||
              response.sub_msg ||
              response.msg ||
              "请求服务器失败!"
          );
        }
      );
    },
    //点击搜索
    searchClick() {
      // console.debug('搜索点击')
      this.searchParams.page = 1;
      this.getTableList();
    },

    // 查看
    labelCheck(index, row) {
      // console.debug('id===',row.id)
      this.$router.push({
        name: "orderDetails",
        query: { index: index, id: row.orderNo }
      });
    },

    saleRefund(index, row) {
      console.log("row.orderNo====", row.orderNo);
      this.tableForm.orderNo = row.orderNo;
      this.saleRefundVisible = true;
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.searchParams.page = val;
      // console.debug('CurrentChange==',val)
      this.getTableList();
    },
    getStatus() {
      labelsClassificationService.getStatus().then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              const array = response.data;
              this.orderStatusOptions = array;
            } else {
              this.orderStatusOptions = [];
            }
          } else {
            this.$message.error(
              response.message ||
                response.sub_msg ||
                response.msg ||
                "服务器未返回数据!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message ||
              response.sub_msg ||
              response.msg ||
              "请求服务器失败!"
          );
        }
      );
    },
    getChannel() {
      labelsClassificationService.getChannel().then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              const array = response.data;
              this.channelOptions = array;
            } else {
              this.channelOptions = [];
            }
          } else {
            this.$message.error(
              response.message ||
                response.sub_msg ||
                response.msg ||
                "服务器未返回数据!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message ||
              response.sub_msg ||
              response.msg ||
              "请求服务器失败!"
          );
        }
      );
    },
    // 获取列表
    getTableList() {
      const data = this.handparams(this.searchParams);
      labelsClassificationService.getTableList(data).then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              const array = response.data;
              this.labelDataTable = array;
            } else {
              this.labelDataTable = [];
            }
            this.totalSize = response.totalSize || 0;
          } else {
            this.$message.error(
              response.message ||
                response.sub_msg ||
                response.msg ||
                "服务器未返回数据!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message ||
              response.sub_msg ||
              response.msg ||
              "请求服务器失败!"
          );
        }
      );
    },
    //参数处理
    handparams(param) {
      const params = JSON.parse(JSON.stringify(param));
      for (const i in params) {
        if (params[i] === "") {
          delete params[i];
        }
      }
      // console.log("data===" + JSON.stringify(params))
      return params;
    }
  }
};
</script>
<style lang="scss" scoped>
.foot-page {
  float: right;
  margin-top: 10px;
  margin-bottom: 50px;
}
.select {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  line-height: 40px;
  outline: none;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 160px;
  margin-right: 20px;
  margin-top: 20px;
}
</style>

