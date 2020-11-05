<template>
  <div>
    <template>
      <div style="margin-left:80px; margin-top:40px">
        <el-form ref="tableForm" :model="tableForm" label-width="120px" :rules="rules">
          <el-form-item label="模块名称：" prop="name">
            <el-input
              v-model="tableForm.name"
              :disabled="disable || noUpdate"
              class="w240"
              placeholder="模块名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="营销内容:" required prop="description">
            <div class="components-container">
              <div class="editor-container">
                <div id="editor"></div>
              </div>
            </div>
          </el-form-item>
          
          <el-form-item label="关联商品：" prop="categoryRelate">
            <el-input
              :disabled="disable"
              type="textarea"
              placeholder="关联商品"
              v-model="tableForm.categoryDesc"
              class="w500"
            ></el-input>
            <span>请填写商品id、英文逗号隔开</span>
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
import UE from "../../components/ue/ue.vue";
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
        specificationsOne: "",
        specificationsTwo: "",
        logo: ""
      },
      rules: {
        name: [
          { required: true, message: "请填写类目名称", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        pointDesc: [{ required: true, message: "请填写卖点描述", trigger: "blur" }],
        categoryRelate: [{ required: true, message: "请填写关联类目", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述内容", trigger: "blur" }
        ],
      }
    };
  },
  components: {
    UE
  },
  mounted() {
    this.$nextTick(() => {
      this.initEditor();
    });
  },
  created() {
    const routeName = this.$route.name || "";
    if (routeName === "addSellingPoint") {
      this.getleafOne();
    } else if (routeName === "checkSellingPoint") {
      this.getleafOne(routeName);
    } else if (routeName === "updateSellingPoint") {
      this.noUpdate = true;
      this.getleafOne(routeName);
    }
  },
  methods: {
    
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.buttonStatus === 2) {
            this.addSellingPoint();
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
    addSellingPoint() {
      const data = this.handparams();
      const routeName = this.$route.name || "";
      if (routeName === "addSellingPoint") {
        categoryManagementService.addSellingPoint(data).then(
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
      } else if (routeName === "updateSellingPoint") {
        categoryManagementService.updateSellingPoint(data).then(
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

    initEditor() {
      var E = window.wangEditor;
      var editor = new E("#editor");
      this.editor = editor;
      this.editor.customConfig.uploadImgServer = `${
        apiHost.netImgMore
      }/file/upload_file`;
      this.editor.customConfig.withCredentials = true;
      this.editor.customConfig.uploadFileName = "multipartFiles";
      this.editor.customConfig.uploadImgParams = {};
      //   this.editor.customConfig.uploadImgHeaders = {
      //     UserToken: this.headers.UserToken
      //   };
      this.editor.customConfig.linkImgCallback = function(url) {
        console.log("result====",result);
        var appendStr =
          '<p style="text-align: center;"><img src="' +
          result.data +
          '" style="max-width:100%;"><br></p>';
        editor.cmd.do(
          "insertHTML",
          `<img src="https://${result.data}" style="max-width:100%;"/>`
        );
      };
      this.editor.customConfig.uploadImgHooks = {
        before: function(xhr, editor, files) {
             console.log("files==before====",files);
          const isLt10M = files[0].size / 1024 / 1024 < 1;
          const isimg = files[0].type.indexOf("image") > -1;
          if (!isimg) {
            this.$message.error("只能上传图片!");
          }
          if (!isLt10M) {
            this.$message.error("上传文件不能超过 1MB!");
          }
          return isLt10M && isimg;
        },
        success: function(xhr, editor, result) {
             console.log("result==success====",result);
             if (result && result.data) {
                 for (let index = 0; index < result.data.length; index++) {
                     const element = result.data[index];
                     var appendStr =
                        '<p style="text-align: center;"><img src="' +
                        element +
                        '" style="max-width:100%;"><br></p>';
                    editor.cmd.do(
                        "insertHTML",
                        `<img src="${element}" style="max-width:100%;"/>`
                    );
                 }
             }
          
        },
        fail: function(xhr, editor, result) {},
        error: function(xhr, editor) {},
        timeout: function(xhr, editor) {},
        customInsert: function(insertImg, result, editor) {}
      };
      editor.create();
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
          if (routeName === "checkSellingPoint") {
            this.disable = true;
          }
          if (routeName === "checkSellingPoint" || routeName === "updateSellingPoint") {
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

