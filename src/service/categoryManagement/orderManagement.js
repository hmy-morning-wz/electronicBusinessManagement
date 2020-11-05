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
    getChannel() {
        const url = `${host}operation-order/mallOrder/getChannel`;
        return getJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    getStatus() {
        const url = `${host}operation-order/mallOrder/getOrderStatus`;
        return getJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    getTableList(data) {
        const url = `${host}operation-order/mallOrder/getOrderList`;
        return postJSON(url ,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    
    // 退款
    refundReason(data) {
        const url = `${host}operation-order/mallOrder/refund`;
        return postJSON(url ,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 批量发货
    deliver(data) {
        const url = `${host}operation-order/mallOrder/delivery`;
        return postJSON(url ,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 截单代发
    waitDelivery(data) {
        const url = `${host}operation-order/mallOrder/waitDelivery`;
        return postJSON(url ,data)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 下载数据
    downLoad(data) {
        const url = `${downHost}operation-order/mallOrder/orderExport?orderNos=${data}`;
        window.location.href = url
        // return getJSON(url )
        //     .then((response) => {
        //         return Promise.resolve(response);
        //     }, (response) => {
        //         return Promise.reject(response);
        //     });
    },
    getDetails(data) {
        const url = `${host}operation-order/mallOrder/getManageOrderDetail?orderNo=${data}`;
        return getJSON(url)
            .then((response) => {
                return Promise.resolve(response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
};
