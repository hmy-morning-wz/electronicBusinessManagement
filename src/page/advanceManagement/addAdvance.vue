<template>
  <div style="overflow-x:scroll;height:100%;">
    <el-scrollbar style="height:100%;">
      <template>
        <div>
          <el-row class="mr20">
            <el-col :span="24">
              <span class="float-left ml20 mt20">{{title}}</span>
            </el-col>
            <el-col :span="24">
              <span class="float-left ml20 mt20">活动ID：</span>
              <span class="float-left ml20 mt20">{{tableForm.id}}</span>
            </el-col>
          </el-row>
        </div>
      </template>

      <template>
        <div style=" display:flex; margin-top:10px; ">
          <el-form
            style="margin:auto;"
            ref="tableForm"
            label-width="120px"
            :model="tableForm"
            :rules="rules"
          >
            <div class="flex">
              <div>
                <el-form-item label="预售开始时间：" prop="gmtPerSaleStart" class="w360">
                  <el-date-picker
                    :disabled="disable"
                    type="datetime"
                    placeholder="预售开始时间"
                    v-model="tableForm.gmtPerSaleStart"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions0"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="预售结束时间：" prop="gmtPerSaleEnd" class="w360">
                  <el-date-picker
                    :disabled="disable"
                    type="datetime"
                    placeholder="预售结束时间"
                    v-model="tableForm.gmtPerSaleEnd"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions1"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="尾款开始时间：" prop="gmtFinalPaymentStart" class="w360">
                  <el-date-picker
                    :disabled="disable"
                    type="datetime"
                    placeholder="尾款开始时间"
                    v-model="tableForm.gmtFinalPaymentStart"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions2"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="尾款结束时间：" prop="gmtActivityEnd" class="w360">
                  <el-date-picker
                    :disabled="disable"
                    type="datetime"
                    placeholder="尾款结束时间"
                    v-model="tableForm.gmtActivityEnd"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions3"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
            <el-form-item label="活动名称：" prop="name">
              <el-input
                :disabled="disable"
                placeholder="活动名称"
                v-model="tableForm.name"
                class="w240 mr20"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动描述：">
              <el-input
                :disabled="disable"
                placeholder="活动描述"
                type="textarea"
                v-model="tableForm.description"
                class="w500 mr20"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动商品：" prop="goods">
              <template>
                <div style="display: flex; margin-top:40px; width:100%;">
                  <div class="float-left text-center">
                    <div class="w120 flex"><div class="color_red">*</div>商品ID</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120">商品名称</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120 flex"><div class="color_red">*</div>sku编码</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120">规格一</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120">规格二</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120">成本价</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120">库存</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120 flex"><div class="color_red">*</div>活动价</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120 flex"><div class="color_red">*</div>预付金额</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120 flex"><div class="color_red">*</div>抵用金额</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120 flex"><div class="color_red">*</div>活动库存</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120">限购数量</div>
                  </div>
                  <div class="float-left text-center">
                    <div class="w120">操作</div>
                  </div>
                </div>
              </template>
            </el-form-item>
            <!-- <el-form-item prop="goodsPerSaleList" > -->
            <el-form-item>
              <div
                v-for="(item ,index) in tableForm.goodsPerSaleList"
                :key="item.index"
                class="mb20 ml20"
                style="display:flex;"
              >
                <!-- :prop="'goodsPerSaleList.'+index+'.goodsId'"
                :rules="goodsPerSaleList.goodsId"-->
                <el-form-item
                  class="w100 mb20 mr20"
                  :prop="'goodsPerSaleList.'+index+'.goodsId'"
                  :rules="goodsPerSaleList.goodsId"
                >
                  <el-input
                    :disabled="disable"
                    placeholder="商品ID"
                    @blur="getGoodName(index)"
                    v-model="item.goodsId"
                    class="w100"
                  ></el-input>
                </el-form-item>

                <span class="w100 mr20">{{item.goodsName}}</span>
                <el-form-item
                  :prop="'goodsPerSaleList.'+index+'.skuId'"
                  :rules="goodsPerSaleList.skuId"
                >
                  <el-input
                    :disabled="disable"
                    placeholder="sku编码"
                    @blur="getSku(index)"
                    v-model="item.skuId"
                    class="w100 mr20"
                  ></el-input>
                </el-form-item>
                <span class="w100 mr20">{{item.specificationsOne}}</span>
                <span class="w100 mr20">{{item.specificationsTwo}}</span>
                <span class="w100 mr20">{{item.costPrice}}</span>
                <span class="w100 mr20">{{item.remainCount}}</span>
                <el-form-item
                  :prop="'goodsPerSaleList.'+index+'.activityPrice'"
                  :rules="goodsPerSaleList.activityPrice"
                >
                  <el-input
                    :disabled="disable"
                    placeholder="活动价"
                    type="number"
                    v-model.number="item.activityPrice"
                    class="w100 mr20"
                    :class="activityPrice(item,index)"
                    :blur="activityPrice(item,index)"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  :prop="'goodsPerSaleList.'+index+'.prepaidPrice'"
                  :rules="goodsPerSaleList.prepaidPrice"
                >
                  <el-input
                    :disabled="disable"
                    placeholder="预付金额"
                    type="number"
                    v-model.number="item.prepaidPrice"
                    class="w100 mr20"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  :prop="'goodsPerSaleList.'+index+'.offsetPrice'"
                  :rules="goodsPerSaleList.offsetPrice"
                >
                  <el-input
                    :disabled="disable"
                    type="number"
                    placeholder="抵用金额"
                    v-model.number="item.offsetPrice"
                    class="w100 mr20"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  :prop="'goodsPerSaleList.'+index+'.activeInventory'"
                  :rules="goodsPerSaleList.activeInventory"
                >
                  <el-input
                    :disabled="disable && limit"
                    placeholder="活动库存"
                    type="number"
                    v-model.number="item.activeInventory"
                    :class="inventoryFocus(item,index)"
                    :blur="inventoryFocus(item,index)"
                    class="w100 mr20"
                  ></el-input>
                </el-form-item>
                <el-form-item :prop="'goodsPerSaleList.'+index+'.limitPurchaseCount'"
                :rules="goodsPerSaleList.limitPurchaseCount">
                <el-input
                  :disabled="disable"
                  placeholder="限购数量"
                  type="number"
                  v-model.number="item.limitPurchaseCount"
                  @keyup.native="number($event)"
                  class="w100 mr20"
                ></el-input>
                </el-form-item>
                <el-button
                  type="danger"
                  style="background:#F36161;color:#333333"
                  class="ml20"
                  v-if="!disable"
                  @click="properDel(index)"
                >删除</el-button>
                <!-- v-if="tableForm.goodsPerSaleList.length >1 && !disable " -->
                <!-- <el-button v-if="item.showAdd" type="primary"  @click="properAdd" class="ml20">增加</el-button>-->
              </div>
            </el-form-item>
            <el-form-item v-if="!disable">
              <el-button type="danger" @click="properAdd" class="mt20">新增sku</el-button>
            </el-form-item>
            <el-form-item v-if="!disable || !limit">
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
import labelsClassificationService from "../../service/categoryManagement/advanceManagement.js";
// import apiHost from "@/hostconfig/index";
export default {
  data() {
    return {
      // titleList: [
      //     {
      //         title:"商品ID"
      //     },
      //     {
      //         title:"商品名称"
      //     },
      //     {
      //         title:"商品条形码"
      //     },
      //     {
      //         title:"规格一"
      //     },
      //     {
      //         title:"规格二"
      //     },
      //     {
      //         title:"成本价"
      //     },
      //     {
      //         title:"库存"
      //     },
      //     {
      //         title:"活动价"
      //     },
      //     {
      //         title:"活动库存"
      //     },
      //     {
      //         title:"限购数量"
      //     },
      //     {
      //         title:"操作"
      //     },
      // ],

      title: "",
      disable: false,
      limit: false,
      labelsTypeOptions: [],
      //   uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      imagePath: "",
      buttonStatus: 0,
      redText:"",
      inventoryClass:"",
      isUpdate: false,
      tableForm: {
        id: null,
        goods: "1",
        goodsPerSaleList: []
      },
      rules: {
        gmtPerSaleStart: [
          { required: true, message: "请选择开始时间", trigger: "change" }
        ],
        gmtPerSaleEnd: [
          { required: true, message: "请选择结束时间", trigger: "change" }
        ],
        gmtFinalPaymentStart: [
          { required: true, message: "请选择尾款开始时间", trigger: "change" }
        ],
        gmtActivityEnd: [
          { required: true, message: "请选择尾款结束时间", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],

        goods: [
          { required: true, message: "请输入标签名称" }
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
      goodsPerSaleList: {
        goodsId: [{ required: true, message: "请输入商品ID", trigger: "blur" }],
        skuId: [{ required: true, message: "请输入sku编码", trigger: "blur" }],
        activityPrice: [
          { required: true, message: "请输入活动价", trigger: "blur" },
          {
            type: "number",
            min: 0,
            message: "活动价不能小于0",
            trigger: "blur"
          }
        ],
        activeInventory: [
          { required: true, message: "请输入活动库存", trigger: "blur" },
          {
            type: "number",
            min: 0,
            message: "活动库存不能小于0",
            trigger: "blur"
          }
        ],
        prepaidPrice: [
          { required: true, message: "请输入预付金额", trigger: "blur" },
          {
            type: "number",
            min: 0,
            message: "预付金额不能小于0",
            trigger: "blur"
          }
        ],
        offsetPrice: [
          { required: true, message: "请输入抵用金额", trigger: "blur" },
          {
            type: "number",
            min: 0,
            message: "抵用金额不能小于0",
            trigger: "blur"
          }
        ],
        limitPurchaseCount: [
          {
            type: "number",
            
            message: "限购数量不能小于1",
            trigger: "blur",
            required: false,
            validator:(rule,value,callback)=>{
              if(value!=null && value != "" || value === 0){
                  if((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) == false || value === 0){
                    callback(new Error("请填写大于0的数字"));
                  }else{
                 callback();
                  }
            }else{
             callback();
            }
            },
            min: 1,
          }
        ],
      },

      pickerOptions0: {
            disabledDate: (time) => {
              
                if (this.tableForm.gmtPerSaleEnd && this.tableForm.gmtPerSaleEnd != "") {
                  
                    return  time.getTime() > new Date(this.tableForm.gmtEnd.replace(/-/g, '/')).getTime() ;
                } else {
                 
                    return false;
                }

            }
        },
        pickerOptions1: {
            disabledDate: (time) => {
              if (this.tableForm.gmtPerSaleStart && this.tableForm.gmtPerSaleStart != "") {
                return time.getTime() < new Date(this.tableForm.gmtPerSaleStart.replace(/-/g, '/')).getTime() ;
              }else {
                return false ;
              }
                
            }
        },

        pickerOptions2: {
            disabledDate: (time) => {
              
                if (this.tableForm.gmtActivityEnd && this.tableForm.gmtActivityEnd != "") {
                  let fifteen = 14 * 24 * 60 *60*1000;

                    return  time.getTime() > new Date(this.tableForm.gmtEnd.replace(/-/g, '/')).getTime() || time.getTime() < new Date(this.tableForm.gmtEnd.replace(/-/g, '/')).getTime() - fifteen ;
                } else {
                 
                    return false;
                }

            }
        },
        pickerOptions3: {
            disabledDate: (time) => {
              if (this.tableForm.gmtFinalPaymentStart && this.tableForm.gmtFinalPaymentStart != "") {
                let fifteen = 14 * 24 * 60 *60*1000;
                return time.getTime() < new Date(this.tableForm.gmtFinalPaymentStart.replace(/-/g, '/')).getTime()  || time.getTime() > new Date(this.tableForm.gmtFinalPaymentStart.replace(/-/g, '/')).getTime() + fifteen;
              }else {
                return false ;
              }
                
            }
        }

    };
  },
  created() {
    const routeName = this.$route.name || "";
    const id = this.$route.query.id || "";
    console.log("id===", id);
    this.tableForm.id = id;
    if (routeName === "addAdvance") {
      // this.tableForm.goodsId = 5;
      //   this.getDetails(routeName);
      this.title = "新建预售活动";
    } else if (routeName === "checkAdvance") {
      this.title = "查看预售活动";
      this.getDetails(routeName);
    } else if (routeName === "updateAdvance") {
      this.title = "编辑预售活动";
      this.getDetails(routeName);
    }
  },
  methods: {
    // 活动库存失去焦点
    activityPrice (item,index){
      let redText = "";
      if(item.activityPrice < item.costPrice){
        redText = 'red_color'
      }else {
        redText = ''
      }
      return redText;
    },
    // 活动库存失去焦点
    inventoryFocus(item,index){
      let inventoryClass = "";
      if(item.remainCount < item.activeInventory){
        inventoryClass = 'red_color'
      }else {
        inventoryClass = ''
      }
      return inventoryClass;
    },
    number(e){　　
      
　　　 var keynum = window.event ? e.keyCode : e.which
      var keychar = String.fromCharCode(keynum)
      if (keynum ==189 || keynum==190||keynum ==110 ||keynum == 109 ) {
        this.$message.warning("禁止输入小数以及负数")
        e.target.value = ''
      }
　　},

    // 获取sku
    getSku(index) {
      let param = {
            activityId: this.tableForm.id,
            goodsId:this.tableForm.goodsPerSaleList[index].goodsId,
            skuId:this.tableForm.goodsPerSaleList[index].skuId
          }
          const data = this.handparams(param);
      labelsClassificationService.getSku(data).then(
        response => {
          //console.debug('response===',response.data)
          if (response.code === "20000" && response.data) {
            this.tableForm.goodsPerSaleList[index].specificationsOne =
              response.data.specificationsOne;
            this.tableForm.goodsPerSaleList[index].specificationsTwo =
              response.data.specificationsTwo;
            this.tableForm.goodsPerSaleList[index].costPrice =
              response.data.costPrice;
            this.tableForm.goodsPerSaleList[index].remainCount =
              response.data.remainCount;
          } else {
            // alert(response.msg || '新增任务失败')
            this.tableForm.goodsPerSaleList[index].specificationsOne = "找不到";
            this.tableForm.goodsPerSaleList[index].specificationsTwo = "找不到";
            this.tableForm.goodsPerSaleList[index].costPrice = "找不到";
            this.tableForm.goodsPerSaleList[index].remainCount = "找不到";
            this.tableForm.goodsPerSaleList[index].skuId = "";
            this.$message.error("获取sku信息失败!");
          }
        },
        response => {
          this.tableForm.goodsPerSaleList[index].specificationsOne = "找不到";
          this.tableForm.goodsPerSaleList[index].specificationsTwo = "找不到";
          this.tableForm.goodsPerSaleList[index].costPrice = "找不到";
          this.tableForm.goodsPerSaleList[index].remainCount = "找不到";
          this.tableForm.goodsPerSaleList[index].skuId = "";
          this.$message.error("获取sku信息失败!");
        }
      );
    },
    // 获取商品名字
    getGoodName(index) {
      const data = this.tableForm.goodsPerSaleList[index].goodsId;
      labelsClassificationService.getDetails(data).then(
        response => {
          //console.debug('response===',response.data)
          if (response.code === "20000" && response.data) {
            this.tableForm.goodsPerSaleList[index].goodsName =
              response.data.name;
          } else {
            // alert(response.msg || '新增任务失败')
            this.tableForm.goodsPerSaleList[index].goodsName = "找不到";
            this.tableForm.goodsPerSaleList[index].goodsId = "";
            this.$message.error("获取商品名称失败!");
          }
        },
        response => {
          this.tableForm.goodsPerSaleList[index].goodsName = "找不到";
          this.tableForm.goodsPerSaleList[index].goodsId = "";
          this.$message.error("获取商品名称失败!");
        }
      );
    },
    // 删除属性值
    properDel(index) {
      if (index > -1) {
        this.tableForm.goodsPerSaleList.splice(index, 1);
      }
      // this.tableForm.tagItemList[this.tableForm.tagItemList.length - 1].showAdd = true;
    },

    submitForm(formName) {
      this.tableForm.goods = "1";
      this.$refs[formName].validate(valid => {
        if (valid) {
          let prepaidPriceCommit = true;
          for (let index = 0; index < this.tableForm.goodsPerSaleList.length; index++) {
            const element = this.tableForm.goodsPerSaleList[index];
            
            if (element.prepaidPrice >= element.activityPrice ) {
               prepaidPriceCommit = false;
              break;
            }
          }
           if ( prepaidPriceCommit) {
             let offsetPriceCommit = true;
             let offsetPriceCommitActivity = true;
          for (let index = 0; index < this.tableForm.goodsPerSaleList.length; index++) {
            const element = this.tableForm.goodsPerSaleList[index];
            
            if (element.offsetPrice < element.prepaidPrice ) {
               offsetPriceCommit = false;
              break;
            }
            if (element.offsetPrice >= element.activityPrice ) {
               offsetPriceCommitActivity = false;
              
            }
          }
          if (offsetPriceCommit) {
            if (offsetPriceCommitActivity) {
              this.commitInfo();
            } else {
              this.$message.error("抵用金额不允许大于等于活动价")
            }
          } else {
             this.$message.error("抵用金额不允许小于预付金额")
          }
          }else {
            this.$message.error("预付金额不允许大于等于活动价")
          }
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
      //   this.tableForm.goodsPerSaleList[this.tableForm.goodsPerSaleList.length - 1].showAdd = false;
      let a = {
        goodsId: null,
        skuId: null,
        activityPrice: null,
        activeInventory: null,
        limitPurchaseCount: null,
        goodsName: null,
        specificationsOne: null,
        specificationsTwo: null,
        costPrice: null,
        remainCount: null
      };
      this.tableForm.goodsPerSaleList.push(a);
    },

    cancel() {
      this.$router.go(-1);
    },

    // 新增任务、编辑任务
    commitInfo() {
      this.tableForm.goods = "";
      const data = this.handparams(this.tableForm);
      //   console.log("data===",data)
      const routeName = this.$route.name || "";

      if (routeName === "addAdvance") {
        labelsClassificationService.addActivitySpike(data).then(
          response => {
            //console.debug('response===',response.data)
            if (response.code === "20000") {
              //   this.$router.push({ path: "/merchandiseManagement" });
              this.$router.go(-1);
            } else {
              // alert(response.msg || '新增任务失败')
              this.$message.error(
                response.message ||
                  response.subMsg ||
                  response.msg ||
                  "新增活动失败!"
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
        labelsClassificationService.updateActivitySpike(data).then(
          response => {
            //console.debug('response===',response.data)
            if (response.code === "20000") {
              this.$router.go(-1);
            } else {
              // alert(response.msg || '新增任务失败')
              this.$message.error(
                response.message ||
                  response.subMsg ||
                  response.msg ||
                  "编辑活动失败!"
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
      const param = this.tableForm.id;
      labelsClassificationService.getActivitySpikeDetail(param).then(
        response => {
          const detail = response.data || "";
          // this.tableForm.categoryPid = id;
          this.tableForm = detail;
          if (this.tableForm.status === 2 || this.tableForm.status === 3) {
            this.disable = true;
            this.limit = false;
          } else {
            this.limit = true;
          }
          if (routeName === "checkAdvance") {
            this.limit = true;
            this.disable = true;
          }
        },
        response => {
          this.$message.error(
            response.subMsg ||
              response.message ||
              response.msg ||
              "请求服务器连接失败!"
          );
        }
      );
    },
    //参数处理
    handparams(param) {
      const self = this;
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
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.red_color .el-input__inner  {
  color: rgb(255, 64, 64);
}
</style>

