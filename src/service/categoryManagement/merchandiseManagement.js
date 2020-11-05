import HOST_CONFIG from 'hostconfig';
import * as ajax from 'ajax';
import {
    getJSON,
    postJSON,
    putJSON,
    delData
} from '../../utils/ajax';

let host = HOST_CONFIG.nethost;
let downHost = HOST_CONFIG.downHost;
export default {
    // 添加类目接口
    addMerchandise() {
        const url = `${host}operation-mall/goods/addGoods`;
        return postJSON(url )
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    getStatus() {
        const url = `${host}operation-mall/goods/getStatusList`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    getTableList(data) {
        const url = `${host}operation-mall/goods/getGoodsList`;
        return postJSON(url ,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 删除商品接口
    deleteList(data) {
        const url = `${host}operation-mall/goods/deletedGoods`;
        return postJSON(url, data)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 下载数据
    downLoadClick (goodsId,name,categoryId,brandName,gmtCreateStart,gmtCreateEnd,status,page,pageSize,sortRule){
        if (gmtCreateStart && gmtCreateEnd) {
            const url = `${downHost}operation-mall/goods/downGoodsExcel?id=${goodsId}&name=${name}&categoryId=${categoryId}&brandName=${brandName}&startDate=${gmtCreateStart}&endDate=${gmtCreateEnd}&status=${status}&page=${page}&pageSize=${pageSize}&sortRule=${sortRule}`;
            window.location.href = url
        }else {
            const url = `${downHost}operation-mall/goods/downGoodsExcel?id=${goodsId}&name=${name}&categoryId=${categoryId}&brandName=${brandName}&status=${status}&page=${page}&pageSize=${pageSize}&sortRule=${sortRule}`;
            window.location.href = url
        }
    },
    
    // 修改状态
    upataStatus(data) {
        const url = `${host}operation-mall/goods/updateGoodsStatus`;
        return postJSON(url, data)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 修改状态
    getBrandName(data) {
        const url = `${host}operation-mall/brand/getBrandById?id=${data}`;
        return postJSON(url)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 修改编辑商品信息
    merchandiseInformation(data) {
        const url = `${host}operation-mall/goods/updateGoods`;
        return postJSON(url,data)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取详情
    getDetails(data) {
        const url = `${host}operation-mall/goods/getGoodsDetail?id=${data}`;
        return postJSON(url)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 添加库存
    addGoodsStock(data) {
        const url = `${host}operation-mall/goods/addGoodsStock`;
        return postJSON(url ,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
     // 编辑库存
     updateSetting(data) {
        const url = `${host}operation-mall/goods/updateGoodsStock`;
        return postJSON(url ,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
};
