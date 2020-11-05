<template>
  <div>
    <template>
      <div>
        <el-row class="mr20">
          <el-col :span="24">
            <span class="float-left ml20 mt20">新建商品</span>
          </el-col>
        </el-row>
      </div>
      <div style="margin-left:80px; margin-top:40px">
        <el-steps :active="3" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="商品描述"></el-step>
          <el-step title="规格属性"></el-step>
          <el-step title="库存设置"></el-step>
        </el-steps>
      </div>
    </template>
  <el-scrollbar style="height:100%;">
    <template>
      <div style="display: flex; margin-top:40px">
        <el-row style="margin:auto;">
          <el-col >
            <div >
              <div class="float-left">
                <div class="w120">SKU编码</div>
              </div>
              <div v-if="specificationsOne" class="float-left">
                <div class="w120">{{specificationsOne }}</div>
              </div>
              <div v-if="specificationsTwo" class="float-left">
                <div class="w120">{{specificationsTwo }}</div>
              </div>
              <div class="float-left">
                <div class="w120">sku主图</div>
              </div>
              <div class="float-left">
                <div class="w120">商品条形码</div>
              </div>
              <div class="float-left">
                <div class="w120">市场价</div>
              </div>
              <div class="float-left">
                <div class="w120">销售价</div>
              </div>
              <div class="float-left">
                <div class="w120">成本价</div>
              </div>
              <div class="float-left">
                <div class="w120">库存</div>
              </div>
              <div class="float-left">
                <div class="w120">实际销量</div>
              </div>
              <div class="float-left">
                <div class="w120">销量上调</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </template>

    <template>
      <div style=" display:flex; margin-top:10px; margin-left:-60px;">
        <el-form style="margin:auto;" ref="tableForm" :model="tableForm"  :rules="rules">
          <!-- <el-form-item prop="goodsStockRequestList" > -->
            <el-form-item  >
            <div
              v-for="(item ,index) in tableForm.goodsStockRequestList"
              :key="item.index"
              class="mb20 mr20"
              style="display:flex;"
            >
            <!-- :prop="'goodsStockRequestList.'+index+'.specificationsOne'"
                :rules="goodsStockRequestList.specificationsOne" -->
                <span
                :disabled="disable"
                class="w100"
                style="margin-left:100px;"
              >{{item.id || ""}}</span>
              <el-form-item
              v-if="specificationsOne"
                
                class="w120 mb20"
              >
                <el-input
                  :disabled="disable"
                  
                  v-model="item.specificationsOne"
                  class="w100"
                ></el-input>
              </el-form-item>

              <el-input
              v-if="specificationsTwo"
                :disabled="disable"
                v-model="item.specificationsTwo"
                class="w100 mr20"
              ></el-input>

              <el-form-item label="" :prop="'goodsStockRequestList.'+index+'.photo'"
                  :rules="goodsStockRequestList.photo">
              <div @click="getImageTypeIndex(index)">
            <div class="comm-dis w100 mr20">
              <div class="header-banner ">
                <img v-if="item.photo" :src="item.photo" class="avatar1">
                <span class="deletImg">
                  <span class="deletImg2" @click="handleCoverDelete">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <div  v-show="!item.photo">
                <el-upload
                  class="avatar-uploader1"
                  :action="uploadimgUrl"
                  name="file"
                  :show-file-list="false"
                  :on-success="handleCoverSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <i class="el-icon-plus avatar-uploader1-icon"></i>
                </el-upload>
              </div>
            </div>
              </div>
          </el-form-item>

              <el-input
                :disabled="disable"
                placeholder="商品条形码"
                v-model="item.barCode"
                class="w100 mr20"
              ></el-input>
              <el-input :disabled="disable" placeholder="市场价" v-model="item.marketPrice" class="w100 mr20" prop="marketPrice"></el-input>
              <el-input :disabled="disable" placeholder="销售价" v-model="item.sellingPrice" class="w100 mr20" prop="sellingPrice"></el-input>
              <el-input :disabled="disable" placeholder="成本价" v-model="item.costPrice" class="w100 mr20" prop="costPrice"></el-input>
              <el-input :disabled="disable" placeholder="库存" v-model="item.remainCount" class="w100 mr20"></el-input>
              <span
                class="w100 mr20 text-center"
              >{{item.saleCount || "0"}}</span>
              <el-form-item :prop="'goodsStockRequestList.'+index+'.raiseSaleCount'"
                  :rules="goodsStockRequestList.raiseSaleCount">
              <el-input :disabled="disable" placeholder="销量上调" type="number" @keyup.native="number($event)" v-model.number="item.raiseSaleCount" class="w100"></el-input>
              </el-form-item>
              <el-button  type="danger" style="background:#F36161;color:#333333" class="ml20" @click="properDel(index)">删除</el-button>
              <!-- v-if="tableForm.goodsStockRequestList.length >1 && !disable " -->
              <!-- <el-button v-if="item.showAdd" type="primary"  @click="properAdd" class="ml20">增加</el-button>-->
            </div>
          </el-form-item>
            <el-form-item v-if="!disable" class="text-center">
            <el-button type="danger" @click="properAdd" class="mt20">新增sku</el-button>
          </el-form-item>
          <el-form-item v-if="!disable" class="text-center">
            <el-button type="primary" @click="submitForm('tableForm')" class="mt20">提交</el-button>
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </el-scrollbar>
  </div>
</template>
<script>
import labelsClassificationService from "../../service/categoryManagement/merchandiseManagement.js"
import apiHost from "@/hostconfig/index";
export default {
  data() {
    return {
      disable: false,
      labelsTypeOptions: [],
      uploadimgUrl: `${apiHost.netImg}prefer/api/upload_file`,
      imagePath: "",
      buttonStatus: 0,
      specificationsOne: '',
      specificationsTwo: '',
      isUpdate: false,
      uploadImageIndex: "",
      tableForm: {
        goodsId:'',
        goodsStockRequestList: [
            
        ]
      },
      rules: {
        categoryName: [
          { required: true, message: "请输入中文名称", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        goodsStockRequestList: [
          { required: true, message: "请输入属性", trigger: "blur" }
        ],
        tagName: [
          { required: true, message: "请输入标签名称", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        tagDesc: [
          { required: true, message: "请输入标签描述", trigger: "blur" }
        ],
        // categoryDesc: [
        //   { required: true, message: "请输入分类描述", trigger: "blur" }
        // ],
        imgPic: [{ required: true, message: "请上传图片", trigger: "blur" }]
      },
      goodsStockRequestList: {
        specificationsOne: [{ required: true, message: "请输入属性值", trigger: "blur" }],
        photo: [
          { required: false, message: "请上传图片", trigger: "blur" }
        ],
        raiseSaleCount:[
          {
            type: "number",
            min: 1,
            message: "销量上调不能小于1",
            trigger: "blur",
            required: false,
            validator:(rule,value,callback)=>{
              if(value !=null && value != "" || value === 0){
                  if((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) == false || value === 0){
                    callback(new Error("请填写大于0的数字"));
                  }else{
                 callback();
                  }
            }else{
             callback();
            }
            },
          }
        ],
      }
    };
  },
  created() {
    const routeName = this.$route.name || "";
    const id = this.$route.query.goodsId || "";
      console.log("gooodsId===", id);
      this.tableForm.goodsId = id;
    if (routeName === "merchandiseSetting") {
    // this.tableForm.goodsId = 5;
       this.getDetails(routeName);
    } else if (routeName === "checkSetting") {
      this.getDetails(routeName);
    } else if (routeName === "updateSetting") {
      this.getDetails(routeName);
    }
  },
  methods: {

    number(e){　　
      
　　　 var keynum = window.event ? e.keyCode : e.which
      var keychar = String.fromCharCode(keynum)
      if (keynum ==189 || keynum==190||keynum ==110 ||keynum == 109 ) {
        this.$message.warning("禁止输入小数以及负数")
        e.target.value = ''
      }
　　},

    // 删除属性值
      properDel(index) {
        if (index >-1) {
          this.tableForm.goodsStockRequestList.splice(index,1);
        }
        // this.tableForm.tagItemList[this.tableForm.tagItemList.length - 1].showAdd = true;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.merchandiseSetting();
        } else {
          //console.log('提交失败!!')
          return false;
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    properAdd() {
    //   this.tableForm.goodsStockRequestList[this.tableForm.goodsStockRequestList.length - 1].showAdd = false;
      let a = { specificationsOne: null, specificationsTwo: null,photo:null, barCode: null, marketPrice: null, sellingPrice: null, costPrice: null, remainCount: null,saleCount:null, raiseSaleCount:null };
      this.tableForm.goodsStockRequestList.push(a);
    },

    cancel() {
      this.$router.go(-1);
    },

    // 新增任务、编辑任务
    merchandiseSetting() {
      const data = this.handparams();
      const routeName = this.$route.name || "";
      if (this.isUpdate === true) {
      
        labelsClassificationService.updateSetting(data).then(
          response => {
            //console.debug('response===',response.data)
            if (response.code === "20000") {
              this.$router.push({path: '/merchandiseManagement'})
            //   this.$router.go(-1);
            } else {
              // alert(response.msg || '新增任务失败')
              this.$message.error(
                response.message ||
                  response.subMsg ||
                  response.msg ||
                  "编辑库存失败!"
              );
            }
          },
          response => {
            this.$message.error(
              response.message ||
                response.subMsg ||
                  response.msg  ||
                "请求服务器失败!"
            );
          }
        );
      } else{
        labelsClassificationService.addGoodsStock(data).then(
          response => {
            //console.debug('response===',response.data)
            if (response.code === "20000") {
              this.$router.push({path: '/merchandiseManagement'})
            //   this.$router.go(-1);
            } else {
              // alert(response.msg || '新增任务失败')
              this.$message.error(
                response.message ||
                  response.subMsg ||
                  response.msg ||
                  "新增库存失败!"
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
      }
    },
    //获取详情
    getDetails(routeName) {
      const param = this.tableForm.goodsId;
      labelsClassificationService.getDetails(param).then(
        response => {
          const detail = response.data || "";
          // this.tableForm.categoryPid = id;
          this.specificationsOne = response.data.specificationsOne 
          this.specificationsTwo =  response.data.specificationsTwo 
          if (detail.goodsStockList && detail.goodsStockList.length !=0) {
            this.isUpdate = true;
          }else {
            this.isUpdate = false;
          }
          this.tableForm.goodsStockRequestList = detail.goodsStockList
         
          if (routeName === "checkSetting") {
            this.disable = true;
          }
        },
        response => {
          this.$message.error(
            response.message ||
              response.msg ||
              response.subMsg ||
              "请求服务器连接失败!"
          );
        }
      );
    },


    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;

      const isWidthHeight = file.naturalWidth < 800 && file.naturalHeight < 800;
      const isSize = new Promise(function(resolve, reject) {
        let width = 800;
        let height = 800;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width <= width && img.height <= height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          this.$message.error("图片尺寸必须在800px * 800px 以内!");
          this.tableForm.logo = "";
          this.imagePath = this.tableForm.logo;
          this.buttonStatus = 0;
          this.isUpload = false;
          return Promise.reject();
        }
      );

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M && isSize;
    },
    handleCoverSuccess(res, file) {
      
      this.tableForm.goodsStockRequestList[this.uploadImageIndex].photo = `https://${res.data}`;
      this.$set(this.tableForm.goodsStockRequestList,this.uploadImageIndex,this.tableForm.goodsStockRequestList[this.uploadImageIndex]);
      console.log("goodsStockRequestList====",this.tableForm.goodsStockRequestList[this.uploadImageIndex].photo);
    },
    getImageTypeIndex(index){
      this.uploadImageIndex = index
    },
    handleCoverDelete() {
      this.$confirm("是否删除图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableForm.goodsStockRequestList[this.uploadImageIndex].photo = "";
          this.$set(this.tableForm.goodsStockRequestList,this.uploadImageIndex,this.tableForm.goodsStockRequestList[this.uploadImageIndex]);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已撤销"
          });
        });
    },

    //参数处理
    handparams() {
      const self = this;
      const params = JSON.parse(JSON.stringify(self.tableForm));
      // for (const i in params) {
      //     if (params[i] === "") {
      //         delete params[i]
      //     }
      // }
      // console.log("data===" + JSON.stringify(params))
      return params;
    },
  }
};
</script>
<style lang="scss">
.avatar-uploader1 .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader1 .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader1-icon {
  font-size: 8px;
  color: #8c939d;
  width: 100px;
  height: 10px;
  line-height: 10px;
  text-align: center;
}

.avatar-uploader1 .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar1 {
  width: 100px;
  height: 40px;
  display: block;
}

.comm-dis {
  width: 100%;
  display: flex;
}
.view-text {
  /**
	思路：
	1.设置inline-block属相
	2.强制不换行
	3.固定高度
	4.隐藏超出部分
	5.显示“……”
  */
  display: inline-block;
  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
}
.header-banner {
  position: relative;
}
.deletImg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}
.deletImg:hover {
  opacity: 1;
}
.deletImg2 {
  position: absolute;
  top: 0%;
  left: 45%;
}
</style>

