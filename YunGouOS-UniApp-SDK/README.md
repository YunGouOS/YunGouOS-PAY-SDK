# yungouos-pay-uniapp-sdk

![https://images.yungouos.com/YunGouOS/logo/merchant/logo.png](https://images.yungouos.com/YunGouOS/logo/merchant/logo.png)

# 介绍

YunGouOS微信支付/支付宝官方合作伙伴，YunGouOS-PAY是南京新云宝软件有限公司研发的支付产品。

过去我们只将支付提供给自身系统使用，我们对市面上各种第四方支付深感痛恨 我们深知一些个人用户对支付的渴望。

为此，我们开放了重量级产品，YunGouOS旗下“支付系统”正式对外开放。

我们使命是为更多开发者、个体户、个人创业者、小微企业提供正规的官方支付接口。

基于微信/支付宝官方授权的服务商模式为中小商家提供便捷的支付接入服务。

# 如何使用

## 无微信/支付宝商户

在官网提交资料，由微信/支付宝审核，审核通过后下发商户号，对接使用。

## 已有微信商户

登录YunGouOS官网->微信支付->商户接入

# 相关地址

官网地址：[https://www.yungouos.com](https://www.yungouos.com "https://www.yungouos.com")

接口文档：[https://open.pay.yungouos.com](https://open.pay.yungouos.com "https://open.pay.yungouos.com")

# 快速上手

## 前言

所有方法均提供了同步和异步两种调用方式，支持Promise化使用

下面以微信扫码支付举例

```js
//同步
WxPay.nativePayAsync

//异步（将方法名结尾的Async去掉即为异步，返回的是Promise对象，按照Promise语法进行后续处理即可）
WxPay.nativePay

```

## 一、安装

### 方式一：NPM安装（推荐）

1、项目根目录命令行执行

```sh
npm i yungouos-pay-uniapp-sdk
```

2、项目中引入

```js
//可按需导入
import {WxPay,AliPay,Finance,Merge,Order,PaySignUtil,PayBlack,WxLogin} from 'yungouos-pay-uniapp-sdk'
```

## 二、使用

### 1、微信支付

```js
//导入微信支付对象
import {WxPay} from 'yungouos-pay-uniapp-sdk'
```

#### 扫码支付（同步）

```js
let result = await WxPay.nativePayAsync(out_trade_no, total_fee, mch_id, body, type, attach, notify_url, auto, auto_node, config_no,biz_params,payKey);
//二维码链接地址
console.log(result);
```

#### 扫码支付（异步）

```js
WxPay.nativePay(out_trade_no, total_fee, mch_id, body, type, attach, notify_url, auto, auto_node, config_no,biz_params, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 刷卡支付（同步）

```js
let result =await WxPay.codePayAsync(out_trade_no, total_fee, mch_id, body, auth_code, attach,receipt,notify_url, auto, auto_node, config_no,biz_params, payKey);
```

#### 刷卡支付（异步）

```js
WxPay.codePay(out_trade_no, total_fee, mch_id, body, auth_code, attach,receipt,notify_url, auto, auto_node, config_no,biz_params, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 公众号支付/JSAPI（同步）

```js
let result =await WxPay.jsapiPayAsync(out_trade_no, total_fee, mch_id, body, openId, attach, notify_url,return_url, auto, auto_node, config_no,biz_params, payKey);
```

#### 公众号支付/JSAPI（异步）

```js
WxPay.jsapiPay(out_trade_no, total_fee, mch_id, body, openId, attach, notify_url,return_url, auto, auto_node, config_no, biz_params,payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 小程序支付【个人】（同步）

```js
let params = WxPay.minAppPayParams(out_trade_no, total_fee, mch_id, body, attach, title, notify_url, auto, auto_node, config_no, biz_params, payKey);

wx.openEmbeddedMiniProgram({
        appId: 'wxd9634afb01b983c0',//支付收银小程序的appid 固定值 不可修改
        path: '/pages/pay/pay',//支付页面 固定值 不可修改
        extraData: params,//携带的参数
        success(res) {
            console.log("小程序拉起成功");
        }, fail(res) {
            
        }
});

```

#### 小程序支付【个体户/企业】（同步）

```js
let result =await WxPay.minAppPayAsync(out_trade_no, total_fee, mch_id, body, openId, attach, notify_url, auto, auto_node, config_no, biz_params, payKey);

let data=result.minPayParam;

if(data==null||data==''||data==undefined){
    console.log("支付失败");
    return;
}

let minPayParam = JSON.parse(data);

//构建支付成功方法
minPayParam.success = (response) => {
    if (response.errMsg == 'requestPayment:ok') {
        //支付成功
        console.log("小程序支付成功");
    }
}
//构建支付失败方法
minPayParam.fail = (response) => {
    if (response.errMsg == 'requestPayment:fail cancel') {
        //取消支付
        console.log("取消支付");
    }
}
//拉起小程序支付界面
wx.requestPayment(minPayParam);

```

#### 小程序支付【个体户/企业】（异步）

```js
WxPay.minAppPay(out_trade_no, total_fee, mch_id, body, openId, attach, notify_url, auto, auto_node, config_no, biz_params, payKey).then((response)=>{
    //接口返回结果
    if(response.code!=0||response.data==null){
        console.log("支付失败");
        return;
    }

    let result=response.data;

    let data=result.minPayParam;
    
    if(data==null||data==''||data==undefined){
        console.log("支付失败");
        return;
    }

    let minPayParam = JSON.parse(data);

    //构建支付成功方法
    minPayParam.success = (response) => {
        if (response.errMsg == 'requestPayment:ok') {
            //支付成功
            console.log("小程序支付成功");
        }
    }
    //构建支付失败方法
    minPayParam.fail = (response) => {
        if (response.errMsg == 'requestPayment:fail cancel') {
            //取消支付
            console.log("取消支付");
        }
    }
    //拉起小程序支付界面
    wx.requestPayment(minPayParam);

});
```

#### 收银台支付（同步）

```js
let result =await WxPay.cashierPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no, biz_params,payKey);
```

#### 收银台支付（异步）

```js
WxPay.cashierPay(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no,biz_params, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 刷脸支付（同步）

```js
let result =await WxPay.facePayAsync(out_trade_no, total_fee, mch_id, body, openId, face_code, attach, notify_url, auto, auto_node, config_no,biz_params, payKey);
```

#### 刷脸支付（异步）

```js
WxPay.facePay(out_trade_no, total_fee, mch_id, body, openId, face_code, attach, notify_url, auto, auto_node, config_no,biz_params, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### H5支付（同步）

```js
let result =await WxPay.wapPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no, biz_params,payKey);
```

#### H5支付（异步）

```js
WxPay.wapPay(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no, biz_params,payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### APP支付（同步）

```js
let result =await WxPay.appPayAsync(app_id, out_trade_no, total_fee, mch_id, body, attach, notify_url, auto, auto_node, config_no,biz_params, payKey);
```

#### APP支付（异步）

```js
WxPay.appPay(app_id, out_trade_no, total_fee, mch_id, body, attach, notify_url, auto, auto_node, config_no,biz_params, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### QQ小程序支付【个人】（同步）

```js
let params = WxPay.qqPayParams(out_trade_no, total_fee, mch_id, body, attach, title, notify_url, auto, auto_node, config_no, biz_params, payKey);

qq.navigateToMiniProgram({
        appId: '1112112167',//支付收银小程序的appid 固定值 不可修改
        path: '/pages/pay/pay',//支付页面 固定值 不可修改
        extraData: params,//携带的参数
        success(res) {
            console.log("小程序拉起成功");
        }, fail(res) {
            
        }
});

```

#### QQ小程序支付【个体户/企业】（同步）

```js
let result =await WxPay.qqPayAsync(app_id,access_token,out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no, biz_params,payKey);


let minPayParam=result.minPayParam;

if(minPayParam==null||minPayParam==''||minPayParam==undefined){
    console.log("支付失败");
    return;
}

//构建支付成功方法
minPayParam.success = (response) => {
    if (response.errMsg == 'requestWxPayment:ok') {
        //支付成功
        console.log("小程序支付成功");
    }
}
//构建支付失败方法
minPayParam.fail = (response) => {
    if (response.errMsg == 'requestWxPayment:fail cancel') {
        //取消支付
        console.log("取消支付");
    }
}
//拉起小程序支付界面
qq.requestWxPayment(minPayParam);

```

#### QQ小程序支付【个体户/企业】（异步）

```js
WxPay.qqPay(app_id,access_token,out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no, biz_params,payKey).then((response)=>{
    //接口返回结果
    if(response.code!=0||response.data==null){
        console.log("支付失败");
        return;
    }

    let result=response.data;

    let minPayParam=result.minPayParam;
    
    if(minPayParam==null||minPayParam==''||minPayParam==undefined){
        console.log("支付失败");
        return;
    }

    //构建支付成功方法
    minPayParam.success = (response) => {
        if (response.errMsg == 'requestWxPayment:ok') {
            //支付成功
            console.log("小程序支付成功");
        }
    }
    //构建支付失败方法
    minPayParam.fail = (response) => {
        if (response.errMsg == 'requestWxPayment:fail cancel') {
            //取消支付
            console.log("取消支付");
        }
    }
    //拉起小程序支付界面
    qq.requestWxPayment(minPayParam);

});
```


#### 刷脸支付凭证（同步）

```js
let result =await WxPay.getFacePayAuthInfoAsync(mch_id, store_id, store_name, face_auth_info, device_id, attach, biz_params, payKey);
```

#### 刷脸支付凭证（异步）

```js
WxPay.getFacePayAuthInfo(mch_id, store_id, store_name, face_auth_info, device_id, attach, biz_params, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 订单退款（同步）

```js
let result =await WxPay.refundAsync(out_trade_no, mch_id, money, out_trade_refund_no,refund_desc,notify_url, payKey);
```

#### 订单退款（异步）

```js
WxPay.refund(out_trade_no, mch_id, money,out_trade_refund_no, refund_desc,notify_url, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 查询退款结果（同步）

```js
let result =await WxPay.getRefundResultAsync(refund_no, mch_id, payKey);
```

#### 查询退款结果（异步）

```js
WxPay.getRefundResult(refund_no, mch_id, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 下载对账单（同步）

```js
let result =await WxPay.downloadBillAsync(mch_id, date,end_date,device_info, payKey);
```

#### 下载对账单（异步）

```js
WxPay.downloadBill(mch_id, date,end_date,device_info,payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```


#### 关闭订单（同步）

```js
let result =await WxPay.closeOrderAsync(out_trade_no, mch_id, payKey);
```

#### 关闭订单（异步）

```js
WxPay.closeOrder(out_trade_no, mch_id, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 撤销订单（同步）

```js
let result =await WxPay.reverseOrderAsync(out_trade_no, mch_id, payKey);
```

#### 撤销订单（异步）

```js
WxPay.reverseOrder(out_trade_no, mch_id, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

### 2、支付宝

```js
//导入支付宝对象
import {AliPay} from 'yungouos-pay-uniapp-sdk'
```

#### 扫码支付（同步）

```js
let result =await AliPay.nativePayAsync(out_trade_no, total_fee, mch_id, body, type, attach, notify_url,hbfq_num,hbfq_percent,payKey);
//二维码链接地址
console.log(result);
```

#### 扫码支付（异步）

```js
AliPay.nativePay(out_trade_no, total_fee, mch_id, body, type, attach, notify_url,hbfq_num,hbfq_percent, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### wap支付（同步）

```js
let result =await AliPay.wapPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url,hbfq_num,hbfq_percent, payKey);
//wap支付链接地址
console.log(result);
```

#### wap支付（异步）

```js
AliPay.wapPay(out_trade_no, total_fee, mch_id, body, attach, notify_url,hbfq_num,hbfq_percent, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### js支付（同步）

```js
let result =await AliPay.jsPayAsync(out_trade_no, total_fee, mch_id,buyer_id,body, attach, notify_url,hbfq_num,hbfq_percent, payKey);
//支付宝JSSDK所需的参数
console.log(result);
```

#### js支付（异步）

```js
AliPay.jsPay(out_trade_no, total_fee, mch_id,buyer_id,body, attach, notify_url,hbfq_num,hbfq_percent, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### H5支付（同步）

```js
let result =await AliPay.h5PayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url,hbfq_num,hbfq_percent, payKey);
//H5支付表单
console.log(result);
```

#### H5支付（异步）

```js
AliPay.h5Pay(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url,hbfq_num,hbfq_percent, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### app支付（同步）

```js
let result =await AliPay.appPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url,hbfq_num,hbfq_percent, payKey);
//APP支付所需的参数
console.log(result);
```

#### app支付（异步）

```js
AliPay.appPay(out_trade_no, total_fee, mch_id, body, attach, notify_url,hbfq_num,hbfq_percent, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 电脑网站支付（同步）

```js
let result =await AliPay.webPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, hbfq_num, hbfq_percent, payKey);
```

#### 电脑网站支付（异步）

```js
AliPay.webPay(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, hbfq_num, hbfq_percent, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```


#### 发起退款（同步）

```js
let result =await AliPay.refundAsync(out_trade_no, mch_id, money, out_trade_refund_no,refund_desc,notify_url, payKey);
//发起退款结果
console.log(result);
```

#### 发起退款（异步）

```js
AliPay.refund(out_trade_no, mch_id, money,out_trade_refund_no, refund_desc,notify_url, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 查询退款结果（同步）

```js
let result =await AliPay.getRefundResultAsync(out_trade_no, mch_id, money, refund_desc, payKey);
//查询退款结果
console.log(result);
```

#### 查询退款结果（异步）

```js
AliPay.getRefundResult(out_trade_no, mch_id, money, refund_desc, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 关闭订单（同步）

```js
let result =await AliPay.closeOrderAsync(out_trade_no, mch_id, payKey);
```

#### 关闭订单（异步）

```js
AliPay.closeOrder(out_trade_no, mch_id, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 撤销订单（同步）

```js
let result =await AliPay.reverseOrderAsync(out_trade_no, mch_id, payKey);
```

#### 撤销订单（异步）

```js
AliPay.reverseOrder(out_trade_no, mch_id, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```


### 3、支付分账

```js
//导入分账对象
import {Finance} from 'yungouos-pay-uniapp-sdk'
```

#### 微信支付配置分账账户（同步）

```js
let result =await Finance.wxPayConfigAsync(mch_id, appId, reason,openId, receiver_mch_id, name, rate, money, payKey);
//配置分账结果
console.log(result);
```

#### 微信支付配置分账账户（异步）

```js
Finance.wxPayConfig(mch_id, appId, reason,openId, receiver_mch_id, name, rate, money, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 支付宝配置分账账户（同步）

```js
let result =await Finance.aliPayConfigAsync(mch_id, reason,account, name, rate, money, payKey);
//配置分账结果
console.log(result);
```

#### 支付宝配置分账账户（异步）

```js
Finance.aliPayConfig(mch_id, reason,account, name, rate, money, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 生成分账账单（同步）

```js
let result =await Finance.createBillV2Async(mch_id, out_trade_no, config_no,rate,money,notify_url, payKey);
//生成分账账单结果
console.log(result);
```

#### 生成分账账单（异步）

```js
Finance.createBillV2(mch_id, out_trade_no, config_no,rate,money,notify_url, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 发起分账支付（同步）

```js
let result =await Finance.sendPayAsync(mch_id, ps_no, description, payKey);
//发起分账支付结果
console.log(result);
```

#### 发起分账支付（异步）

```js
Finance.sendPay(mch_id, ps_no, description, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 查询分账（同步）

```js
let result =await Finance.getPayInfoAsync(mch_id, ps_no, payKey);
//查询分账
console.log(result);
```

#### 查询分账（异步）

```js
Finance.getPayInfo(mch_id, ps_no, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 完结分账（同步）

```js
let result =await Finance.finishAsync(mch_id, out_trade_no, payKey);
//完结分账结果
console.log(result);
```

#### 完结分账（异步）

```js
Finance.finish(mch_id, out_trade_no, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

### 4、转账代付

```js
//导入转账对象
import {Finance} from 'yungouos-pay-uniapp-sdk'
```

#### 转账到微信零钱（同步）

```js
let result =await Finance.rePayWxPayAsync(merchant_id, out_trade_no, account, account_name, money, desc, mch_id,notify_url, key);
//微信转账结果
console.log(result);
```

#### 转账到微信零钱（异步）

```js
Finance.rePayWxPay(merchant_id, out_trade_no, account, account_name, money, desc, mch_id,notify_url, key).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 转账到支付宝（同步）

```js
let result =await Finance.rePayAliPayAsync(merchant_id, out_trade_no, account, account_name, money, desc, mch_id,notify_url, key);
//支付宝转账结果
console.log(result);
```

#### 转账到支付宝（异步）

```js
Finance.rePayAliPay(merchant_id, out_trade_no, account, account_name, money, desc, mch_id,notify_url, key).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 转账到银行卡（同步）

```js
let result =await Finance.rePayBankAsync(merchant_id, out_trade_no, account, account_name, money, desc,bank_type,bank_name,bank_code,mch_id,app_id,notify_url,key);
//转账到银行卡结果
console.log(result);
```

#### 转账到银行卡（异步）

```js
Finance.rePayBank(merchant_id, out_trade_no, account, account_name, money, desc,bank_type,bank_name,bank_code,mch_id,app_id,notify_url,key).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 查询转账详情（同步）

```js
let result =await Finance.getRePayInfoAsync(out_trade_no, merchant_id, key);
//转账详情
console.log(result);
```

#### 查询转账详情（异步）

```js
Finance.getRePayInfo(out_trade_no, merchant_id, key).then((response)=>{
    //转账详情
    console.log(response);
});
```

#### 发起批量转账（同步）

```js
let result =await Finance.batchPayCreateAsync(out_trade_no, mch_id, repay_order_list, pay_type, order_title, time_expire, description, notify_url, return_url, key);
//发起批量转账结果
console.log(result);
```

#### 发起批量转账（异步）

```js
Finance.batchPayCreate(out_trade_no, mch_id, repay_order_list, pay_type, order_title, time_expire, description, notify_url, return_url, key).then((response)=>{
    //发起批量转账结果
    console.log(response);
});
```

#### 确认批量转账（同步）

```js
let result =await Finance.batchPaySendPayAsync(out_trade_no, batch_no, mch_id, type,app_code, key);
//确认批量转账结果
console.log(result);
```

#### 确认批量转账（异步）

```js
Finance.batchPaySendPay(out_trade_no, batch_no, mch_id, type,app_code, key).then((response)=>{
    //确认批量转账结果
    console.log(response);
});
```

#### 查询批量转账（同步）

```js
let result =await Finance.getBatchPayInfoAsync(out_trade_no, batch_no, mch_id, key);
//查询批量转账结果
console.log(result);
```

#### 查询批量转账（异步）

```js
Finance.getBatchPayInfo(out_trade_no, batch_no, mch_id, key).then((response)=>{
    //查询批量转账结果
    console.log(response);
});
```

#### 关闭批量转账（同步）

```js
let result =await Finance.batchPayCloseAsync(out_trade_no, batch_no, mch_id, key);
//关闭批量转账结果
console.log(result);
```

#### 关闭批量转账（异步）

```js
Finance..batchPayClose(out_trade_no, batch_no, mch_id, key).then((response)=>{
    //关闭批量转账结果
    console.log(response);
});
```

### 5、订单查询

```js
//导入订单对象
import {Order} from 'yungouos-pay-uniapp-sdk'
```

#### 查询订单（同步）

```js
let result =await Order.getOrderInfoAsync(out_trade_no,mch_id,payKey);
//订单查询结果
console.log(result);
```

#### 查询订单（异步）

```js
Order.getOrderInfo(out_trade_no,mch_id,payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

### 6、微信登录

```js
//导入微信登录对象
import {WxLogin} from 'yungouos-pay-uniapp-sdk'
```

#### 获取授权链接（同步）

```js
let result =await WxLogin.getOauthUrlAsync(mch_id, callback_url, type, params, key);
//获取授权链接结果
console.log(result);
```

#### 获取授权链接（异步）

```js
WxLogin.getOauthUrl(mch_id, callback_url, type, params, key).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 微信PC扫码登录（同步）

```js
let result =await WxLogin.getWebLoginAsync(mch_id, callback_url,params, key);
//获取授权链接结果
console.log(result);
```

#### 微信PC扫码登录（异步）

```js
WxLogin.getWebLoginAsync(mch_id, callback_url,params, key).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 查询授权信息（异步）

```js
let result =await WxLogin.getOauthInfoAsync(mch_id, code, key);
//获取授权链接结果
console.log(result);
```

#### 查询授权信息（异步）

```js
WxLogin.getOauthInfo(mch_id, code, key).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

### 7、支付盾

```js
//导入支付盾对象
import {PayBlack} from 'yungouos-pay-uniapp-sdk'
```

#### 添加黑名单（同步）

```js
let result =await PayBlack.createAsync(mch_id, account, reason, end_time, payKey);
//创建支付盾黑名单结果
console.log(result);
```

#### 添加黑名单（异步）

```js
PayBlack.create(mch_id, account, reason, end_time, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

#### 验证黑名单（同步）

```js
let result =await PayBlack.checkAsync(mch_id, account, payKey);
//是否黑名单结果
console.log(result);
```

#### 验证黑名单（异步）

```js
PayBlack.check(mch_id, account, payKey).then((response)=>{
    //接口返回结果
    console.log(response);
});
```

### 8、签名工具

```js
//导入签名工具对象
import {PaySignUtil} from 'yungouos-pay-uniapp-sdk'
```

```js
//参数签名
let sign=PaySignUtil.paySign(params, key);
```

```js
//验证签名（对应的参数值从异步回调请求中获取）
let params={
    code:code,
    orderNo:orderNo,
    outTradeNo:outTradeNo,
    payNo:payNo,
    money:money,
    mchId:mchId
}
let sign="从异步回调请求中获取";
let key="支付商户号（mchId）对应的支付密钥";
let result=PaySignUtil.checkNotifySign(params,sign,key);
```
