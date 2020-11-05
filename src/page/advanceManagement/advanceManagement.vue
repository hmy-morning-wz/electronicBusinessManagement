<template>
  <div>
    <template>
      <div>
        <el-row class="mr20">
          <el-col :span="24">
            <span class="float-left ml20 mt20">预售活动管理</span>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="float-left">
            <el-input class="ml20 mt20" v-model="searchParams.name" placeholder="活动名称"></el-input>
          </div>
          <div class="float-left ml10 w240">
            <el-select class="ml20 mt20" v-model="searchParams.status" clearable placeholder="状态">
              <el-option
                v-for="item in statusOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col>
          <div class="float-left ml20 w240">
            <el-date-picker
              v-model="searchParams.gmtPerSaleStartStart"
              type="datetime"
              placeholder="预售开始时间-起"
              class="w240 mt20"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions0"
            ></el-date-picker>
          </div>
          <div class="float-left ml20 w240">
            <el-date-picker
              type="datetime"
              v-model="searchParams.gmtPerSaleStartEnd"
              placeholder="预售开始时间-止"
              class="w240 mt20"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions1"
            ></el-date-picker>
          </div>

          <div class="float-left w120">
            <el-button class="mt20" @click="searchClick">确定</el-button>
          </div>
        </el-col>
        <el-col>
          <div class="float-left ml20">
            <el-button class="mt20" type="primary" @click="newAdd">新建活动</el-button>
          </div>
          <!-- <div class="float-left ml20">
            <el-button class=" mt20" type="danger" @click="deleteClick">删除</el-button>
          </div>-->
        </el-col>
      </el-row>
      <div style="margin-top:20px">
        <el-table
          :data="labelDataTable"
          
        ><!-- @selection-change="handleSelectionChange"
          @sort-change="sortChange" -->
          <!-- <el-table-column prop="categoryCode" label="分类编码" min-width="80" align="center"></el-table-column> -->
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="id" label="活动ID" min-width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="活动名称" min-width="80" align="center"></el-table-column>
          <!-- <el-table-column prop="categoryName" label="类目" min-width="80" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" min-width="80" align="center"></el-table-column>
          <el-table-column prop="supplierId" label="供应商" min-width="80" align="center"></el-table-column>-->
          <el-table-column
            prop="gmtCreate"
            sortable="custom"
            label="创建时间"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gmtPerSaleStart"
            sortable="custom"
            label="预售开始时间"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gmtActivityEnd"
            sortable="custom"
            label="尾款结束时间"
            min-width="80"
            align="center"
          ></el-table-column>
          <el-table-column prop="statusName" label="状态" min-width="80" align="center"></el-table-column>
          <!-- <el-table-column prop="categoryStatusDesc" label="分类状态" min-width="80" align="center"></el-table-column> -->
          <!-- <el-table-column prop="name" label="任务状态" min-width="80" align="center">
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
                <el-button type="text" @click="checkDetail(scope.$index,scope.row)">查看</el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status != 4"
                  @click="updateDetail(scope.$index,scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status === 1 || scope.row.status === 5"
                  @click="updateStatus(scope.$index,scope.row,1)"
                >上线</el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status === 2 || scope.row.status === 3"
                  @click="updateStatus(scope.$index,scope.row,0)"
                >下线</el-button>
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
import labelsClassificationService from "../../service/categoryManagement/advanceManagement.js";
// import categoryManagementService from "../../service/categoryManagement/categoryManagement.js"
export default {
  data() {
    return {
      leafOneOptions: [],
      leafTwoOptions: [],
      leafThreeOptions: [],
      statusOptions: [],
      searchParams: {
        name: "",

        status: "",

        gmtPerSaleStartStart: "",
        gmtPerSaleStartEnd: "",
        page: 1,
        pageSize: 10
      },
      multipleSelection: [],
      selectedIDs: [],

      statusChangeParams: {
        id: "",
        status: "",
        operation: ""
      },
      labelDataTable: [],
      totalSize: 0,
      pickerOptions0: {
            disabledDate: (time) => {
              
                if (this.searchParams.gmtPerSaleStartEnd && this.searchParams.gmtPerSaleStartEnd != "") {
                  
                    return  time.getTime() > new Date(this.searchParams.gmtPerSaleStartEnd.replace(/-/g, '/')).getTime() ;
                } else {
                 
                    return false;
                }

            }
        },
        pickerOptions1: {
            disabledDate: (time) => {
              if (this.searchParams.gmtPerSaleStartStart && this.searchParams.gmtPerSaleStartStart != "") {
                return time.getTime() < new Date(this.searchParams.gmtPerSaleStartStart.replace(/-/g, '/')).getTime() ;
              }else {
                return false ;
              }
                
            }
        }
    };
  },
  created() {
    // this.getleafOne()
    this.getStatus();
    this.getTableList();
  },
  methods: {
    // sortChange(column){
    //       if (column.prop) {
    //         if (column.prop === "gmtCreate") {

    //         if (column.order === "ascending") {
    //           this.searchParams.sortRule = 1
    //         }else{
    //           this.searchParams.sortRule = 2
    //         }
    //         }else {

    //         }
    //       }else{

    //       }
    //       this.getTableList()
    //     },

    // 获取商品状态
    getStatus() {
      labelsClassificationService.getStatus().then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              this.statusOptions = response.data;
            } else {
              this.statusOptions = [];
            }
          } else {
            this.$message.error(
              response.message ||
                response.msg ||
                response.subMsg ||
                "服务器未返回数据!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message ||
              response.msg ||
              response.subMsg ||
              "请求服务器失败!"
          );
        }
      );
    },

    //  handleSelectionChange(val) {
    //   this.multipleSelection = val;
    //   console.log("multipleSelection", this.multipleSelection);
    //   let ids = [];
    //   this.multipleSelection.map(item => {
    //     ids.push(item.id);
    //   });
    //   this.selectedIDs = ids;
    //   console.log("多选", this.selectedIDs);
    // },

    // 删除
    // deleteClick() {
    //   const data = this.selectedIDs;
    //   if (data.length != 0) {
    //     labelsClassificationService.deleteList(data).then(
    //     response => {
    //       if (response.code) {
    //         if (response.code === "20000") {
    //           this.getTableList();
    //         } else {
    //           this.$message.error(
    //             response.message ||
    //               response.subMsg ||
    //               response.msg ||
    //               "服务器未返回数据!"
    //           );
    //         }
    //       } else {
    //         this.$message.error(
    //           response.message ||
    //             response.subMsg ||
    //               response.msg  ||
    //             "服务器未返回数据!"
    //         );
    //       }
    //     },
    //     response => {
    //       this.$message.error(
    //         response.message ||
    //           response.msg ||
    //           response.subMsg ||
    //           "请求服务器失败!"
    //       );
    //     }
    //   );
    //   }else {
    //     this.$message.error(
    //           "请先选择要删除的商品!"
    //       );
    //   }

    // },

    //点击搜索
    searchClick() {
      // console.debug('搜索点击')
      this.searchParams.page = 1;
      this.getTableList();
    },

    newAdd() {
      this.$router.push({
        name: "addAdvance"
      });
    },
    // 启用状态更新
    // statusChange(index, row) {
    //   // console.debug("任务状态index=="+index+"==row=="+row)
    //   // this.labelDataTable[index].name = '进行中'||''
    //   this.statusChangeParams.id = row.id;
    //   const categoryStatus = row.categoryStatus;
    //   if (categoryStatus === 0) {
    //     this.statusChangeParams.categoryStatus = 1;
    //   } else if (categoryStatus === 1) {
    //     this.statusChangeParams.categoryStatus = 0;
    //   } else {
    //     this.statusChangeParams.categoryStatus = 0;
    //   }
    //   // this.$set(this.labelDataTable,index,this.labelDataTable[index])
    //   // console.debug("name=="+this.labelDataTable[index].name)
    //   const data = this.handparams(this.statusChangeParams);
    //   labelsClassificationService.updateStatus(data).then(
    //     response => {
    //       this.getTableList();
    //     },
    //     response => {
    //       this.$message.error(
    //         response.message || response.msg || response.subMsg || "请求服务器失败!"
    //       );
    //     }
    //   );
    // },
    // 查看任务
    checkDetail(index, row) {
      // console.debug('id===',row.id)
      this.$router.push({
        name: "checkAdvance",
        query: { index: index, id: row.id }
      });
    },
    // 编辑任务
    updateDetail(index, row) {
      this.$router.push({
        name: "updateAdvance",
        query: { index: index, id: row.id }
      });
    },
    // 修改商品状态
    updateStatus(index, row, status) {
      this.statusChangeParams.id = row.id;
      this.statusChangeParams.status = row.status;
      this.statusChangeParams.operation = status;
      const data = this.handparams(this.statusChangeParams);
      labelsClassificationService.upataStatus(data).then(
        response => {
          //console.debug('response===',response.data)
          if (response.code === "20000") {
            this.getTableList();
          } else {
            // alert(response.msg || '新增任务失败')
            this.$message.error(
              response.message ||
                response.subMsg ||
                response.msg ||
                "修改活动状态失败!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message ||
              response.subMsg ||
              response.msg ||
              "请求服务器失败!"
          );
        }
      );
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

    // 获取列表
    getTableList() {
      //   if (this.searchParams.leafThree != "") {
      //     this.searchParams.categoryId = this.searchParams.leafThree
      //   }else if (this.searchParams.leafTwo != "") {
      //     this.searchParams.categoryId = this.searchParams.leafTwo
      //   }else if (this.searchParams.leafOne != "") {
      //     this.searchParams.categoryId = this.searchParams.leafOne
      //   }else {
      //     this.searchParams.categoryId = ""
      //   }
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
                response.msg ||
                response.subMsg ||
                "服务器未返回数据!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message ||
              response.msg ||
              response.subMsg ||
              "请求服务器失败!"
          );
        }
      );
    },
    //参数处理
    handparams(param) {
      const params = JSON.parse(JSON.stringify(param));
      // for (const i in params) {
      //   if (params[i] === "") {
      //     delete params[i];
      //   }
      // }
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

