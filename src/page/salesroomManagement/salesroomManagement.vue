<template>
  <div>
    <template>
      <div>
        <el-row class="mr20">
          <el-col :span="24">
            <span class="float-left ml20 mt20">门店管理</span>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="float-left">
            <el-input class="ml20 mt20" v-model="searchParams.brandName" placeholder="品牌名称"></el-input>
          </div>
          <div class="float-left ml20">
            <el-input class="ml20 mt20" v-model="searchParams.shopName" placeholder="门店名称"></el-input>
          </div>
          <div class="float-left ml20">
            <el-input class="ml20 mt20" v-model="searchParams.shopId" placeholder="门店ID"></el-input>
          </div>
          <div class="float-left ml20 w120">
            <el-button class="ml20 mt20" @click="searchClick">确定</el-button>
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
          <div class="float-left ml20">
            <el-button class="mt20" type="primary" @click="downLoadClick">下载数据</el-button>
          </div>
          <div class="float-left ml20">
            <!-- <el-button  @click="importClick">批量导入</el-button> -->
            <el-upload
              :action="uploadimgUrl"
                :show-file-list="false"
                :on-success="handleAwardSuccess"
                :on-error="handleAwardError"
                :before-upload="beforeAwardUpload"
                
                :auto-upload="true"
            >
              <el-button class="mt20" type="primary">批量导入</el-button>
              
            </el-upload>
          </div>

          <div class="float-left ml20">
            <el-button class="mt20" type="primary" @click="newAdd">新建</el-button>
          </div>
          <div class="float-left ml20">
            <el-button class="mt20" type="danger" @click="deleteClick">删除</el-button>
          </div>
        </el-col>
      </el-row>
      <div style="margin-top:20px">
        <el-table :data="labelDataTable" @selection-change="handleSelectionChange">
          <!-- <el-table-column prop="categoryCode" label="分类编码" min-width="80" align="center"></el-table-column> -->
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="门店ID" min-width="80" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌名称" min-width="80" align="center"></el-table-column>
          <el-table-column prop="shopName" label="门店名称" min-width="80" align="center"></el-table-column>
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
                <el-button
                  type="text"
                  v-if="scope.row.status != 1"
                  @click="labelCheck(scope.$index,scope.row)"
                >查看</el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status != 1"
                  @click="updateLabel(scope.$index,scope.row)"
                >编辑</el-button>
                <!-- <el-button
                  type="text"
                  v-if="scope.row.status != 1"
                  @click="updateStatus(scope.$index,scope.row,1)"
                >上架</el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status != 0"
                  @click="updateStatus(scope.$index,scope.row,0)"
                >下架</el-button>-->
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
import labelsClassificationService from "../../service/categoryManagement/salesroomManagement.js";
import apiHost from "@/hostconfig/index";
export default {
  data() {
    return {
      searchParams: {
        brandName: "",
        shopName: "",
        shopId: "",
        page: 1,
        pageSize: 10
      },
      
      multipleSelection: [],
      selectedIDs: [],
      uploadimgUrl: `${apiHost.netImg}operation-mall/shop/importShop`,
      statusChangeParams: {
        id: 0,
        status: 0
      },
      labelDataTable: [],
      totalSize: 0
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
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
    importClick() {},
    downLoadClick() {
      labelsClassificationService.downLoadClick(
        this.searchParams.brandName,
        this.searchParams.shopName,
        this.searchParams.shopId,
        this.searchParams.page,
        this.searchParams.pageSize
      );
    },
    // 删除
    deleteClick() {
      const data = this.selectedIDs;
      if (data.length != 0) {
        labelsClassificationService.deleteList(data).then(
          response => {
            if (response.code) {
              if (response.code === "20000") {
                this.getTableList();
              } else {
                this.$message.error(
                  response.message ||
                    response.subMsg ||
                    response.msg ||
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
                response.msg ||
                response.subMsg ||
                "请求服务器失败!"
            );
          }
        );
      } else {
        this.$message.error("请先选择要删除的门店!");
      }
    },

    //点击搜索
    searchClick() {
      // console.debug('搜索点击')
      this.searchParams.page = 1;
      this.getTableList();
    },

    newAdd() {
      this.$router.push({
        name: "addSalesroom"
      });
    },
    // 启用状态更新
    // statusChange(index, row) {
    //   // console.debug("任务状态index=="+index+"==row=="+row)
    //   // this.labelDataTable[index].statusName = '进行中'||''
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
    //   // console.debug("statusName=="+this.labelDataTable[index].statusName)
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
    labelCheck(index, row) {
      // console.debug('id===',row.id)
      this.$router.push({
        name: "checkSalesroom",
        query: { index: index, id: row.id }
      });
    },
    // 编辑任务
    updateLabel(index, row) {
      this.$router.push({
        name: "updateSalesroom",
        query: { index: index, id: row.id }
      });
    },
    // 修改商品状态
    updateStatus(index, row, status) {
      this.statusChangeParams.id = row.id;
      this.statusChangeParams.status = status;
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
                "修改商品状态失败!"
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
      if (this.searchParams.leafThree != "") {
        this.searchParams.categoryId = this.searchParams.leafThree;
      } else if (this.searchParams.leafTwo != "") {
        this.searchParams.categoryId = this.searchParams.leafTwo;
      } else if (this.searchParams.leafOne != "") {
        this.searchParams.categoryId = this.searchParams.leafOne;
      } else {
        this.searchParams.categoryId = "";
      }
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
      for (const i in params) {
        if (params[i] === "") {
          delete params[i];
        }
      }
      // console.log("data===" + JSON.stringify(params))
      return params;
    },

    handleAwardSuccess(res, file, fileList) {
      console.log("res===",res);
      if (res.code === "20000") {
        this.$message.success(res.data || res.msg || "");
        this.getTableList();
      }else {
        this.$message.success(res.data || res.msg || "");
      }
      
      
    },
    
    //图片上传失败
    handleAwardError(err, file, fileList) {
      this.$message.error(err);
    },
    // 上传图片之前限制图片大小
    beforeAwardUpload(file) {
      // const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // const isLt2M = file.size / 1024 / 1024 < 1;
      // const isWidthHeight = file.naturalWidth < 500 && file.naturalHeight < 500;
      // const isSize = new Promise(function(resolve, reject) {
      //   let width = 500;
      //   let height = 500;
      //   let _URL = window.URL || window.webkitURL;
      //   let img = new Image();
      //   img.onload = function() {
      //     let valid = img.width <= width && img.height <= height;
      //     valid ? resolve() : reject();
      //   };
      //   img.src = _URL.createObjectURL(file);
      // }).then(
      //   () => {
      //     return file;
      //   },
      //   () => {
      //     this.$message.error("图片尺寸必须在500px * 500px 以内!");
      //     this.tableForm.logo = "";
      //     this.imagePath = this.tableForm.logo;
      //     this.buttonStatus = 0;
      //     this.isUpload = false;
      //     return Promise.reject();
      //   }
      // );
      // // if (!isWidthHeight) {
      // //   this.$message.error("图片尺寸必须在500px * 500px 以内!");
      // //   this.imagePath = this.tableForm.logo;
      // //   this.buttonStatus = 0;
      // //   this.isUpload = false;
      // // }
      // // console.debug('upload===')
      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
      //   this.tableForm.logo = "";
      //   this.imagePath = this.tableForm.logo;
      //   this.buttonStatus = 0;
      //   this.isUpload = false;
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传图片大小不能超过 1MB!");
      //   this.tableForm.logo = "";
      //   this.imagePath = this.tableForm.logo;
      //   this.buttonStatus = 0;
      //   this.isUpload = false;
      // }
      // return isJPG && isLt2M && isSize;
    },
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

