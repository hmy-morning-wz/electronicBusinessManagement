<template>
  <div>
    <template>
      <div>
        <el-row class="mr20">
          <el-col :span="24">
            <span class="float-left ml20 mt20">品牌管理</span>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24">
          <!-- <div class="float-left w240">
            <el-input class="ml20 mt20" v-model="searchParams.chName" placeholder="类型名称"></el-input>
          </div>-->
          <div class="float-left ml10 w240">
            <el-input class="ml40 mt20" v-model="searchParams.chName" placeholder="品牌名称"></el-input>
          </div>

          <div class="float-left ml20 w120">
            <el-button class="ml40 mt20" @click="searchClick">搜索</el-button>
          </div>
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
          <el-table-column prop="id" label="品牌ID" min-width="20" align="center"></el-table-column>
          <el-table-column prop="chName" label="中文名称" min-width="80" align="center"></el-table-column>
          <el-table-column prop="enName" label="英文名称" min-width="80" align="center"></el-table-column>
          <!-- <el-table-column prop="categoryStatusDesc" label="分类状态" min-width="80" align="center"></el-table-column> -->
          <!-- <el-table-column prop="statusName" label="任务状态" min-width="80" align="center">
          </el-table-column>-->
          <el-table-column prop="operation" label="操作" min-width="80" align="center">
            <template slot-scope="scope" style="text-align:center">
              <div style="display:flex;justify-content: center">
                <el-button type="text" @click="updateLabel(scope.$index,scope.row)">编辑</el-button>
                <el-button type="text" @click="loadShop(scope.$index,scope.row)">导出门店</el-button>
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
import brandManagementService from "../../service/brandManagement/brandManagement.js";

export default {
  data() {
    return {
      searchParams: {
        chName: "",
        enName: "",
        page: 1,
        pageSize: 10
      },
      labelDataTable: [],
      totalSize: 0,
      multipleSelection: [],
      selectedIDs: []
    };
  },
  created() {
    // this.getTaskType()
    this.getTableList();
  },
  methods: {
    //点击搜索
    searchClick() {
      // console.debug('搜索点击')
      this.searchParams.page = 1;
      this.getTableList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
        brandManagementService.deleteList(data).then(
          response => {
            if (response.code) {
              if (response.code === "20000") {
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
                  response.msg ||
                "请求服务器失败!"
            );
          }
        );
      } else {
        this.$message.error("请先选择要删除的品牌!");
      }
    },
    newAdd() {
      this.$router.push({
        name: "addBrand",
        query: {}
      });
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
        name: "updateBrand",
        query: { index: index, id: row.id }
      });
    },
    loadShop(index, row) {
      const id = row.id;
      // 导出门店   window.location.href = url  downLoad
      brandManagementService.downLoad(id);
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
      brandManagementService.getTableList(data).then(
        response => {
          if (response.code === "20000") {
            if (response.data) {
              if (response.data instanceof Array) {
                const array = response.data;
                this.labelDataTable = array;
              } else {
                this.labelDataTable = [];
              }
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

