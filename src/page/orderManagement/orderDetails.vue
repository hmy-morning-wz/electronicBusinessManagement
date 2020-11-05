<template>
  <div>
    <template>
      <div style="margin-left:80px; margin-top:40px">
        <el-form ref="tableForm" :model="tableForm" label-width="120px" :rules="rules">

          <span>订单信息</span>
          <el-form-item label="订单编号：" >
            <span>{{tableForm.orderNo}}</span>
          </el-form-item>
          <el-form-item label="外部订单编号：" >
            <span>{{tableForm.thirdOrderNo}}</span>
          </el-form-item>
          <el-form-item label="下单时间：" >
            <span>{{tableForm.orderTime}}</span>
          </el-form-item>
          <el-form-item label="付款时间：" >
            <span>{{tableForm.payTime}}</span>
          </el-form-item>
          <el-form-item label="收货地址：" >
            <span>{{tableForm.address}}</span>
          </el-form-item>
          <el-form-item label="物流公司：" >
            <span>{{tableForm.logistic}}</span>
          </el-form-item>
          <el-form-item label="物流单号：" >
            <span>{{tableForm.mailNo}}</span>
          </el-form-item>
          <el-form-item label="核销备注：" >
            <span>{{tableForm.remark}}</span>
          </el-form-item>
          <el-form-item label="运营备注：" >
            <span>{{tableForm.operationRemark}}</span>
          </el-form-item>
          <el-form-item label="订单状态：" >
            <span>{{tableForm.orderStatusName}}</span>
          </el-form-item>
          <el-form-item label="渠道来源：" >
            <span>{{tableForm.channel}}</span>
          </el-form-item>

          <span>商品信息</span>
          <el-form-item label="商品名称：" >
            <span>{{tableForm.goodsName}}</span>
          </el-form-item>
          <el-form-item label="价格：" >
            <span>{{tableForm.sellingPrice}}</span>
          </el-form-item>
          <el-form-item label="数量：" >
            <span>{{tableForm.count}}</span>
          </el-form-item>
          <el-form-item label="活动：" >
            <span>{{tableForm.activity}}</span>
          </el-form-item>
          <!-- <el-form-item label="供应商：" >
            <span>{{tableForm.brandName}}</span>
          </el-form-item> -->

          <span>支付详情</span>
          
          <el-form-item label="优惠：" >
            <span>{{tableForm.discountPrice}}</span>
          </el-form-item>
          <el-form-item label="应付：" >
            <span>{{tableForm.needPayPrice}}</span>
          </el-form-item>
          <el-form-item label="返利：" >
            <span>{{tableForm.rebate}}</span>
          </el-form-item>

          <span>退款信息</span>
          <el-form-item label="退款时间" >
            <span>{{tableForm.refundTime}}</span>
          </el-form-item>
          <el-form-item label="退款状态：" >
            <span>{{tableForm.refundStatusName}}</span>
          </el-form-item>
          <el-form-item label="退款：" >
            <span>{{tableForm.refundAmt}}</span>
          </el-form-item>
          <el-form-item label="退款原因：" >
            <span>{{tableForm.refundReason}}</span>
          </el-form-item>
          <!-- <el-form-item label="分类描述" prop="categoryDesc">
            <el-input
              :disabled="disable"
              type="textarea"
              placeholder="分类描述"
              v-model="tableForm.categoryDesc"
              class="w500"
            ></el-input>
          </el-form-item>-->
          <el-form-item v-if="tableForm.orderStatus != 1 && tableForm.orderStatus !=-1 && tableForm.refundStatus != 0  && tableForm.refundStatus != 1
          &&  tableForm.orderStatus != 6 && tableForm.orderStatus != 7 " class="text-center">
            <el-button type="danger" @click="saleRefund" class="mt20">售后退款</el-button>
            <el-dialog title="售后退款" :visible.sync="saleRefundVisible">
                  <el-row>
                    <el-form ref="tableForm1" :model="tableForm1" label-width="120px" :rules="rules">
                      <el-form-item label="退款金额" prop="refundAmt">
                        <el-input v-model="tableForm1.refundAmt" class="w240" placeholder="退款金额"></el-input>
                      </el-form-item>
                      <el-form-item label="退款原因" style="margin-top:40px;" prop="refundReason">
                        <el-input
                          type="textarea"
                          v-model="tableForm1.refundReason"
                          class="w240"
                          placeholder="退款原因"
                        ></el-input>
                      </el-form-item>

                      <el-form-item class="text-center">
                        <el-button
                          type="primary"
                          @click="submitForm('tableForm1')"
                          class="mt20"
                        >提交</el-button>
                        <el-button type="primary" @click="cancelDialog()" class="mt20">取消</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                      </el-form-item>
                    </el-form>
                    <!-- <el-button class="mt20" type="primary"  @click="cityCommit()">确认</el-button>
                    <el-button class="mt20" type="danger" @click="cityCommit()">取消</el-button>-->
                  </el-row>
                </el-dialog>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import labelsClassificationService from "../../service/categoryManagement/orderManagement.js";
import apiHost from "@/hostconfig/index";
export default {
  data() {
    return {
      
      tableForm: {
        
      },
      tableForm1: {
        orderNo: "",
        refundAmt: "",
        refundReason: ""
      },
      saleRefundVisible: false,
      rules: {
        categoryName: [
          { required: true, message: "请输入中文名称", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        // categoryDesc: [
        //   { required: true, message: "请输入分类描述", trigger: "blur" }
        // ],
        imgPic:[
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
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
    const routeName = this.$route.name || "";
    
    this.getDetails(routeName);

  },
  methods: {
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
    cancelDialog() {
      this.saleRefundVisible = false;
    },

    refundReason() {
      this.tableForm1.orderNo = this.tableForm.orderNo;
      const data = this.handparams();
      labelsClassificationService.refundReason(data).then(
        response => {
          if (response.code === "20000") {
            this.saleRefundVisible = false;
            const routeName = this.$route.name || "";
            this.getDetails(routeName);
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

     saleRefund() {
      this.saleRefundVisible = true;
    },

    cancel() {
      this.$router.go(-1);
    },

    
    //获取详情
    getDetails(routeName) {
      const id = this.$route.query.id;
      // console.debug('id===',id)
      const param = id;
      labelsClassificationService.getDetails(param).then(
        response => {
          if (response.code === "20000") {
            const detail = response.data || "";
          this.tableForm = detail;
          }else{
            this.$message.error(
            response.message ||
              response.msg ||
              response.sub_msg ||
              "获取详情失败!"
          );
          }
          
          
        },
        response => {
          this.$message.error(
            response.message ||
              response.msg ||
              response.sub_msg ||
              "请求服务器连接失败!"
          );
        }
      );
    },
    //参数处理
    handparams() {
      const self = this;
      const params = JSON.parse(JSON.stringify(self.tableForm1));
      // for (const i in params) {
      //     if (params[i] === "") {
      //         delete params[i]
      //     }
      // }
      // console.log("data===" + JSON.stringify(params))
      return params;
    },

     submitUpload() {
          if (this.imagePath) {
            this.buttonStatus = 1
            this.$refs.upload.submit()
          }else{
            //   alert('请先选择图片')
            this.$message.error('请先选择图片!')
          }

      },

    handleAwardSuccess(res, file, fileList) {
      this.buttonStatus = 2;
      this.tableForm.imgPic = "https://" + res.data;
      this.imagePath = this.tableForm.imgPic;
      this.isUpload = true;
      // alert('图片上传成功！')
    },
    photoSuccess() {
      this.$message.error("请先修改图片!");
    },
    //图片上传失败
    handleAwardError(err, file, fileList) {
      // alert('图片上传失败！')
      this.$message.error("图片上传失败!");
      this.buttonStatus = 0;
      // this.tableForm.imgPic = ''
    },
    // 上传图片之前限制图片大小
    beforeAwardUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // console.debug('upload===')
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
        this.imagePath = this.tableForm.imgPic;
        this.buttonStatus = 0;
        this.isUpload = false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        this.imagePath = this.tableForm.imgPic;
        this.buttonStatus = 0;
        this.isUpload = false;
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      // console.debug(file, fileList);
      if (fileList.length === 0) {
        this.imagePath = "";
      }
    },
    handlePreview(file) {
      // console.debug(file);
    },
    fileOnChange(file, fileList) {
      // console.debug("fileList.size==",fileList.length)
      if (fileList.length != 1) {
        this.imagePath = URL.createObjectURL(file.raw);
      } else if (this.isUpload === false) {
        this.imagePath = URL.createObjectURL(file.raw);
        this.imagePath = URL.createObjectURL(file.raw);
        this.imagePath = URL.createObjectURL(file.raw);
        this.imagePath = URL.createObjectURL(file.raw);
        this.imagePath = URL.createObjectURL(file.raw);
      } else {
        this.imagePath = this.tableForm.imgPic;
      }
      // if(this.buttonStatus != 2){
      //     this.tableForm.imgPic = ''
      // }
      if (this.imagePath === this.tableForm.imgPic) {
        this.buttonStatus = 2;
      } else {
        this.buttonStatus = 0;
      }
      if (fileList.length === 0) {
        this.imagePath = "";
        this.tableForm.imgPic = "";
      } else if (fileList.length === 1) {
        this.imagePath = URL.createObjectURL(fileList[0].raw);
      } else {
        this.buttonStatus = 0; //修改上传按钮状态
        fileList.shift();
        this.imagePath = URL.createObjectURL(fileList[0].raw);
      }
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
</style>

