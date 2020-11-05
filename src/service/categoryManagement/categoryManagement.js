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
    // 添加类目接口
    addCategory(data) {
        const url = `${host}operation-mall/category/createCategory`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取一级类目
    getleafOne () {
        const url = `${host}operation-mall/category/getOneCategoryList`;
        return getJSON(url)
            .then((response) => {
                return Promise.resolve( response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取下级类目列表
    getleafTwo (data) {
        const url = `${host}operation-mall/category/getTwoCategoryList?parentId=${data}`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取列表接口
    getTableList(data) {
        const url = `${host}operation-mall/category/listCategoryPage`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取详情接口
    getDetails(data) {
        const url = `${host}operation-mall/category/getCategory?id=${data}`;
        return postJSON(url, data)
        .then((response) => {
            return Promise.resolve(response);
        }, (response) => {
            return Promise.reject(response);
        });
    },
       // 修改类目接口
       updateCategory(data) {
        const url = `${host}operation-mall/category/updateCategory`;
        return postJSON(url, data)
           .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
        // 删除类目接口
        deleteList(data) {
            const url = `${host}operation-mall/category/deletedCategory`;
            return postJSON(url, data)
               .then((response) => {
                    return Promise.resolve(response);
                }, (response) => {
                    return Promise.reject(response);
                });
        },
         // 获取商品类型
        getTypeList () {
            const url = `${host}operation-mall/goods/getTypeList`;
        return postJSON(url)
            .then((response) => {
                return Promise.resolve( response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
};
