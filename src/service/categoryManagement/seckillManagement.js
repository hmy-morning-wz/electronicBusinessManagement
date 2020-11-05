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
        const url = `${host}operation-mall/activitySpike/addActivitySpike`;
        return postJSON(url,data )
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 编辑活动 updateActivitySpike
    updateActivitySpike(data) {
        const url = `${host}operation-mall/activitySpike/updateActivitySpike`;
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
        const url = `${host}operation-mall/activitySpike/getActivitySpikeList`;
        return postJSON(url ,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 修改状态
    upataStatus(data) {
        const url = `${host}operation-mall/activitySpike/updateActivitySpikeStatus`;
        return postJSON(url, data)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取秒杀活动详情 
    getActivitySpikeDetail(data) {
        const url = `${host}operation-mall/activitySpike/getActivitySpikeDetail?id=${data}`;
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
        const url = `${host}operation-mall/activitySpike/getSpikeGoodsStockDetail`;
        return postJSON(url,data)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
};
