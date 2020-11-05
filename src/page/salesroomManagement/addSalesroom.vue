<template>
  <div>
    <template>
      <div style="margin-left:80px; margin-top:40px">
        <el-form ref="tableForm" :model="tableForm" label-width="120px" :rules="rules">
            <el-form-item label="门店信息"></el-form-item>
          <el-form-item label="品牌名称：" prop="brandName">
            <el-input
              v-model="tableForm.brandName"
              :disabled="disable || noUpdate"
              class="w240"
              placeholder="品牌名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="商家编码：" prop="shopCode">
            <el-input
              v-model="tableForm.shopCode"
              :disabled="disable || noUpdate"
              class="w240"
              placeholder="商家编码"
            ></el-input>
          </el-form-item>
          <el-form-item label="店名：" prop="shopName">
            <el-input
              :disabled="disable || noUpdate"
              placeholder="店名"
              v-model="tableForm.shopName"
              class="w500"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="地址：" prop="address">
            <el-input
              :disabled="disable"
              placeholder="地址"
              v-model="tableForm.address"
              class="w500"
            ></el-input>
          </el-form-item>
          <el-form-item label="经度：" prop="longitude">
            <el-input
              :disabled="disable"
              placeholder="经度"
              v-model="tableForm.longitude"
              class="w500"
            ></el-input>
          </el-form-item>
          <el-form-item label="纬度：" prop="latitude">
            <el-input
              :disabled="disable"
              placeholder="纬度"
              v-model="tableForm.latitude"
              class="w500"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="phone">
            <el-input
              :disabled="disable"
              placeholder="联系电话"
              v-model="tableForm.phone"
              class="w500"
            ></el-input>
          </el-form-item>
          <el-form-item label="咨询电话：" prop="advisoryPhone">
            <el-input
              :disabled="disable"
              placeholder="咨询电话"
              v-model="tableForm.advisoryPhone"
              class="w500"
            ></el-input>
          </el-form-item>
          <el-form-item label="营业时间：" prop="businessDate">
            <el-input
              :disabled="disable"
              placeholder="营业时间"
              v-model="tableForm.businessDate"
              class="w500"
            ></el-input>
          </el-form-item>

          <el-form-item label="营业时间描述：" prop="businessDesc">
            <el-input
              :disabled="disable"
              type="textarea"
              placeholder="营业时间描述"
              v-model="tableForm.businessDesc"
              class="w500"
            ></el-input>
          </el-form-item>

          <el-form-item v-if="!disable" class="text-center">
            <el-button type="primary" @click="submitForm('tableForm')" class="mt20">提交</el-button>
            <el-button type="primary" @click="cancel()" class="mt20">取消</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import categoryManagementService from "../../service/categoryManagement/salesroomManagement.js";
import apiHost from "@/hostconfig/index";
export default {
  data() {
    return {
      disable: false,
      noUpdate: false,
      
      isUpload: false,
      tableForm: {
          // brandId:"",
        brandName: "",
        shopCode: "",
        shopName: "",
        address: "",
        latitude: "",
        longitude: "",
        phone: "",
        advisoryPhone: "",
        businessDate: "",
        businessDesc: ""
      },
      rules: {
        brandName: [
          { required: true, message: "请填写品牌名称", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        shopName: [{ required: true, message: "请填写店铺名称", trigger: "blur" },
        { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }],
        address: [{ required: true, message: "请填写门店地址", trigger: "blur" },
        { min: 2, max: 80, message: '长度在 2 到 80 个字符', trigger: 'blur' }],
        latitude: [{ required: true, message: "请填写纬度", trigger: "blur" }],
        longitude: [{ required: true, message: "请填写经度", trigger: "blur" }],
        phone: [{ required: true, message: "请填写联系电话", trigger: "blur" }],
      }
    };
  },
  created() {
    const routeName = this.$route.name || "";
    if (routeName === "addSalesroom") {
      
    } else if (routeName === "checkSalesroom") {
      this.getDetails(routeName);
    } else if (routeName === "updateSalesroom") {
      this.noUpdate = true;
      this.getDetails(routeName);
    }
  },
  methods: {
    
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) { 
            this.addSalesroom();  
        } else {
          //console.log('提交失败!!')
          return false;
        }
      });
    },

    cancel() {
      this.$router.go(-1);
    },

    // 新增任务、编辑任务
    addSalesroom() {
      const data = this.handparams();
      const routeName = this.$route.name || "";
      if (routeName === "addSalesroom") {
        categoryManagementService.addSalesroom(data).then(
          response => {
            //console.debug('response===',response.data)
            if (response.code === "20000") {
              // this.$router.push({path: '/taskManagement'})
              this.$router.go(-1);
            } else {
              // alert(response.msg || '新增任务失败')
              this.$message.error(
                response.message ||
                  response.subMsg ||
                  response.msg ||
                  "新增任务失败!"
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
      } else if (routeName === "updateSalesroom") {
        categoryManagementService.updateSalesroom(data).then(
          response => {
            //console.debug('response===',response.data)
            if (response.code === "20000") {
              // this.$router.push({path: '/taskManagement'})
              this.$router.go(-1);
            } else {
              // alert(response.msg || '编辑任务失败')
              this.$message.error(
                response.message ||
                  response.subMsg ||
                  response.msg ||
                  "编辑任务失败!"
              );
            }
          },
          response => {
            this.$message.error(
              response.message ||
                response.subMsg ||
                response.msg ||
                "请求服务器连接失败!"
            );
          }
        );
      }
    },
    //获取详情
    getDetails(routeName) {
      const id = this.$route.query.id;
      // console.debug('id===',id)
      const param = id;
      categoryManagementService.getDetails(param).then(
        response => {
          const detail = response.data || "";
          this.tableForm = detail;
          // this.tableForm.leafOne = id;
          
          if (routeName === "checkSalesroom") {
            this.disable = true;
          }
        //   if (routeName === "checkSalesroom" || routeName === "updateSalesroom") {
        //     if (this.tableForm.leafOne && this.tableForm.leafOne != "") {
        //       this.getleafTwo(routeName);
        //     }
        //   }
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
    //参数处理
    handparams() {
      const self = this;
      const params = JSON.parse(JSON.stringify(self.tableForm));
      for (const i in params) {
          if (params[i] === "") {
              delete params[i]
          }
      }
      // console.log("data===" + JSON.stringify(params))
      return params;
    },
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

