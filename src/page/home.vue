<template>
    <div class="wrapper">
        <div>
            <el-row class="tac" v-if="show">
                <el-col :span="4">
                    <el-menu default-active="2" class="el-menu-vertical-demo">
                        <el-submenu  v-for="(item,indx) in menulist" :key="indx" :index="indx +''">
                            <template slot="title"><i class="el-icon-message"></i>{{item.template}}</template>
                            <router-link :to="subitem.linkto"  v-for="(subitem,subindx) in item.menuitem" :key="subindx">
                                    <el-menu-item   :index="indx+'-'+subindx" >
                                        <i class="el-icon-message"></i>{{subitem.name}}
                                    </el-menu-item>
                            </router-link>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true,
            menulist: [
                { template: '运营平台', menuitem: [
                    // { linkto: '/activityList', name: '活动列表' },
                    {linkto: '/categoryManagement',name : '类目管理'},
                    {linkto: '/brandManagement',name : '品牌管理'},
                    {linkto: '/merchandiseManagement',name : '商品管理'},
                    {linkto: '/orderManagement',name : '订单管理'},
                    {linkto: '/seckillManagement',name : '秒杀活动管理'},
                    {linkto: '/advanceManagement',name : '预售活动管理'},
                    {linkto: '/sellingPointManagement',name : '卖点管理'},
                    // {linkto: '/marketingModuleManagement',name : '营销模块管理'},
                    {linkto: '/salesroomManagement',name : '门店管理'},
                    ]
                },
            ]
        };
    },
    created() {
        if (process.env.ENV === 'dev') {
            this.show = true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}
</style>
