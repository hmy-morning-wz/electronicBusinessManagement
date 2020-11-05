import HOST_CONFIG from 'hostconfig';
import * as ajax from 'ajax';
import {
    getJSON,
    postJSON,
    putJSON,
    delData
} from '../../utils/ajax';

let host = HOST_CONFIG.nethost;
export default {
    // 添加活动接口
    addActivitySpike(data) {
        const url = `${host}operation-mall/activityPerSale/addActivityPerSale`;
        return postJSON(url,data )
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 编辑活动 updateActivitySpike
    updateActivitySpike(data) {
        const url = `${host}operation-mall/activityPerSale/updateActivityPerSale`;
        return postJSON(url,data )
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    getStatus() {
        const url = `${host}operation-mall/activitySpike/getStatusList`;
        return getJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    getTableList(data) {
        const url = `${host}operation-mall/activityPerSale/getActivityPerSaleList`;
        return postJSON(url ,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 修改状态
    upataStatus(data) {
        const url = `${host}operation-mall/activityPerSale/updateActivityPerSaleStatus`;
        return postJSON(url, data)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取活动详情 
    getActivitySpikeDetail(data) {
        const url = `${host}operation-mall/activityPerSale/getActivityPerSaleDetail?id=${data}`;
        return postJSON(url)
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
    // 获取sku
    getSku(data) {
        const url = `${host}operation-mall/activityPerSale/getPerSaleGoodsStockDetail`;
        return postJSON(url,data)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
};
