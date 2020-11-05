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
    // 添加品牌接口
    addBrand(data) {
        const url = `${host}operation-mall/brand/createBrand`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response.data || response);
            });
    },
    // 获取品牌列表接口
    getTableList(data) {
        const url = `${host}operation-mall/brand/getBrandList`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取详情接口
    getDetails(data) {
        const url = `${host}operation-mall/brand/getBrandById?id=${data}`;
        return postJSON(url, data)
        .then((response) => {
            return Promise.resolve(response);
        }, (response) => {
            return Promise.reject(response);
        });
    },
       // 更新品牌接口
    updateBrand(data) {
        const url = `${host}operation-mall/brand/updateBrand`;
        return postJSON(url, data)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
        // 删除品牌接口
        deleteList(data) {
            const url = `${host}operation-mall/brand/deletedBrand`;
            return postJSON(url, data)
               .then((response) => {
                    return Promise.resolve(response);
                }, (response) => {
                    return Promise.reject(response);
                });
        },

        // 下载数据
    downLoad(data) {
        const url = `${downHost}operation-mall/brand/downExcel?brandId=${data}`;
        window.location.href = url
        // return getJSON(url )
        //     .then((response) => {
        //         return Promise.resolve(response);
        //     }, (response) => {
        //         return Promise.reject(response);
        //     });
    },
};
