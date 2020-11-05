<template>
  <div>
    <template>
      <div style="margin-left:80px; margin-top:40px">
        <el-form ref="tableForm" :model="tableForm" label-width="120px" :rules="rules">
          <el-form-item label="类目名称" prop="name">
            <el-input
              v-model="tableForm.name"
              :disabled="disable || noUpdate"
              class="w240"
              placeholder="类目名称"
            ></el-input>
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
          <el-form-item label="上级类目" prop="leafOne">
            <el-select
              v-model="tableForm.leafOne"
              clearable
              :disabled="disable || noUpdate"
              class="w240"
              @change="leafOneChange()"
            >
              <el-option
                v-for="item in leafOneOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="tableForm.leafTwo"
              clearable
              :disabled="disable || noUpdate"
              class="w240"
            >
              <el-option
                v-for="item in leafTwoOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="tableForm.leafOne && tableForm.leafTwo" label="规格1">
            <el-input
              v-model="tableForm.specificationsOne"
              :disabled="disable"
              class="w240"
              placeholder="颜色"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="tableForm.leafOne && tableForm.leafTwo" label="规格2">
            <el-input
              v-model="tableForm.specificationsTwo"
              :disabled="disable"
              class="w240"
              placeholder="尺码"
            ></el-input>
          </el-form-item>
          <el-form-item label="权重" prop="weight">
            <el-input
              v-model.number="tableForm.weight"
              type="number"
              @keyup.native="number($event)"
              :disabled="disable"
              class="w120"
              placeholder="权重"
            ></el-input>
          </el-form-item>

          <el-form-item label="类目logo" prop="logo">
            <div>
              <el-upload
                ref="upload"
                class="avatar-uploader"
                :action="uploadimgUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :show-file-list="false"
                :on-success="handleAwardSuccess"
                :on-error="handleAwardError"
                :before-upload="beforeAwardUpload"
                :on-change="fileOnChange"
                :auto-upload="false"
                :disabled="disable"
              >
                <img :disabled="disable" v-if="imagePath" :src="imagePath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div>
              <el-button
                v-if="buttonStatus === 0 && !disable"
                type="primary"
                size="small"
                @click="submitUpload"
              >上传图片</el-button>
              <el-button
                v-else-if="buttonStatus === 1 && !disable"
                type="primary"
                :loading="true"
                size="small"
              >上传中</el-button>
              <el-button
                v-else-if="buttonStatus === 2 && !disable"
                size="small"
                type="success"
                @click="photoSuccess"
              >上传成功</el-button>
            </div>
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
import categoryManagementService from "../../service/categoryManagement/categoryManagement.js";
import apiHost from "@/hostconfig/index";
export default {
  data() {
    return {
      disable: false,
      noUpdate: false,
      leafOneOptions: [],
      leafTwoOptions: [],
      isUpload: false,
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      imagePath: "",
      buttonStatus: 0,
      tableForm: {
        name: "",
        leafOne: "",
        leafTwo: "",
        weight: null,
        specificationsOne: "",
        specificationsTwo: "",
        logo: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入类目名称", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        logo: [{ required: true, message: "请上传图片", trigger: "blur" }],
        weight: [
          {
            type: "number",
            min: 1,
            message: "权重不能小于1",
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
    if (routeName === "addCategory") {
      this.getleafOne();
    } else if (routeName === "checkCategory") {
      this.getleafOne(routeName);
    } else if (routeName === "updateCategory") {
      this.noUpdate = true;
      this.getleafOne(routeName);
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
    // 获取一级分类
    getleafOne(routeName) {
      categoryManagementService.getleafOne().then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              this.leafOneOptions = response.data;
            } else {
              this.leafOneOptions = [];
            }
            if (
              routeName === "checkCategory" ||
              routeName === "updateCategory"
            ) {
              this.getDetails(routeName);
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
    leafOneChange() {
      this.getleafTwo();
    },
    // 获取二级分类
    getleafTwo() {
      const data = this.tableForm.leafOne;
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.buttonStatus === 2) {
            this.addCategory();
          } else {
            this.$message.error("请先上传图片!");
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

    // 新增任务、编辑任务
    addCategory() {
      const data = this.handparams();
      const routeName = this.$route.name || "";
      if (routeName === "addCategory") {
        categoryManagementService.addCategory(data).then(
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
      } else if (routeName === "updateCategory") {
        categoryManagementService.updateCategory(data).then(
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
          this.imagePath = this.tableForm.logo;
          this.buttonStatus = 2;
          if (routeName === "checkCategory") {
            this.disable = true;
          }
          if (routeName === "checkCategory" || routeName === "updateCategory") {
            if (this.tableForm.leafOne && this.tableForm.leafOne != "") {
              this.getleafTwo(routeName);
            }
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

    submitUpload() {
      if (this.imagePath) {
        this.buttonStatus = 1;
        this.$refs.upload.submit();
      } else {
        //   alert('请先选择图片')
        this.$message.error("请先选择图片!");
      }
    },

    handleAwardSuccess(res, file, fileList) {
      this.buttonStatus = 2;
      this.tableForm.logo = "https://" + res.data;
      this.imagePath = this.tableForm.logo;
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
      // this.tableForm.logo = ''
    },
    // 上传图片之前限制图片大小
    beforeAwardUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // console.debug('upload===')
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
        this.imagePath = this.tableForm.logo;
        this.buttonStatus = 0;
        this.isUpload = false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        this.imagePath = this.tableForm.logo;
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
        this.imagePath = this.tableForm.logo;
      }
      // if(this.buttonStatus != 2){
      //     this.tableForm.logo = ''
      // }
      if (this.imagePath === this.tableForm.logo) {
        this.buttonStatus = 2;
      } else {
        this.buttonStatus = 0;
      }
      if (fileList.length === 0) {
        this.imagePath = "";
        this.tableForm.logo = "";
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

