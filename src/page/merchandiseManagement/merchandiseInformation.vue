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
        <el-steps :active="0" align-center>
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
          <el-form-item label="商品ID:" prop="id">
            <div>{{tableForm.id}}</div>
          </el-form-item>
          <el-form-item label="一级类目" prop="leafOne">
            <el-select
              v-model="tableForm.leafOne"
              :disabled="disable"
              class="w240"
              clearable
              @change="leafOneChange()"
            >
              <el-option
                v-for="item in leafOneOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="二级类目" prop="leafTwo">
            <el-select
              v-model="tableForm.leafTwo"
              :disabled="disable"
              class="w240"
              clearable
              @change="leafTwoChange()"
            >
              <el-option
                v-for="item in leafTwoOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="三级类目" prop="leafThree">
            <el-select
              v-model="tableForm.leafThree"
              :disabled="disable"
              class="w240"
              clearable
              @change="leafThreeChange()"
            >
              <el-option
                v-for="item in leafThreeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="品牌ID:" prop="brandId">
            <el-input
              v-model="tableForm.brandId"
              :disabled="disable"
              class="w240"
              @blur="getBrandName(0)"
              placeholder="品牌ID"
            ></el-input>
            <span>{{chName}}</span>
          </el-form-item>
          <el-form-item label="商品主标题" prop="name">
            <el-input v-model="tableForm.name" :disabled="disable" class="w240" placeholder="商品主标题"></el-input>
          </el-form-item>
          <el-form-item label="商品副标题">
            <el-input
              v-model="tableForm.subtitle"
              :disabled="disable"
              class="w240"
              placeholder="商品副标题"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品类型" prop="type">
            <el-select v-model="tableForm.type" :disabled="disable" class="w240" clearable>
              <el-option
                v-for="item in goodsTypeOptions"
                :key="item.typeId"
                :label="item.typeName"
                :value="item.typeId"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="下单必填字段" prop="type">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              <el-checkbox label="禁用" disabled></el-checkbox>
              <el-checkbox label="选中且禁用" disabled></el-checkbox>
            </el-checkbox-group>
          </el-form-item>-->
          <!-- <el-form-item label="供货商ID" >
            <el-input
              v-model="tableForm.categoryName"
              :disabled="disable"
              class="w240"
              placeholder="类目名称"
            ></el-input>
          </el-form-item>-->
          <!-- <el-form-item label="分类描述" prop="categoryDesc">
            <el-input
              :disabled="disable"
              type="textarea"
              placeholder="分类描述"
              v-model="tableForm.categoryDesc"
              class="w500"
            ></el-input>
          </el-form-item>-->

          <el-form-item class="text-center">
            <el-button type="primary" @click="submitForm('tableForm')" class="mt20">下一步</el-button>
            <el-button type="primary" @click="cancel()" class="mt20">取消</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import labelsClassificationService from "../../service/categoryManagement/merchandiseManagement.js";
import categoryManagementService from "../../service/categoryManagement/categoryManagement.js";
import apiHost from "@/hostconfig/index";
import eventBus from "../../service/eventbus.js";
export default {
  data() {
    return {
      leafOneOptions: [],
      leafTwoOptions: [],
      leafThreeOptions: [],
      goodsTypeOptions: [],
      disable: false,
      labelsTypeOptions: [],
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      imagePath: "",
      buttonStatus: 0,
      chName: "",
      tableForm: {
        id: "",
        leafOne: "",
        leafTwo: "",
        leafThree: "",
        brandId: "",
        name: "",
        subtitle: "",
        name: "",
        type: "",
        categoryId: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品主标题", trigger: "blur" },
          { max: 200, message: "最大输入200个字符", trigger: "blur" }
        ],
        leafOne: [
          { required: true, message: "请选择一级类目", trigger: "change" }
        ],
        leafTwo: [
          { required: true, message: "请选择二级类目", trigger: "change" }
        ],
        leafThree: [
          { required: true, message: "请选择三级类目", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择商品类型", trigger: "change" }
        ],
        // categoryDesc: [
        //   { required: true, message: "请输入分类描述", trigger: "blur" }
        // ],
        imgPic: [{ required: true, message: "请上传图片", trigger: "blur" }]
      }
    };
  },
  created() {
    const routeName = this.$route.name || "";
    const id = this.$route.query.goodsId || "";
    console.log("gooodsId===", id);
    this.tableForm.id = id;
    if (routeName === "merchandiseInformation") {
      this.getleafOne();
      this.getGoodsType();
      this.getDetails(routeName);
    } else if (routeName === "checkInformation") {
      this.getDetails(routeName);
    } else if (routeName === "updateInformation") {
      this.getDetails(routeName);
    }
  },
  activated() {
    //根据key名获取传递回来的参数，data就是map
    console.log("activated===");

    eventBus.$on(
      "status",
      function(data) {
        const routeName = this.$route.name || "";
        if (routeName === "merchandiseInformation") {
          this.getDetails(routeName);
        }
      }.bind(this)
    );
  },
  methods: {
    getGoodsType() {
      categoryManagementService.getTypeList().then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              this.goodsTypeOptions = response.data;
            } else {
              this.goodsTypeOptions = [];
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
    // 获取一级分类
    getleafOne() {
      categoryManagementService.getleafOne().then(
        response => {
          if (response.code === "20000") {
            if (response.data instanceof Array) {
              this.leafOneOptions = response.data;
            } else {
              this.leafOneOptions = [];
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
      this.getleafTwo(1);
    },
    leafTwoChange() {
      this.getleafTwo(2);
    },
    leafThreeChange() {},

    // 获取二级分类
    getleafTwo(leaf) {
      let data;
      if (leaf === 1) {
        data = this.tableForm.leafOne;
      } else {
        data = this.tableForm.leafTwo;
      }
      categoryManagementService.getleafTwo(data).then(
        response => {
          if (response.code === "20000") {
            if (leaf === 1) {
              if (response.data instanceof Array) {
                this.leafTwoOptions = response.data;
              } else {
                this.leafTwoOptions = [];
              }
            } else {
              if (response.data instanceof Array) {
                this.leafThreeOptions = response.data;
              } else {
                this.leafThreeOptions = [];
              }
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
      const route = this.$route.name || "";
      if (route === "checkInformation") {
        this.$router.push({
          name: "checkDes",
          query: { goodsId: this.tableForm.id }
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.tableForm.brandId) {
              this.getBrandName(1);
            } else {
              this.merchandiseInformation();
            }
          } else {
            //console.log('提交失败!!')
            return false;
          }
        });
      }
    },
    //获取品牌名称
    getBrandName(param) {
      const data = this.tableForm.brandId;
      if (data) {
        labelsClassificationService.getBrandName(data).then(
          response => {
            //console.debug('response===',response.data)
            if (response.code === "20000") {
              // this.$router.push({path: '/taskManagement'})
              if (response.data) {
                this.chName = response.data.chName;
                if (param === 1) {
                  this.merchandiseInformation();
                }
              } else {
                this.chName = "";
                this.tableForm.brandId = "";
                if (param === 1) {
                  this.$message.error("请填写正确的品牌ID!");
                }
              }
            } else {
              // alert(response.msg || '新增任务失败')
              this.tableForm.brandId = "";
              this.chName = "";
              this.$message.error(
                response.message ||
                  response.subMsg ||
                  response.msg ||
                  "获取品牌名称失败!"
              );
            }
          },
          response => {
            this.chName = "";
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
    cancel() {
      this.$router.go(-1);
    },

    // 新增、编辑
    merchandiseInformation() {
      if (this.tableForm.leafThree != "") {
        this.tableForm.categoryId = this.tableForm.leafThree;
      } else if (this.tableForm.leafTwo != "") {
        this.tableForm.categoryId = this.tableForm.leafTwo;
      } else if (this.tableForm.leafOne != "") {
        this.tableForm.categoryId = this.tableForm.leafOne;
      } else {
        this.tableForm.categoryId = "";
      }
      const data = this.handparams();
      const routeName = this.$route.name || "";
      // if (routeName === "merchandiseInformation") {
      labelsClassificationService.merchandiseInformation(data).then(
        response => {
          //console.debug('response===',response.data)
          if (response.code === "20000") {
            // this.$router.push({path: '/taskManagement'})
            const routeName = this.$route.name || "";
            if (routeName === "updateInformation") {
              this.$router.push({
                name: "updateDes",
                query: { goodsId: this.tableForm.id }
              });
            } else {
              this.$router.push({
                name: "merchandiseDes",
                query: { goodsId: this.tableForm.id }
              });
            }
          } else {
            // alert(response.msg || '新增任务失败')
            this.$message.error(
              response.message ||
                response.subMsg ||
                response.msg ||
                "编辑商品失败!"
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
    
    
    // } else if (routeName === "updateInformation") {
    //   labelsClassificationService.updateInformation(data).then(
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
    // console.debug("id===", id);
    const param = this.tableForm.id;
    labelsClassificationService.getDetails(param).then(
      response => {
        const detail = response.data || "";
        if (detail.leafOne || detail.leafOne === 0) {
          this.tableForm = detail;
          // this.tableForm.categoryPid = id;
        }
        if (this.tableForm.leafOne === -1) {
          this.tableForm.leafOne = "";
        }
        if (this.tableForm.leafTwo === -1) {
          this.tableForm.leafTwo = "";
        }
        if (this.tableForm.leafThree === -1) {
          this.tableForm.leafThree = "";
        }
        this.getleafOne();
        this.getleafTwo(1);
        this.getleafTwo(2);
        this.getGoodsType();

        if (routeName === "checkInformation") {
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

