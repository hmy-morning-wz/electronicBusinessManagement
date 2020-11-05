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
        <el-steps :active="2" align-center>
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
          <el-form-item label="产地:" prop="producingArea">
            <el-input v-model="tableForm.producingArea" :disabled="disable" class="w240"></el-input>
          </el-form-item>
          <el-form-item label="是否进口:" prop="isImport">
            <el-select v-model="tableForm.isImport" :disabled="disable" class="w240" clearable>
              <el-option
                v-for="item in isImportTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品型号:">
            <el-input v-model="tableForm.model" :disabled="disable" class="w240" placeholder="商品型号"></el-input>
          </el-form-item>
          <el-form-item label="销售单位:" prop="saleUnit">
            <el-input v-model="tableForm.saleUnit" :disabled="disable" class="w240" placeholder></el-input>
          </el-form-item>
          <el-form-item label="销售规格:" prop="specifications">
            <el-input
              v-model="tableForm.specifications"
              :disabled="disable"
              class="w240"
              placeholder
            ></el-input>
          </el-form-item>
          <el-form-item label="重量:">
            <el-input v-model="tableForm.weight" :disabled="disable" class="w240" placeholder="kg"></el-input>
            <span>kg</span>
          </el-form-item>
          <el-form-item label="质保期:">
            <el-input
              v-model="tableForm.warranty"
              :disabled="disable"
              class="w240"
              placeholder="kg"
            ></el-input>
          </el-form-item>
          <el-form-item label="支持偏远配送:" prop="deliveryRestriction">
            <el-select
              v-model="tableForm.deliveryRestriction"
              :disabled="disable"
              clearable
              class="w240"
            >
              <el-option
                v-for="item in properTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关联门店:" prop="shops">
            <el-input
              :disabled="disable"
              type="textarea"
              placeholder="关联门店"
              v-model="tableForm.shops"
              class="w500"
            ></el-input>
            <span>*填写门店id、英文逗号隔开</span>
          </el-form-item>
          <el-form-item label="单用户限购数量:" prop="limitCount">
            <el-input
              type="number"
              @keyup.native="number($event)"
              v-model.number="tableForm.limitCount"
              :disabled="disable"
              class="w240"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品标签:" prop="label">
            <el-select v-model="tableForm.label" :disabled="disable" clearable class="w240">
              <el-option
                v-for="item in labelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item  class="text-center">
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
import apiHost from "@/hostconfig/index";
export default {
  data() {
    return {
      disable: false,
      labelOptions: [
        {
          id: 0,
          name: "无"
        },
        {
          id: 1,
          name: "热门"
        },
        {
          id: 2,
          name: "置顶"
        }
      ],
      isImportTypeOptions: [
        {
          id: 0,
          name: "否"
        },
        {
          id: 1,
          name: "是"
        }
      ],
      properTypeOptions: [
        {
          id: 0,
          name: "否"
        },
        {
          id: 1,
          name: "是"
        }
      ],
      uploadimgUrl: `${apiHost.netImg}prefer/api/fileUploadOne`,
      imagePath: "",
      buttonStatus: 0,
      tableForm: {
        id: "",
        producingArea: "",
        isImport: "",
        weight: "",
        warranty: "",
        specifications: "",
        saleUnit: "",
        model: "",
        deliveryRestriction: "",
        shops: "",
        limitCount: null,
        label: 0
      },
      rules: {
        saleUnit: [
          { required: true, message: "请输入销售单位", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        specifications: [
          { required: true, message: "请输入售卖规格", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        producingArea: [
          { required: true, message: "请输入产地", trigger: "blur" }
          // { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        isImport: [
          { required: true, message: "请选择是否进口", trigger: "change" }
        ],
        deliveryRestriction: [
          {
            required: true,
            message: "请选择是否支持偏远地区配送",
            trigger: "change"
          }
        ],
        // categoryDesc: [
        //   { required: true, message: "请输入分类描述", trigger: "blur" }
        // ],
        imgPic: [{ required: true, message: "请上传图片", trigger: "blur" }],
        limitCount: {
          type: "number",

          message: "单用户限购数量不能小于1",
          trigger: "blur",
          required: false,
          validator: (rule, value, callback) => {
            if ((value != null && value != "") || value === 0) {
              if (
                /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false ||
                value === 0
              ) {
                callback(new Error("请填写大于0的数字"));
              } else {
                callback();
              }
            } else {
              callback();
            }
          },
          min: 1
        }
      }
    };
  },
  created() {
    const routeName = this.$route.name || "";
    if (routeName === "merchandiseProperty") {
      const id = this.$route.query.goodsId || "";
      console.log("gooodsId===", id);
      this.tableForm.id = id;
      this.getDetails(routeName);
    } else if (routeName === "checkProperty") {
      this.getDetails(routeName);
    } else if (routeName === "updateProperty") {
      this.getDetails(routeName);
    }
  },
  methods: {
    submitForm(formName) {
      const routeName = this.$route.name || "";
      // if (routeName === "merchandiseProperty") {
      if (routeName === "checkProperty") {

        this.$router.push({
          name: "checkSetting",
          query: { goodsId: this.tableForm.id }
        });
      
      }else {
        this.$refs[formName].validate(valid => {
        if (valid) {
          this.merchandiseInformation();
        } else {
          //console.log('提交失败!!')
          return false;
        }
      });
      }
      
    },

    number(e) {
      var keynum = window.event ? e.keyCode : e.which;
      var keychar = String.fromCharCode(keynum);
      if (keynum == 189 || keynum == 190 || keynum == 110 || keynum == 109) {
        this.$message.warning("禁止输入小数以及负数");
        e.target.value = "";
      }
    },

    cancel() {
      this.$router.go(-1);
    },

    // 新增任务、编辑任务
    merchandiseInformation() {
      const data = this.handparams();
      const routeName = this.$route.name || "";
      // if (routeName === "merchandiseProperty") {
        labelsClassificationService.merchandiseInformation(data).then(
          response => {
            //console.debug('response===',response.data)
            if (response.code === "20000") {
              const routeName = this.$route.name || "";
              if (routeName === "updateProperty") {
                this.$router.push({
                  name: "updateSetting",
                  query: { goodsId: this.tableForm.id }
                });
              } else {
                this.$router.push({
                  name: "merchandiseSetting",
                  query: { goodsId: this.tableForm.id }
                });
              }
            } else {
              // alert(response.msg || '新增任务失败')
              this.$message.error(
                response.message ||
                  response.subMsg ||
                  response.msg ||
                  "编辑规格属性失败!"
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
      
      // } else if (routeName === "updateProperty") {
      //   labelsClassificationService.updateProperty(data).then(
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
      this.tableForm.id = id;
      const param = id;
      labelsClassificationService.getDetails(param).then(
        response => {
          const detail = response.data || "";
          if (detail.isImport || detail.isImport === 0) {
            this.tableForm = detail;
          }

          // this.tableForm.categoryPid = id;
          if (routeName === "checkProperty") {
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
      for (const i in params) {
        if (params[i] === "") {
          delete params[i];
        }
      }
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

