<template>
  <div>
    <template>
      <div style="margin-left:80px; margin-top:40px">
        <el-form ref="tableForm" :model="tableForm" label-width="120px" :rules="rules">
          <el-form-item label="卖点名称：" prop="name">
            <el-input
              v-model="tableForm.name"
              :disabled="disable "
              class="w240"
              placeholder="卖点名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="卖点说明：" prop="description">
            <el-input
              :disabled="disable"
              type="textarea"
              placeholder="卖点说明"
              v-model="tableForm.description"
              class="w500"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="关联类目（仅限二级）：" prop="categoryId">
            <el-input
              :disabled="disable"
              type="textarea"
              placeholder="关联类目（仅限二级）"
              v-model="tableForm.categoryId"
              class="w500"
            ></el-input>
            <span>*关联类目仅限二级类目，填写二级类目id、英文逗号隔开</span>
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
import categoryManagementService from "../../service/categoryManagement/sellingPointManagement.js";
import apiHost from "@/hostconfig/index";
export default {
  data() {
    return {
      disable: false,
      noUpdate: false,
      tableForm: {
        name: "",
        description: "",
       categoryId:"",
      },
      rules: {
        name: [
          { required: true, message: "请填写卖点名称", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        description: [{ required: true, message: "请填写卖点描述", trigger: "blur" }],
        categoryId: [{ required: true, message: "请填写关联类目（仅限二级）", trigger: "blur" }]
      }
    };
  },
  created() {
    const routeName = this.$route.name || "";
    if (routeName === "addSellingPoint") {
      //this.getDetails(routeName);
    } else if (routeName === "checkSellingPoint") {
      this.getDetails(routeName);
    } else if (routeName === "updateSellingPoint") {
      this.noUpdate = true;
      this.getDetails(routeName);
    }
  },
  methods: {
    
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addSellingPoint();
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
         
          if (routeName === "checkSellingPoint") {
            this.disable = true;
          }
          // if (routeName === "checkSellingPoint" || routeName === "updateSellingPoint") {
          //   if (this.tableForm.leafOne && this.tableForm.leafOne != "") {
          //     this.getleafTwo(routeName);
          //   }
          // }
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

