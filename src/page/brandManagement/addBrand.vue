<template>
  <div>
    <template>
      <div style="margin-left:80px; margin-top:40px">
        <el-form ref="tableForm" :model="tableForm" label-width="120px" :rules="rules">
          <el-form-item label="中文名称" prop="chName">
            <el-input
              v-model="tableForm.chName"
              :disabled="disable || noUpdate"
              class="w240"
              placeholder="中文名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="英文名称">
            <el-input
              v-model="tableForm.enName"
              :disabled="disable"
              class="w240"
              placeholder="英文名称"
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

          <el-form-item label="品牌logo" prop="logo">
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
                <img :disabled="disable" v-if="imagePath" :src="imagePath" class="avatar" />
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
            <div>*图片尺寸:500px*500px以内，格式为PNG或JPG</div>
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
import brandManagementService from "../../service/brandManagement/brandManagement.js";
import apiHost from "@/hostconfig/index";
export default {
  data() {
    return {
      disable: false,
      noUpdate: false,
      labelsTypeOptions: [],
      isUpload: false,
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      imagePath: "",
      buttonStatus: 0,
      tableForm: {
        chName: "",
        enName: "",
        logo: ""
      },
      rules: {
        chName: [
          { required: true, message: "请输入中文名称", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        // categoryDesc: [
        //   { required: true, message: "请输入分类描述", trigger: "blur" }
        // ],
        logo: [{ required: true, message: "请上传图片", trigger: "blur" }]
      }
    };
  },
  created() {
    const routeName = this.$route.name || "";
    if (routeName === "addBrand") {
    } else if (routeName === "checkBrand") {
      this.getDetails(routeName);
    } else if (routeName === "updateBrand") {
      this.noUpdate = true;
      this.getDetails(routeName);
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.buttonStatus === 2) {
            this.addBrand();
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
    addBrand() {
      const data = this.handparams();
      const routeName = this.$route.name || "";
      if (routeName === "addBrand") {
        brandManagementService.addBrand(data).then(
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
      } else if (routeName === "updateBrand") {
        brandManagementService.updateBrand(data).then(
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
                response.msg ||
                response.subMsg ||
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
      brandManagementService.getDetails(param).then(
        response => {
          const detail = response.data || "";
          console.log("=====", detail);
          this.tableForm = detail;
          // this.tableForm.categoryPid = id;
          this.imagePath = this.tableForm.logo;
          this.buttonStatus = 2;
          if (routeName === "checkBrand") {
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
      const isLt2M = file.size / 1024 / 1024 < 1;
      const isWidthHeight = file.naturalWidth < 500 && file.naturalHeight < 500;
      const isSize = new Promise(function(resolve, reject) {
        let width = 500;
        let height = 500;
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
          this.$message.error("图片尺寸必须在500px * 500px 以内!");
          this.tableForm.logo = "";
          this.imagePath = this.tableForm.logo;
          this.buttonStatus = 0;
          this.isUpload = false;
          return Promise.reject();
        }
      );
      // if (!isWidthHeight) {
      //   this.$message.error("图片尺寸必须在500px * 500px 以内!");
      //   this.imagePath = this.tableForm.logo;
      //   this.buttonStatus = 0;
      //   this.isUpload = false;
      // }
      // console.debug('upload===')
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
        this.tableForm.logo = "";
        this.imagePath = this.tableForm.logo;
        this.buttonStatus = 0;
        this.isUpload = false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
        this.tableForm.logo = "";
        this.imagePath = this.tableForm.logo;
        this.buttonStatus = 0;
        this.isUpload = false;
      }
      return isJPG && isLt2M && isSize;
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

