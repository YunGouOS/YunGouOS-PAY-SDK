import qs from 'qs';
import Common from '../common/Common';

/**
 * 发起 post 请求
 * @param {*} url 请求地址
 * @param {*} params 请求参数 json对象
 */
function post(url, params) {
    if (!Common.isEmpty(params)) {
        params = qs.stringify(params);
    }
    return baseOption("POST", url, params);
}

/**
 * 发起get请求
 * @param {*} url 请求地址
 * @param {*} params 请求参数 json对象
 */
function get(url, params) {
    return baseOption("GET", url, params);
}

/**
 * 基础请求
 * @param {*} type  请求类型 
 * @param {*} url  请求url
 * @param {*} params  请求参数
 */
function baseOption(type, url, params) {
    return new Promise((resolve, reject) => {
        let promise = null;
        if ("GET" == type) {
            promise=uni.request({
                url: url,
                method:'GET',
                data: params,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            });
        }
        if ("POST" == type) {
            promise =uni.request({
                url: url,
                method: 'POST',
                data: params,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            });
        }
        promise.then(response => {
            var [error, res] = response;
            if (!Common.isEmpty(error)) {
                reject("yungouos sdk error", error);
            }
            if (res.statusCode != 200) {
                reject("yungouos sdk error", res);
            }
            resolve(res.data);
        }).catch(error => {
            reject("yungouos sdk error", error);
        })
    })
}

export default {
    "get": get,
    "post": post,
}