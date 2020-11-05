<template>
  <div>
    <template>
      <div>
        <el-row class="mr20">
          <el-col :span="24">
            <span class="float-left ml20 mt20">商品管理</span>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24">
          <div class="float-left ">
            <el-input class="ml20 mt20" v-model="searchParams.name" placeholder="商品名称"></el-input>
          </div>
          <div class="float-left ml20 ">
                <el-select class=" ml20 mt20" v-model="searchParams.leafOne" clearable placeholder="一级类目" @change="leafOneChange()">
                    <el-option 
                    v-for="item in leafOneOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    ></el-option>
                </el-select>
          </div>
          <div class="float-left ml20 ">
                <el-select class=" mt20" v-model="searchParams.leafTwo" clearable placeholder="二级类目" @change="leafTwoChange()">
                    <el-option 
                    v-for="item in leafTwoOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    ></el-option>
                </el-select>
          </div>
          <div class="float-left  ml20">
                <el-select class=" mt20" v-model="searchParams.leafThree" clearable placeholder="三级类目" @change="leafThreeChange()">
                    <el-option 
                    v-for="item in leafThreeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    ></el-option>
                </el-select>
          </div>
          <div class="float-left ml20">
            <el-input class=" mt20" v-model="searchParams.brandName" placeholder="品牌"></el-input>
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
            <el-input class=" mt20" v-model="searchParams.id" placeholder="商品ID"></el-input>
          </div>
            <div class="float-left ml20 w240 ">
                <el-date-picker v-model="searchParams.gmtCreateStart" type="datetime" placeholder="开始时间" class="w240 mt20"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </div>
                <div class="float-left ml20 w240 ">
                    <el-date-picker  type="datetime" v-model="searchParams.gmtCreateEnd" placeholder="结束时间"  class="w240 mt20"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </div>
            <div class="float-left ml10 w240">
                <el-select class=" mt20" v-model="searchParams.status" clearable placeholder="状态" >
                    <el-option 
                    v-for="item in statusOptions"
                    :key="item.statusId"
                    :label="item.statusName"
                    :value="item.statusId"
                    ></el-option>
                </el-select>
          </div>
          <div class="float-left  w120">
            <el-button class=" mt20" @click="searchClick">确定</el-button>
          </div>
        </el-col>
        <el-col>
           <div class="float-left ml20 ">
            <el-button class=" mt20" type="primary" @click="downLoadClick">下载数据</el-button>
          </div>
          <div class="float-left ml20">
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
            <div class="float-left ml20 ">
            <el-button class=" mt20" type="primary" @click="newAdd">新建</el-button>
          </div>
          <div class="float-left ml20">
            <el-button class=" mt20" type="danger" @click="deleteClick">删除</el-button>
          </div>
        </el-col>
      </el-row>
      <div style="margin-top:20px">
        <el-table :data="labelDataTable" @selection-change="handleSelectionChange" @sort-change="sortChange">
          <!-- <el-table-column prop="categoryCode" label="分类编码" min-width="80" align="center"></el-table-column> -->
           <el-table-column type="selection" width="55">
    </el-table-column>
          <el-table-column prop="id" label="商品ID" min-width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="商品名称" min-width="80" align="center"></el-table-column>
          <el-table-column prop="categoryName" label="类目" min-width="80" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" min-width="80" align="center"></el-table-column>
          <el-table-column prop="supplierId" label="供应商" min-width="80" align="center"></el-table-column>
          <el-table-column prop="gmtCreate" sortable="custom" label="发布时间" min-width="80" align="center"></el-table-column>
          <el-table-column prop="statusName"  label="状态" min-width="80" align="center"></el-table-column>
          <!-- <el-table-column prop="categoryStatusDesc" label="分类状态" min-width="80" align="center"></el-table-column> -->
          <!-- <el-table-column prop="statusName" label="任务状态" min-width="80" align="center">
          </el-table-column>-->
          <el-table-column prop="operation" label="操作" min-width="120" align="center">
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
                >启用</el-button> -->
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
                  @click="updateLabel(scope.$index,scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status != 1"
                  @click="updateStatus(scope.$index,scope.row,1)"
                >上架</el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status != 0"
                  @click="updateStatus(scope.$index,scope.row,0)"
                >下架</el-button>
                <el-button
                  type="text"
                  @click="labelCheck(scope.$index,scope.row)"
                >查看</el-button>
                <el-button
                    type="text"
                    @click="preLoad(scope.$index,scope.row)">预览
                    </el-button>
                     <el-dialog title="预览" :visible.sync="dialogCityVisible" :close-on-click-modal="false" :show-close="false"
                     :close-on-press-escape="false"  :modal-append-to-body="false" >
                     <el-row>
                      <el-col :span="24" >
                        <qrcode-vue :value="qrcode" :size="300" level="H"></qrcode-vue>
                      </el-col>
                    <el-button class="mt20" @click="dialogCancel()">关闭</el-button>
                    </el-row>
                </el-dialog>
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
import labelsClassificationService from "../../service/categoryManagement/merchandiseManagement.js"
import categoryManagementService from "../../service/categoryManagement/categoryManagement.js"
import QrcodeVue from 'qrcode.vue';
import HOST_CONFIG from 'hostconfig';
import apiHost from "@/hostconfig/index";
export default {
  data() {
    return {
      qrcode:"",
      uploadimgUrl: `${apiHost.netImg}operation-mall/goods/importGoods`,
      leafOneOptions: [],
      leafTwoOptions: [],
      leafThreeOptions: [],
      statusOptions:[],
      dialogCityVisible : false,
      searchParams: {
        id:"",
        name: "",
        brandName: "",
        leafOne: "",
        leafTwo: "",
        leafThree:"",
        status:"",
        categoryId:"",
        gmtCreateStart:"",
        gmtCreateEnd:"",
        sortRule:"",
        page: 1,
        pageSize: 10
      },
      multipleSelection: [],
      selectedIDs: [],

      statusChangeParams: {
        id: 0,
        status: 0
      },
      labelDataTable: [
       
      ],
      totalSize: 0
    };
  },
  created() {
    this.getleafOne()
    this.getStatus()
    this.getTableList();
  },
  components: {
    // QRCode,
    QrcodeVue
  },
  methods: {

sortChange(column){
      if (column.prop) {
        if (column.prop === "gmtCreate") {
        
        if (column.order === "ascending") {
          this.searchParams.sortRule = 1
        }else{
          this.searchParams.sortRule = 2
        }
        }else {
          
        }
      }else{
        
      }
      this.getTableList()
    },

    // 获取商品状态
    getStatus(){
      labelsClassificationService.getStatus().then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              this.statusOptions = response.data
            } else {
              this.statusOptions = [];
            }
          }else{
            this.$message.error(
                response.message || response.msg || response.subMsg || "服务器未返回数据!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message || response.msg || response.subMsg || "请求服务器失败!"
          );
        }
      );
    },
    // 获取一级分类
    getleafOne(){
      categoryManagementService.getleafOne().then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              this.leafOneOptions = response.data
            } else {
              this.leafOneOptions = [];
            }
          }else{
            this.$message.error(
                response.message || response.msg || response.subMsg || "服务器未返回数据!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message || response.msg || response.subMsg || "请求服务器失败!"
          );
        }
      );
    },
    leafOneChange(){
      this.getleafTwo(1)
    },
    leafTwoChange(){
      this.getleafTwo(2)
    },
    leafThreeChange(){

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

    importClick() {
      
    },
    downLoadClick() {
      let startDate;
      let endDate;
      if (this.searchParams.gmtCreateStart) {
        var date = new Date(this.searchParams.gmtCreateStart); 
        //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
        // 可以这样做
        var date = new Date(this.searchParams.gmtCreateStart.replace(/-/g, '/'));
        startDate = date.getTime();
      }

      if (this.searchParams.gmtCreateEnd) {
        var date = new Date(this.searchParams.gmtCreateEnd); 
        //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
        // 可以这样做
        var date = new Date(this.searchParams.gmtCreateEnd.replace(/-/g, '/'));
        endDate = date.getTime();
      }

      labelsClassificationService.downLoadClick(this.searchParams.id,this.searchParams.name,this.searchParams.categoryId,this.searchParams.brandName,startDate,
      endDate,this.searchParams.status,this.searchParams.page,this.searchParams.pageSize,this.searchParams.sortRule);
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
      }else {
        this.$message.error(
              "请先选择要删除的商品!"
          );
      }
      
    },

    // 获取二级分类
    getleafTwo(leaf){
      let data
      if(leaf === 1){
        data = this.searchParams.leafOne
      }else{
        data = this.searchParams.leafTwo
      }
      categoryManagementService.getleafTwo(data).then(
        response => {
          if (response.code === "20000") {
            if(leaf === 1){
              if (response.data instanceof Array) {
                this.leafTwoOptions = response.data
              } else {
                this.leafTwoOptions = [];
              }
            }else {
              if (response.data instanceof Array) {
                this.leafThreeOptions = response.data
              } else {
                this.leafThreeOptions = []
              }
            }
            
          }else{
            this.$message.error(
                response.message || response.msg || response.subMsg || "服务器未返回数据!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message || response.msg || response.subMsg || "请求服务器失败!"
          );
        }
      );
    },
    //点击搜索
    searchClick() {
      // console.debug('搜索点击')
      this.searchParams.page = 0;
      this.getTableList();
    },

    newAdd() {
      labelsClassificationService.addMerchandise().then(
        response => {
          //console.debug('response===',response.data)
          if (response.code === "20000") {
            this.$router.push({
            name: "merchandiseInformation",
            query:{ goodsId: response.data }
        });
          } else {
            // alert(response.msg || '新增任务失败')
            this.$message.error(
              response.message ||
                response.subMsg ||
                  response.msg  ||
                "新增商品失败!"
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
    // showQRCode(){
    //   document.getElementById('qrcode').innerHTML = '';
    //   console.log("showQRcode=====")
    //   this.qRCode('https://www.baidu.com');

    // },
    preLoad(index, row){
      this.dialogCityVisible = true;
      console.log("showQRcode=====000")
      let host = HOST_CONFIG.netGoodDetail;
      // https://sit-operation.allcitygo.com/shoppingMall/#/goodDetail
      this.qrcode = `https:${host}${row.id}`
      // document.getElementById('qrcode').innerHTML = ''
      // this.qRCode('https://www.baidu.com');
    },
    // qRCode(url){
    //   // console.log("showQRcode=====1111")
    //   let qrcode = new QRCode('qrcode', {
    //     width: 132,  
    //     height: 132,
    //     text: url, // 二维码地址
    //     colorDark : "#000",
    //     colorLight : "#fff",
    //   })
    //   // console.log("showQRcode=====",qrcode)
    // },
    dialogCancel (){
      this.dialogCityVisible = false;
    },
    // 查看任务
    labelCheck(index, row) {
      // console.debug('id===',row.id)
      this.$router.push({
        name: "checkInformation",
        query: { index: index, goodsId: row.id }
      });
    },
    // 编辑任务
    updateLabel(index, row) {
      this.$router.push({
        name: "updateInformation",
        query: { index: index, goodsId: row.id }
      });
    },
    // 修改商品状态
    updateStatus (index ,row,status){
      this.statusChangeParams.id = row.id
      this.statusChangeParams.status = status
      const data = this.handparams(this.statusChangeParams)
      labelsClassificationService.upataStatus(data).then(
        response => {
          //console.debug('response===',response.data)
          if (response.code === "20000") {
            this.getTableList()
          } else {
            // alert(response.msg || '新增任务失败')
            this.$message.error(
              response.message ||
                response.subMsg ||
                  response.msg  ||
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
        this.searchParams.categoryId = this.searchParams.leafThree
      }else if (this.searchParams.leafTwo != "") {
        this.searchParams.categoryId = this.searchParams.leafTwo
      }else if (this.searchParams.leafOne != "") {
        this.searchParams.categoryId = this.searchParams.leafOne
      }else {
        this.searchParams.categoryId = ""
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
          }else{
            this.$message.error(
                response.message || response.msg || response.subMsg || "服务器未返回数据!"
            );
          }
        },
        response => {
          this.$message.error(
            response.message || response.msg || response.subMsg || "请求服务器失败!"
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
    },

    handleAwardSuccess(res, file, fileList) {
      console.log("res===",res);
      if (res.code === "20000") {
        this.$message.success(res.data || res.msg || '');
        this.getTableList();
      }else {
        this.$message.success(res.data || res.msg || '');
      }
      
      
    },
    
    //图片上传失败
    handleAwardError(err, file, fileList) {
      console.log("err===",err);
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
.qrcode {
    display: inline-block;
    
    
      width: 132px;
      height: 132px;
      
      // background-color: #ffffff; //设置白色背景色
      padding: 6px; // 利用padding的特性，挤出白边
    
  }

</style>

