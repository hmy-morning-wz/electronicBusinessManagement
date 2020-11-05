<template>
  <div>
    <template>
      <div>
        <el-row class="mr20">
          <el-col :span="24">
            <span class="float-left ml20 mt20">类目管理</span>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24">
          <!-- <div class="float-left w240">
            <el-input class="ml20 mt20" v-model="searchParams.leafOne" placeholder="类型名称"></el-input>
          </div>-->
          <div class="float-left ml10 w240">
            <el-select
              class="ml40 mt20"
              v-model="searchParams.leafOne"
              clearable
              placeholder="一级类目"
              @change="leafOneChange()"
            >
              <el-option
                v-for="item in leafOneOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="float-left ml10 w240">
            <el-select
              class="mt20"
              v-model="searchParams.leafTwo"
              clearable
              placeholder="二级类目"
              @change="leafTwoChange()"
            >
              <el-option
                v-for="item in leafTwoOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="float-left w120">
            <el-button class="mt20" @click="searchClick">确定</el-button>
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
          <div class="float-left ml10 w120">
            <el-button class="ml40 mt20" type="primary" @click="newAdd">新建</el-button>
          </div>
          <div class="float-left w120">
            <el-button class="mt20" type="danger" @click="deleteClick">删除</el-button>
          </div>
        </el-col>
      </el-row>
      <div style="margin-top:20px">
        <el-table :data="labelDataTable" @selection-change="handleSelectionChange">
          <!-- <el-table-column prop="categoryCode" label="分类编码" min-width="80" align="center"></el-table-column> -->
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="类目ID" min-width="20" align="center"></el-table-column>
          <el-table-column prop="name" label="类目名称" min-width="80" align="center"></el-table-column>
          <el-table-column prop="categoryLeaf" label="类目级别" min-width="80" align="center">
            <template slot-scope="scopes" style="text-align:center">
              <div style="display:flex;justify-content: center">
                <div v-if="scopes.row.leaf === 1">一级</div>
                <div v-else-if="scopes.row.leaf === 2">二级</div>
                <div v-else-if="scopes.row.leaf === 3">三级</div>
              </div>
            </template>
          </el-table-column>
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
                <el-button type="text" @click="updateLabel(scope.$index,scope.row)">编辑</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="weight" label="权重" min-width="80" align="center"></el-table-column>
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
import categoryManagementService from "../../service/categoryManagement/categoryManagement.js";

export default {
  data() {
    return {
      leafOneOptions: [],
      leafTwoOptions: [],
      showSort: false,
      cityList: [],
      commonCity: {
        cityCode: "",
        cityName: "通用",
        hasCheck: false
      },
      searchParams: {
        leafOne: "",
        leafTwo: "",
        page: 1,
        pageSize: 10
      },
      statusChangeParams: {
        id: 0,
        categoryStatus: 0
      },
      labelDataTable: [],
      totalSize: 0,
      multipleSelection: [],
      selectedIDs: []
    };
  },
  created() {
    this.getleafOne();
    this.getTableList();
  },
  methods: {
    // 获取一级分类
    getleafOne() {
      categoryManagementService.getleafOne().then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              this.leafOneOptions = response.data;
            } else {
              this.leafOneOptions = [];
            }
          } else {
            this.$message.error(
              response.message ||
                response.subMsg ||
                  response.msg   ||
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
    // 获取二级分类
    getleafTwo() {
      const data = this.searchParams.leafOne;
      categoryManagementService.getleafTwo(data).then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              this.leafTwoOptions = response.data;
            } else {
              this.leafTwoOptions = [];
            }
          } else {
            this.$message.error(
              response.message ||
                response.subMsg ||
                  response.msg   ||
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

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("multipleSelection", this.multipleSelection);
      let ids = [];
      this.multipleSelection.map(item => {
        ids.push(item.id);
      });
      this.selectedIDs = ids;
      console.log("多选", this.selectedIDs);
    },
    // 删除
    deleteClick() {
      const data = this.selectedIDs;
      if (data.length != 0) {
        categoryManagementService.deleteList(data).then(
          response => {
            if (response.code) {
              if (response.code === "20000") {
                this.searchParams.leafOne = "";
                this.searchParams.leafTwo = "";
                this.getleafOne()
                this.getTableList();
              } else {
                this.$message.error(
                  response.message ||
                    response.msg ||
                    response.subMsg ||
                    "服务器未返回数据!"
                );
              }
            } else {
              this.$message.error(
                response.message ||
                  response.subMsg ||
                  response.msg ||
                  "服务器未返回数据!"
              );
            }
          },
          response => {
            this.$message.error(
              response.message ||
                response.subMsg ||
                  response.msg   ||
                "请求服务器失败!"
            );
          }
        );
      } else {
        this.$message.error("请先选择要删除的类目!");
      }
    },

    leafOneChange() {
      this.getleafTwo();
    },
    //点击搜索
    searchClick() {
      // console.debug('搜索点击')
      this.searchParams.page = 1;
      this.getTableList();
    },

    newAdd() {
      this.$router.push({
        name: "addCategory",
        query: {}
      });
    },
    // 启用状态更新
    statusChange(index, row) {
      // console.debug("任务状态index=="+index+"==row=="+row)
      // this.labelDataTable[index].statusName = '进行中'||''
      this.statusChangeParams.id = row.id;
      const categoryStatus = row.categoryStatus;
      if (categoryStatus === 0) {
        this.statusChangeParams.categoryStatus = 1;
      } else if (categoryStatus === 1) {
        this.statusChangeParams.categoryStatus = 0;
      } else {
        this.statusChangeParams.categoryStatus = 0;
      }
      // this.$set(this.labelDataTable,index,this.labelDataTable[index])
      // console.debug("statusName=="+this.labelDataTable[index].statusName)
      const data = this.handparams(this.statusChangeParams);
      categoryManagementService.updateStatus(data).then(
        response => {
          this.getTableList();
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
    // 查看任务
    labelCheck(index, row) {
      // console.debug('id===',row.id)
      this.$router.push({
        name: "checkClassification",
        query: { index: index, id: row.id }
      });
    },
    // 编辑任务
    updateLabel(index, row) {
      this.$router.push({
        name: "updateCategory",
        query: { index: index, id: row.id }
      });
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
      const data = this.handparams(this.searchParams);
      categoryManagementService.getTableList(data).then(
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
                response.subMsg ||
                  response.msg  ||
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

