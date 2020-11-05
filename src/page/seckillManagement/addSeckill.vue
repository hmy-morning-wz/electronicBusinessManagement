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
              <el-form-item label="开始时间：" prop="gmtStart" class="w360">
                <el-date-picker
                  :disabled="disable"
                  type="datetime"
                  placeholder="开始时间"
                  v-model="tableForm.gmtStart"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions0"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="结束时间：" prop="gmtEnd" class="w360">
                <el-date-picker
                  :disabled="disable"
                  type="datetime"
                  placeholder="结束时间"
                  v-model="tableForm.gmtEnd"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions1"
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
              <div style="display: flex; margin-top:40px; width:1440px;">
                <div class="float-left text-center">
                    
                  <div class="w120 flex" prop="goodsId">
                      <div class="color_red">*</div>商品ID</div>
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
                  <div class="w120 flex"> <div class="color_red">*</div>活动价</div>
                </div>
                <div class="float-left text-center">
                  <div class="w120 flex"><div class="color_red">*</div>活动库存</div>
                </div>
                <div class="float-left text-center">
                  <div class="w120">限购数量</div>
                </div>
                <div class="float-left text-center">
                  <div class="w120">权重</div>
                </div>
                <div class="float-left text-center">
                  <div class="w120">操作</div>
                </div>
              </div>
            </template>
          </el-form-item>
          <!-- <el-form-item prop="goodsSpikeList" > -->
          <el-form-item>
            <div
              v-for="(item ,index) in tableForm.goodsSpikeList"
              :key="item.index"
              class="mb20 ml20"
              style="display:flex;"
            >
              <!-- :prop="'goodsSpikeList.'+index+'.goodsId'"
              :rules="goodsSpikeList.goodsId"-->
              <el-form-item class="w100 mb20 mr20" :prop="'goodsSpikeList.'+index+'.goodsId'"
                :rules="goodsSpikeList.goodsId">
                <el-input :disabled="disable" placeholder="商品ID" @blur="getGoodName(index)" v-model="item.goodsId" class="w100"></el-input>
              </el-form-item>

              <span  class="w100 mr20">{{item.goodsName}}</span>
              <el-form-item :prop="'goodsSpikeList.'+index+'.skuId'"
                :rules="goodsSpikeList.skuId">
              <el-input
                :disabled="disable"
                placeholder="sku编码"
                @blur="getSku(index)"
                v-model="item.skuId"
                class="w100 mr20"
              ></el-input>
              </el-form-item>
              <span
                class="w100 mr20"
                
              >{{item.specificationsOne}}</span>
              <span
                class="w100 mr20"
                
              >{{item.specificationsTwo}}</span>
              <span
                class="w100 mr20"
                
              >{{item.costPrice}}</span>
              <span
                class="w100 mr20"
                
              >{{item.remainCount}}</span>
              <el-form-item :prop="'goodsSpikeList.'+index+'.activityPrice'"
                :rules="goodsSpikeList.activityPrice">
              <el-input
                :disabled="disable"
                placeholder="活动价"
                type="number"
                v-model.number="item.activityPrice"
                class="w100 mr20"
                :class="activityPrize(item,index)"
                :blur="activityPrize(item,index)"
              ></el-input>
              <!-- {{ }} -->
              </el-form-item>
              <el-form-item :prop="'goodsSpikeList.'+index+'.activeInventory'"
                :rules="goodsSpikeList.activeInventory">
              <el-input
                :disabled="disable && limit"
                placeholder="活动库存"
                type="number"
                v-model.number="item.activeInventory"
                class="w100 mr20 "
                :class="inventoryFocus(item,index)"
                :blur="inventoryFocus(item,index)"
              ></el-input>
              </el-form-item>
              <el-form-item :prop="'goodsSpikeList.'+index+'.limitPurchaseCount'"
                :rules="goodsSpikeList.limitPurchaseCount">
              <el-input
                :disabled="disable"
                placeholder="限购数量"
                type="number"
                @keyup.native="number($event)"
                v-model.number="item.limitPurchaseCount"
                class="w100 mr20"
              ></el-input>
              </el-form-item>
              <el-form-item :prop="'goodsSpikeList.'+index+'.weight'"
                :rules="goodsSpikeList.weight">
              <el-input
                :disabled="disable"
                placeholder="权重"
                type="number"
                @keyup.native="number($event)"
                v-model.number="item.weight"
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
              <!-- v-if="tableForm.goodsSpikeList.length >1 && !disable " -->
              <!-- <el-button v-if="item.showAdd" type="primary"  @click="properAdd" class="ml20">增加</el-button>-->
            </div>
          </el-form-item>
          <el-form-item v-if="!disable" >
            <el-button type="danger" @click="properAdd" class="mt20">新增sku</el-button>
          </el-form-item>
          <el-form-item v-if="!disable || !limit" >
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
import labelsClassificationService from "../../service/categoryManagement/seckillManagement.js";
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
      limit : false,
      labelsTypeOptions: [],
      //   uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      imagePath: "",
      buttonStatus: 0,
      redText : '',
      inventoryClass: '',
      isUpdate: false,
      tableForm: {
        id: null,
        goods:"1",
        goodsSpikeList: []
      },
      rules: {
        gmtStart: [
          { required: true, message: "请选择开始时间", trigger: "change" }
        ],
        gmtEnd: [
          { required: true, message: "请选择结束时间", trigger: "change" }
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
      goodsSpikeList: {
        goodsId: [
          { required: true, message: "请输入商品ID", trigger: "blur" }
        ],
        skuId: [
          { required: true, message: "请输入sku编码", trigger: "blur" }
        ],
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
        limitPurchaseCount: [
          {
            type: "number",
            min: 1,
            message: "限购数量不能小于1",
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
        weight: [
          {
            type: "number",
            min: 1,
            message: "权重不能小于1",
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
          }
        ],
      },
      pickerOptions0: {
            disabledDate: (time) => {
              
                if (this.tableForm.gmtEnd && this.tableForm.gmtEnd != "") {
                  
                    return  time.getTime() > new Date(this.tableForm.gmtEnd.replace(/-/g, '/')).getTime() ;
                } else {
                 
                    return false;
                }

            }
        },
        pickerOptions1: {
            disabledDate: (time) => {
              if (this.tableForm.gmtStart && this.tableForm.gmtStart != "") {
                return time.getTime() < new Date(this.tableForm.gmtStart.replace(/-/g, '/')).getTime() ;
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
    if (routeName === "addSeckill") {
      // this.tableForm.goodsId = 5;
    //   this.getDetails(routeName);
     this.title = "新建秒杀活动";
    } else if (routeName === "checkSeckill") {
        this.title = "查看秒杀活动";
      this.getDetails(routeName);
    } else if (routeName === "updateSeckill") {
        this.title = "编辑秒杀活动";
      this.getDetails(routeName);
    }
  },
  methods: {
    activityPrize(item,index){
      let redText = ""
      console.log("item====",item);
      if(item.activityPrice < item.costPrice){
        redText = 'red_color'
      }else {
        redText = ''
      }
      console.log("redText====",this.redText);
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
      getSku (index) {
          
          let param = {
            activityId: this.tableForm.id,
            goodsId:this.tableForm.goodsSpikeList[index].goodsId,
            skuId:this.tableForm.goodsSpikeList[index].skuId
          }
          const data = this.handparams(param);
          labelsClassificationService.getSku(data).then(
          response => {
            //console.debug('response===',response.data)
            if (response.code === "20000" && response.data) {
              this.tableForm.goodsSpikeList[index].specificationsOne = response.data.specificationsOne;
              this.tableForm.goodsSpikeList[index].specificationsTwo = response.data.specificationsTwo;
              this.tableForm.goodsSpikeList[index].costPrice = response.data.costPrice;
              this.tableForm.goodsSpikeList[index].remainCount = response.data.remainCount;
            } else {
              // alert(response.msg || '新增任务失败')
              this.tableForm.goodsSpikeList[index].specificationsOne = "找不到";
              this.tableForm.goodsSpikeList[index].specificationsTwo = "找不到";
              this.tableForm.goodsSpikeList[index].costPrice = "找不到";
              this.tableForm.goodsSpikeList[index].remainCount = "找不到";
              this.tableForm.goodsSpikeList[index].skuId= "";
              this.$message.error(
                  "获取sku信息失败!"
              );
            }
          },
          response => {
             this.tableForm.goodsSpikeList[index].specificationsOne = "找不到";
              this.tableForm.goodsSpikeList[index].specificationsTwo = "找不到";
              this.tableForm.goodsSpikeList[index].costPrice = "找不到";
              this.tableForm.goodsSpikeList[index].remainCount = "找不到";
              this.tableForm.goodsSpikeList[index].skuId= "";
            this.$message.error(
                "获取sku信息失败!"
            );
          }
        );
      },
      // 获取商品名字
      getGoodName (index) {
          const data = this.tableForm.goodsSpikeList[index].goodsId;
          labelsClassificationService.getDetails(data).then(
          response => {
            //console.debug('response===',response.data)
            if (response.code === "20000" && response.data) {
              this.tableForm.goodsSpikeList[index].goodsName = response.data.name;
            } else {
              // alert(response.msg || '新增任务失败')
              this.tableForm.goodsSpikeList[index].goodsName = "找不到";
              this.tableForm.goodsSpikeList[index].goodsId = "";
              this.$message.error(
                  "获取商品名称失败!"
              );
            }
          },
          response => {
              this.tableForm.goodsSpikeList[index].goodsName = "找不到";
              this.tableForm.goodsSpikeList[index].goodsId = "";
            this.$message.error(
                "获取商品名称失败!"
            );
          }
        );
      },
    // 删除属性值
    properDel(index) {
      if (index > -1) {
        this.tableForm.goodsSpikeList.splice(index, 1);
      }
      // this.tableForm.tagItemList[this.tableForm.tagItemList.length - 1].showAdd = true;
    },

    submitForm(formName) {
        this.tableForm.goods = "1";
      this.$refs[formName].validate(valid => {
        if (valid) {
          let canCommit = true;
          for (let index = 0; index < this.tableForm.goodsSpikeList.length; index++) {
            const element = this.tableForm.goodsSpikeList[index];
            
            if (element.activeInventory > element.remainCount ) {
               canCommit = false;
              break;
            }
          }
          
          if ( canCommit) {
            this.commitInfo();
          }else {
            this.$message.error("活动库存不可高于现有库存")
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
      //   this.tableForm.goodsSpikeList[this.tableForm.goodsSpikeList.length - 1].showAdd = false;
      let a = {
        goodsId: null,
        skuId: null,
        activityPrice:null,
        activeInventory:null,
        limitPurchaseCount:null,
        goodsName:null,
        specificationsOne: null,
        specificationsTwo: null,
        costPrice: null,
        remainCount: null
      };
      this.tableForm.goodsSpikeList.push(a);
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
      
      if (routeName === "addSeckill") {

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
          if (this.tableForm.status ===2 || this.tableForm.status === 3) {
              this.disable = true;
              this.limit = false;
          }else {
              this.limit = true;
          }
          if (routeName === "checkSeckill") {
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
    handparams( param) {
      const self = this;
      const params = JSON.parse(JSON.stringify(param));
      // for (const i in params) {
      //     if (params[i] === "") {
      //         delete params[i]
      //     }
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

