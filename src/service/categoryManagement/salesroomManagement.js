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
    // 获取列表接口
    getTableList(data) {
        const url = `${host}operation-mall/shop/getShopList`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 添加接口
    addSalesroom(data) {
        const url = `${host}operation-mall/shop/addShop`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 编辑接口
    updateSalesroom(data) {
        const url = `${host}operation-mall/shop/updateShop`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取详情接口
    getDetails(data) {
        const url = `${host}operation-mall/shop/getShopDetail?id=${data}`;
        return getJSON(url)
        .then((response) => {
            return Promise.resolve(response);
        }, (response) => {
            return Promise.reject(response);
        });
    },
     // 删除接口
     deleteList(data) {
        const url = `${host}operation-mall/shop/deletedShop`;
        return postJSON(url, data)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 下载数据
    downLoadClick (brandName,shopName,shopId,page,pageSize){
        const url = `${downHost}operation-mall/shop/downShopExcel?brandName=${brandName}&shopName=${shopName}&shopId=${shopId}&page=${page}&pageSize=${pageSize}`;
        console.log("downLoadUrl====",url);
        window.location.href = url
    },
};
