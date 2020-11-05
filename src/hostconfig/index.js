
const apiHost = {};


if (process.env.ENV === 'dev') {
    // apiHost.nethost = '//sit-operation.allcitygo.com/';
    apiHost.netImg = '//sit-operation.allcitygo.com/'; // 测试图片上传地址
    apiHost.netGoodDetail = '//sit-operation.allcitygo.com/shoppingMall/#/goodDetail?goodsId='; // 
    apiHost.netImgMore = '//sit-challenge-backstage.allcitygo.com/';  // 多文件上传地址
    // apiHost.netImg = '//operation.allcitygo.com/'; //正式
    apiHost.nethost = '//sit-basic-gw.allcitygo.com/op/';
    apiHost.downHost = '//sit-operation.allcitygo.com/';  // 下载不走网关
    // apiHost.nethost = '//bmapi.allcitygo.com:13002/op/'; // 正式打包
}
if (process.env.ENV === 'test') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'beta') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'v5') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'release') {
    apiHost.netImg = '//operation.allcitygo.com/'; //正式
    apiHost.downHost = '//operation.allcitygo.com/';  // 下载不走网关
    apiHost.nethost = '//bmapi.allcitygo.com:13002/op/'; // 正式打包
    apiHost.netGoodDetail = '//money.allcitygo.com/shopping/#/goodDetail?goodsId='; 
    apiHost.netImgMore = '//challenge-backstage.allcitygo.com/';  // 多文件上传地址
}


export default apiHost;
