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
    // 获取列表接口
    getTableList(data) {
        const url = `${host}operation-mall/sellPoint/geSellPointList`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 添加卖点接口
    addSellingPoint(data) {
        const url = `${host}operation-mall/sellPoint/addSellPoint`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 编辑卖点接口
    updateSellingPoint(data) {
        const url = `${host}operation-mall/sellPoint/updateSellPoint`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取详情接口
    getDetails(data) {
        const url = `${host}operation-mall/sellPoint/getSellPointDetail?id=${data}`;
        return getJSON(url)
        .then((response) => {
            return Promise.resolve(response);
        }, (response) => {
            return Promise.reject(response);
        });
    },
     
};
