/**
 * add by fangjunchao
 */

const activityList = (resolve) => {
    require(['@/page/OperationManagement/activity-mage/activityList.vue'], resolve);
};
const categoryManagement = (resolve) => {
    require(['@/page/categoryManagement/categoryManagement.vue'], resolve);
};
const addCategory = (resolve) => {
    require(['@/page/categoryManagement/addCategory.vue'], resolve);
};
const brandManagement = (resolve) => {
    require(['@/page/brandManagement/brandManagement.vue'], resolve);
};
const addBrand = (resolve) => {
    require(['@/page/brandManagement/addBrand.vue'], resolve);
};
const merchandiseManagement = (resolve) => {
    require(['@/page/merchandiseManagement/merchandiseManagement.vue'], resolve);
};
const merchandiseInformation = (resolve) => {
    require(['@/page/merchandiseManagement/merchandiseInformation.vue'], resolve);
};
const merchandiseDes = (resolve) => {
    require(['@/page/merchandiseManagement/merchandiseDes.vue'], resolve);
};
const merchandiseProperty = (resolve) => {
    require(['@/page/merchandiseManagement/merchandiseProperty.vue'], resolve);
};
const merchandiseSetting = (resolve) => {
    require(['@/page/merchandiseManagement/merchandiseSetting.vue'], resolve);
};
const orderManagement = (resolve) => {
    require(['@/page/orderManagement/orderManagement.vue'], resolve);
};
const orderDetails = (resolve) => {
    require(['@/page/orderManagement/orderDetails.vue'], resolve);
};
const seckillManagement = (resolve) => {
    require(['@/page/seckillManagement/seckillManagement.vue'], resolve);
};
const addSeckill = (resolve) => {
    require(['@/page/seckillManagement/addSeckill.vue'], resolve);
};
const advanceManagement = (resolve) => {
    require(['@/page/advanceManagement/advanceManagement.vue'], resolve);
};
const addAdvance = (resolve) => {
    require(['@/page/advanceManagement/addAdvance.vue'], resolve);
};

const  sellingPointManagement= (resolve) => {
    require(['@/page/sellingPointManagement/sellingPointManagement.vue'], resolve);
}; 
const addSellingPoint = (resolve) => {
    require(['@/page/sellingPointManagement/addSellingPoint.vue'], resolve);
};
const  salesroomManagement= (resolve) => {
    require(['@/page/salesroomManagement/salesroomManagement.vue'], resolve);
};
const addSalesroom = (resolve) => {
    require(['@/page/salesroomManagement/addSalesroom.vue'], resolve);
};
const  marketingModuleManagement= (resolve) => {
    require(['@/page/marketingModuleManagement/marketingModuleManagement.vue'], resolve);
};
const addMarketingModule = (resolve) => {
    require(['@/page/marketingModuleManagement/addMarketingModule.vue'], resolve);
};



export default [{
    path: '/activityList',
    component: activityList,
    meta: ['活动列表'],
},
{
    path: '/categoryManagement',
    component: categoryManagement,
    name: 'categoryManagement',
    meta: ['类目管理']
},
{
    path: '/addCategory',
    component: addCategory,
    name: 'addCategory',
    meta: ['新建类目']
},
{
    path: '/updateCategory',
    component: addCategory,
    name: 'updateCategory',
    meta: ['编辑类目']
},
{
    path: '/brandManagement',
    component: brandManagement,
    name: 'brandManagement',
    meta: ['品牌管理']
},
{
    path: '/addBrand',
    component: addBrand,
    name: 'addBrand',
    meta: ['新建品牌']
},
{
    path: '/updateBrand',
    component: addBrand,
    name: 'updateBrand',
    meta: ['编辑品牌']
},
{
    path: '/merchandiseManagement',
    component: merchandiseManagement,
    name: 'merchandiseManagement',
    meta: ['商品管理']
},
{
    path: '/merchandiseInformation',
    component: merchandiseInformation,
    name: 'merchandiseInformation',
    meta: ['基本信息']
},
{
    path: '/updateInformation',
    component: merchandiseInformation,
    name: 'updateInformation',
    meta: ['编辑商品信息']
},
{
    path: '/checkInformation',
    component: merchandiseInformation,
    name: 'checkInformation',
    meta: ['查看商品信息']
},
{
    path: '/merchandiseDes',
    component: merchandiseDes,
    name: 'merchandiseDes',
    meta: ['商品描述']
},
{
    path: '/updateDes',
    component: merchandiseDes,
    name: 'updateDes',
    meta: ['编辑商品描述']
},
{
    path: '/checkDes',
    component: merchandiseDes,
    name: 'checkDes',
    meta: ['查看商品描述']
},
{
    path: '/merchandiseProperty',
    component: merchandiseProperty,
    name: 'merchandiseProperty',
    meta: ['规格属性']
},
{
    path: '/updateProperty',
    component: merchandiseProperty,
    name: 'updateProperty',
    meta: ['编辑规格属性']
},
{
    path: '/checkProperty',
    component: merchandiseProperty,
    name: 'checkProperty',
    meta: ['查看规格属性']
},
{
    path: '/merchandiseSetting',
    component: merchandiseSetting,
    name: 'merchandiseSetting',
    meta: ['库存设置']
},
{
    path: '/checkSetting',
    component: merchandiseSetting,
    name: 'checkSetting',
    meta: ['查看库存设置']
},
{
    path: '/updateSetting',
    component: merchandiseSetting,
    name: 'updateSetting',
    meta: ['编辑库存设置']
},
{
    path: '/orderManagement',
    component: orderManagement,
    name: 'orderManagement',
    meta: ['订单管理']
},
{
    path: '/orderDetails',
    component: orderDetails,
    name: 'orderDetails',
    meta: ['订单详情']
},
{
    path: '/seckillManagement',
    component: seckillManagement,
    name: 'seckillManagement',
    meta: ['秒杀活动管理']
},
{
    path: '/addSeckill',
    component: addSeckill,
    name: 'addSeckill',
    meta: ['秒杀活动添加']
},
{
    path: '/updateSeckill',
    component: addSeckill,
    name: 'updateSeckill',
    meta: ['秒杀活动编辑']
},
{
    path: '/checkSeckill',
    component: addSeckill,
    name: 'checkSeckill',
    meta: ['秒杀活动查看']
},
{
    path: '/advanceManagement',
    component: advanceManagement,
    name: 'advanceManagement',
    meta: ['预售活动管理']
},
{
    path: '/addAdvance',
    component: addAdvance,
    name: 'addAdvance',
    meta: ['预售活动添加']
},
{
    path: '/updateAdvance',
    component: addAdvance,
    name: 'updateAdvance',
    meta: ['预售活动编辑']
},
{
    path: '/checkAdvance',
    component: addAdvance,
    name: 'checkAdvance',
    meta: ['预售活动查看']
},
{
    path: '/salesroomManagement',
    component: salesroomManagement,
    name: 'salesroomManagement',
    meta: ['门店管理']
},
{
    path: '/addSalesroom',
    component: addSalesroom,
    name: 'addSalesroom',
    meta: ['新增门店']
},
{
    path: '/updateSalesroom',
    component: addSalesroom,
    name: 'updateSalesroom',
    meta: ['编辑门店']
},
{
    path: '/checkSalesroom',
    component: addSalesroom,
    name: 'checkSalesroom',
    meta: ['查看门店']
},
{
    path: '/sellingPointManagement',
    component: sellingPointManagement,
    name: 'sellingPointManagement',
    meta: ['卖点管理']
},
{
    path: '/addSellingPoint',
    component: addSellingPoint,
    name: 'addSellingPoint',
    meta: ['新增卖点']
},
{
    path: '/updateSellingPoint',
    component: addSellingPoint,
    name: 'updateSellingPoint',
    meta: ['编辑卖点']
},
{
    path: '/checkSellingPoint',
    component: addSellingPoint,
    name: 'checkSellingPoint',
    meta: ['查看卖点']
},
{
    path: '/marketingModuleManagement',
    component: marketingModuleManagement,
    name: 'marketingModuleManagement',
    meta: ['营销模块管理']
},
{
    path: '/addMarketingModule',
    component: addMarketingModule,
    name: 'addMarketingModule',
    meta: ['新增营销模块']
},
{
    path: '/updateMarketingModule',
    component: addMarketingModule,
    name: 'updateMarketingModule',
    meta: ['编辑营销模块']
},
{
    path: '/checkMarketingModule',
    component: addMarketingModule,
    name: 'checkMarketingModule',
    meta: ['查看营销模块']
},
]
