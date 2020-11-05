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
        <el-steps :active="1" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="商品描述"></el-step>
          <el-step title="规格属性"></el-step>
          <el-step title="库存设置"></el-step>
        </el-steps>
      </div>
    </template>

    <template>
      <div style="margin-left:80px; margin-top:40px">
        <el-form ref="tableForm" :model="tableForm" label-width="120px" :rules="rules">
          <el-form-item label="商品描述:" :disabled="disable" required prop="description">
            <div class="components-container">
              <div :disabled="disable" class="editor-container">
                <div :disabled="disable" id="editor"></div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商品详情列表图"  required prop="imageUrl">
            <div class="comm-dis">
              <div class="header-banner" v-for="(item,index) in tableForm.imageUrl" :key="index">
                <img v-if="item" :src="item" class="avatar">
                <span class="deletImg" v-show="tableForm.imageUrl">
                  <span class="deletImg2" @click="handleDelete(index)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <div>
                <el-upload
                  v-if="tableForm.imageUrl.length <10"
                  class="avatar-uploader"
                  :action="uploadimgUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :disabled="disable"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="商品封面图片"  required prop="pictUrl">
            <div class="comm-dis">
              <div :disabled="disable" class="header-banner">
                <img v-if="tableForm.pictUrl" :disabled="disable" :src="tableForm.pictUrl" class="avatar">
                <span class="deletImg">
                  <span :disabled="disable"  class="deletImg2" @click="handleCoverDelete">
                    <i :disabled="disable"  class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <div v-show="!tableForm.pictUrl">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadimgUrl"
                  :show-file-list="false"
                  :on-success="handleCoverSuccess"
                  :before-upload="beforeAvatarUpload"
                  :disabled="disable" 
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <div>*图片尺寸:800px*800px以内，格式为PNG或JPG，大小1MB以内</div>
          <el-form-item  class="text-center">
            <el-button type="primary" @click="submitForm('tableForm')" class="mt20">下一步</el-button>
            <el-button type="primary" @click="cancel()" class="mt20">取消</el-button>
            <!-- <el-button @click="resetForm('tableForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import labelsClassificationService from "../../service/categoryManagement/merchandiseManagement.js";
import apiHost from "@/hostconfig/index";
import UE from "../../components/ue/ue.vue";
import eventBus from "../../service/eventbus.js";
import Vue from "vue";
export default {
  data() {
    return {
      ue1: "ue1", // 不同编辑器必须不同的id
      disable: false,
      labelsTypeOptions: [],
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      buttonStatus: 0,
      tableForm: {
        id: "",
        imageUrl: [],
        pictUrl: "",
        description: ""
      },
      rules: {
        categoryName: [
          { required: true, message: "请输入中文名称", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: "请输入描述内容", trigger: "blur" }
        ],
        // categoryDesc: [
        //   { required: true, message: "请输入分类描述", trigger: "blur" }
        // ],
        imageUrl: [{ required: true, message: "商品封面图片组合" }],
        pictUrl: [{ required: true, message: "商品封面图片" }]
      }
    };
  },
  created() {
    const routeName = this.$route.name || "";
    const id = this.$route.query.goodsId || "";
    if (routeName === "merchandiseDes") {
      console.log("gooodsId===", id);
      this.tableForm.id = id;
      this.getDetails(routeName);
    } else if (routeName === "checkDes") {
      this.getDetails(routeName);
    } else if (routeName === "updateDes") {
      this.getDetails(routeName);
    }
  },
  components: {
    UE
  },
  mounted() {
    this.$nextTick(() => {
      this.initEditor();
    });
  },
  methods: {
    handleDelete(index) {
      this.$confirm("是否删除图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableForm.imageUrl.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已撤销"
          });
        });
    },
    handleCoverDelete() {
      this.$confirm("是否删除图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableForm.pictUrl = "";
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已撤销"
          });
        });
    },
    handleAvatarSuccess(res, file) {
      const url = `https://${res.data}`;
      this.tableForm.imageUrl.push(url);
      // this.$set(this.tableForm.imageUrl,'',url)
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type ==="image/jpg" || file.type ==="image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;
      console.log("isJPG=====",isJPG);
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
          
          return Promise.reject();
        }
      );
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/JPEG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M&& isSize;
    },
    handleCoverSuccess(res, file) {
      this.tableForm.pictUrl = `https://${res.data}`;
    },

    submitForm(formName) {
      const routeName = this.$route.name || "";
      // if (routeName === "merchandiseDes") {
        if (routeName === "checkDes") {
              this.$router.push({
                name: "checkProperty",
                query: { goodsId: this.tableForm.id }
              });
        }else {
      this.tableForm.description = this.editor.txt.html(); // 调用子组件方法
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.merchandiseDes();
        } else {
          //console.log('提交失败!!')
          return false;
        }
      });
        }
    },

    initEditor() {
      var E = window.wangEditor;
      var editor = new E("#editor");
      this.editor = editor;
      this.editor.customConfig.uploadImgServer = `${
        apiHost.netImg
      }prefer/api/fileUploadOne`;
      this.editor.customConfig.withCredentials = true;
      this.editor.customConfig.uploadFileName = "file";
      this.editor.customConfig.uploadImgParams = {};
      //   this.editor.customConfig.uploadImgHeaders = {
      //     UserToken: this.headers.UserToken
      //   };
      this.editor.customConfig.linkImgCallback = function(url) {
        console.log(result);
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
          var appendStr =
            '<p style="text-align: center;"><img src="' +
            result.data +
            '" style="max-width:100%;"><br></p>';
          editor.cmd.do(
            "insertHTML",
            `<img src="https://${result.data}" style="max-width:100%;"/>`
          );
        },
        fail: function(xhr, editor, result) {},
        error: function(xhr, editor) {},
        timeout: function(xhr, editor) {},
        customInsert: function(insertImg, result, editor) {}
      };
      editor.create();
    },

    cancel() {
      //传递一个map，choiceHospital是key，hospital是value
      eventBus.$emit("status", 1);
      this.$router.go(-1);
    },

    // 新增任务、编辑任务
    merchandiseDes() {
      const data = this.handparams();
      const routeName = this.$route.name || "";
      // if (routeName === "merchandiseDes") {
        
      labelsClassificationService.merchandiseInformation(data).then(
        response => {
          //console.debug('response===',response.data)
          if (response.code === "20000") {
            // this.$router.push({path: '/taskManagement'})
            const routeName = this.$route.name || "";
            if (routeName === "updateDes") {
              this.$router.push({
                name: "updateProperty",
                query: { goodsId: this.tableForm.id }
              });
            } else {
              this.$router.push({
                name: "merchandiseProperty",
                query: { goodsId: this.tableForm.id }
              });
            }
          } else {
            // alert(response.msg || '新增任务失败')
            this.$message.error(
              response.message ||
                response.subMsg ||
                response.msg ||
                "编辑商品描述失败!"
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
      // } else if (routeName === "updateDes") {
      //   labelsClassificationService.updateDes(data).then(
      //     response => {
      //       //console.debug('response===',response.data)
      //       if (response.code === 0) {
      //         // this.$router.push({path: '/taskManagement'})
      //         this.$router.go(-1);
      //       } else {
      //         // alert(response.msg || '编辑任务失败')
      //         this.$message.error(
      //           response.message ||
      //             response.msg ||
      //             response.subMsg ||
      //             "编辑任务失败!"
      //         );
      //       }
      //     },
      //     response => {
      //       this.$message.error(
      //         response.message ||
      //           response.msg ||
      //           response.subMsg ||
      //           "请求服务器连接失败!"
      //       );
      //     }
      //   );
      // }
    },
    //获取详情
    getDetails(routeName) {
      const id = this.$route.query.goodsId;
      // console.debug('id===',id)
      const param = id;
      labelsClassificationService.getDetails(param).then(
        response => {
          if (response.code === "20000") {
            const detail = response.data || "";
            var data = [];
            for (let index = 0; index < detail.goodsImageList.length; index++) {
              const element = detail.goodsImageList[index];
              data.push(element.imageUrl);
            }
            detail.imageUrl = data;
            this.tableForm = detail;
            this.editor.txt.html(response.data.description);
            if (routeName === "checkDes") {
              this.disable = true;
            }
          } else {
            this.$message.error(
              response.message ||
                response.msg ||
                response.subMsg ||
                "获取详情失败!"
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
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
  margin: 10px 10px 0 0;
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
  top: 40%;
  left: 45%;
}
</style>

<style lang="scss" scoped>
.bgcolor {
  color: #999 !important;
}
#editor {
  width: 800px;
}
.comm-dis {
  width: 100%;
  display: flex;
}
.add-goods {
  .quan {
    margin: -10px 0 0 120px;
    // display: flex;
    line-height: 32px;
    color: #595e66;
  }
  .quan:after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
  }
  .tips {
    margin: 0 0 10px 200px;
    color: #f56c6c;
    font-size: 12px;
  }
  .commodityList {
    width: 500px;
    margin: 0 0 20px 200px;
  }
  .table {
    margin: 20px 30px 10px 0;
    width: 500px;
  }
  .detail-content {
    cursor: pointer;
    color: #20a0ff;
  }
}
</style>

