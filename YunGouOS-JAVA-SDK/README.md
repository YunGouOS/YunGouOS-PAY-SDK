# 快速开始

### maven添加依赖

```java
<dependency>
<groupId>com.yungouos.pay</groupId>
<artifactId>yungouos-pay-sdk</artifactId>
<version>2.0.26</version>
</dependency>

```

# SDK调用示例

[1、微信支付接口调用示例](https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/blob/master/YunGouOS-JAVA-SDK/src/test/java/WxPayTest.java)

[2、支付宝接口调用示例](https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/blob/master/YunGouOS-JAVA-SDK/src/test/java/AliPayTest.java)  

[3、分账接口调用示例](https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/blob/master/YunGouOS-JAVA-SDK/src/test/java/FinanceTest.java)  

[4、聚合支付接口调用示例](https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/blob/master/YunGouOS-JAVA-SDK/src/test/java/MergePayTest.java)  

[5、转账代付接口调用示例](https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/blob/master/YunGouOS-JAVA-SDK/src/test/java/RePayTest.java)  

[6、支付盾接口调用示例](https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/blob/master/YunGouOS-JAVA-SDK/src/test/java/PayBlackTest.java)  

[7、订单接口调用示例](https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/blob/master/YunGouOS-JAVA-SDK/src/test/java/OrderTest.java)  

[8、微信登录调用示例](https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/blob/master/YunGouOS-JAVA-SDK/src/test/java/WxApiTest.java)  

# 微信支付--示例代码

## 微信扫码支付

返回二维码地址或微信支付二维码连接（需自行生成二维码）

 String result= WxPay.nativePay(System.currentTimeMillis() + "", "1", mchId, "测试", null, null, null, null,null,null,null,null,key);

## 微信公众号支付

返回JSSDK需要的支付jspackage

 String jspackage = WxPay.jsapiPay(System.currentTimeMillis() + "", "1", mchId, "测试", "o-_-itxeWVTRnl-iGT_JJ-t3kpxU", null, null, null,null,null,null,null,key);

## 收银台支付

返回收银台支付地址，跳转到该地址即可。收银台可根据用户设备自动决定扫码支付还是JSAPI支付

 String cashierPayUrl=WxPay.cashierPay(System.currentTimeMillis() + "", "1", mchId, "测试收银台支付", null, null, null,null,null,null,null, key);

## 小程序支付（个人）

返回小程序支付所需的参数，需要使用小程序段端通过携带返回的参数跳转到支付收银小程序发起支付

 JSONObject minAppPay = WxPay.minAppPay(System.currentTimeMillis()+"", "0.01", mchId, "小程序支付演示", "海底捞", null, null,null,null,null,null,key);

## 小程序支付（个体户/企业）

返回小程序支付所需的参数，需要使用小程序段端通过携带返回的参数跳转到支付收银小程序发起支付

 JSONObject minAppPay = WxPay.minAppPaySend("用户openId", System.currentTimeMillis() + "", "0.01", mchId, "小程序支付演示", null, null, null, null, null, null, key);

## 微信刷卡支付

返回刷卡支付结果

 CodePayBiz codePayBiz = WxPay.codePay(System.currentTimeMillis() + "", "0.01", mchId, "测试", "134681285892396042", null, null, null, null, null, null,null, key);

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay](http://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay "http://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay")

## 微信刷脸支付

返回微信刷脸支付结果

 FacePayBiz facePayBiz = WxPay.facePay(System.currentTimeMillis() + "", "0.01", mchId, "人脸支付测试", "o-_-itxeWVTRnl-iGT_JJ-t3kpxU", "人脸特征码", null, null, null, null, null,null, key);

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay](http://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay "http://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay")

## 微信H5支付

返回H5支付的链接地址

 String result = WxPay.H5Pay(System.currentTimeMillis() + "", "0.01", mchId, "H5支付测试", null, null, null, null, null, null,null, key);

## 微信APP支付

返回APP支付所需参数

 JSONObject appPayParams = WxPay.appPay(微信开放平台APPID, System.currentTimeMillis() + "", "0.01", mchId, "APP支付测试", null, null, null, null, null,null, key);

## QQ小程序支付(个体户/企业)

返回QQ小程序支付所需参数

 QqPayBiz qqPayBiz = WxPay.qqPay("QQ小程序APPID", "QQ小程序的access_token", System.currentTimeMillis() + "", "0.01", mchId, "QQ小程序支付测试", null, null, null, null, null, null, null, key); 

## QQ小程序支付(个人)

返回跳转“支付收银”小程序所需的参数

 JSONObject qqPayParams = WxPay.qqPayParams(System.currentTimeMillis() + "", "0.01", mchId, "QQ小程序支付测试", null, null, null, null, null, null, null, null, key); 

## 微信刷脸支付凭证

返回人脸数据凭证参数

  FacePayAuthInfoBiz facePayAuthInfo = WxPay.getFacePayAuthInfo(mchId, "门店ID", "门店名称", "刷脸支付信息", "设备ID", null, null, key);

## 查询刷卡支付结果

用于查询刷卡支付结果

 CodePayBiz codePayBiz2 = WxPay.getCodePayResult("1556267522899", mchId, key); 

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/getCodePayResult](http://open.pay.yungouos.com/#/api/api/pay/wxpay/getCodePayResult "http://open.pay.yungouos.com/#/api/api/pay/wxpay/getCodePayResult")

## 发起退款接口

 RefundOrder refundOrder = WxPay.orderRefund("1556267522899", "1529637931", "0.1",null,"订单退款",null,"6BA371F4CFAB4465AA04DAEADBAC4161");

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder](http://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder "http://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder")

## 查询微信退款结果接口

 RefundSearch refundSearch = WxPay.getRefundResult("R17200911248111", mchId, key);

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult](http://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult "http://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult")

## 关闭订单

String closeOrder = WxPay.closeOrder("R17200911248111", mchId, key);

## 撤销订单

String closeOrder = WxPay.reverseOrder("R17200911248111", mchId, key);

没错就是这么简单，就可以快速的接入微信官方支付。

# 支付宝--示例代码 #

## 支付宝扫码支付

返回二维码地址或微信支付二维码连接（需自行生成二维码）

    String result = AliPay.nativePay(System.currentTimeMillis() + "", "0.01", mch_id, "测试订单", "2", null, notify, null, null, null,null,key);

## 支付宝WAP支付

返回支付宝跳转连接，手机端重定向自动打开支付宝APP付款

 String result = AliPay.wapPay(System.currentTimeMillis() + "", "0.01", mch_id, "支付测试", null, notify, null, null, null,null,key);

## 支付宝JS支付

返回支付宝JSSDK所需的参数

 AliPayJsPayBiz aliPayJsPayBiz = AliPay.jsPay(System.currentTimeMillis() + "", "0.01", mch_id, buyer_id, "支付测试", null, notify, null, null, null,null,key);

## 支付宝H5支付

返回支付宝H5支付跳转的form表单和跳转url，客户端可输出表单或直接重定向url

 AliPayH5Biz aliPayH5Biz = AliPay.h5Pay(System.currentTimeMillis() + "", "0.01", mch_id, "接口测试", null, notify, returnUrl, null, null, null,null,key);

## 支付宝APP支付

返回支付宝APP支付所需的参数，客户端按照支付宝官方APP支付SDK拉起支付宝即可

 String result = AliPay.appPay(System.currentTimeMillis() + "", "0.01", mch_id, "接口测试", null, notify, null, null, null, null,key);

## 支付宝电脑网站支付

支付宝电脑网站支付，适合PC端使用，返回PC端跳转表单字符串和跳转url

AliPayWebPayBiz aliPayWebPayBiz = AliPay.webPay(System.currentTimeMillis() + "", "0.01", mch_id, "接口测试", null, notify, null, null, null, null, hbFqBiz, key);


## 关闭订单

用于交易创建后，用户在一定时间内未进行支付，可调用该接口直接将未付款的交易进行关闭。订单如果已支付不能关闭，已支付订单需要关闭请使用撤销订单接口。

String closeOrder = AliPay.closeOrder("Y194506551713811", mch_id, key);

## 撤销订单

支付交易返回失败或支付系统超时，调用该接口撤销交易。

AliPayReverseOrderBiz aliPayReverseOrderBiz = AliPay.reverseOrder("Y194506551713811", mch_id, key);

返回结果说明：[https://open.pay.yungouos.com/#/api/api/pay/alipay/reverseOrder](https://open.pay.yungouos.com/#/api/api/pay/alipay/reverseOrder "https://open.pay.yungouos.com/#/api/api/pay/alipay/reverseOrder")

## 发起支付宝退款接口

 RefundOrder orderRefund = AliPay.orderRefund("Y194506551713811", mch_id, "0.01",null,"测试退款",null, key);

返回结果说明：[https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder](https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder "https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder")

## 查询支付宝退款结果接口

 RefundSearch refundSearch = AliPay.getRefundResult("R09441868126739", mch_id, key);

返回结果说明：[https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult](https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult "https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult")

没错就是这么简单，就可以快速的接入支付宝官方支付。

# 签名工具

  //参数签名
  PaySignUtil.createSign([类型Map]签名参数,商户密钥)；
 
  //回调签名验证
  PaySignUtil.checkNotifySign(回调的request对象,商户密钥)；

# 其他接口

## 订单查询接口

 PayOrder payOrder = SystemOrder.getOrderInfoByOutTradeNo("1556267522899", "1529637931", "6BA371F4CFAB4465AA04DAEADBAC4161");

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/getWxPayOrderInfo](http://open.pay.yungouos.com/#/api/api/pay/wxpay/getWxPayOrderInfo "http://open.pay.yungouos.com/#/api/api/pay/wxpay/getWxPayOrderInfo")

## 获取微信授权URL

 String mch_id="商户号";
 String callback_url="http://www.yungouos.com/oauth"; 
 String type="mp-base";
 JSONObject params=new JSONObject();
 params.put("key", "123456");
 String key="商户密钥";
 
 String oauthUrl = WxApi.getWxOauthUrl(mch_id, callback_url, type, params, key);

## 查询微信授权信息

 String mch_id="商户号";
 String code="授权回调返回的code";
 String key="商户密钥"; 
 WxOauthInfo wxOauthInfo = WxApi.getWxOauthInfo(mch_id, code, key);

# 方法说明

## 微信扫码支付

    WxPay.nativePay(订单号,支付金额,微信支付商户号,商品描述,返回类型，附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,附加业务参数,商户密钥)

## 微信公众号支付

  WxPay.jsapi(订单号,支付金额,微信支付商户号,商品描述,用户openid，附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,附加业务参数,商户密钥)

## 收银台支付

  WxPay.cashierPay(订单号,支付金额,微信支付商户号,商品描述,附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,附加业务参数,商户密钥)

## 小程序支付（个人）

  WxPay.minAppPay(订单号,支付金额,微信支付商户号,商品描述,收银台标题,附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,附加业务参数,商户密钥)

## 小程序支付（个体户/企业）

  WxPay.minAppPaySend(用户openId,订单号,支付金额,微信支付商户号,商品描述,附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,附加业务参数,商户密钥)

## H5支付

  WxPay.H5Pay(订单号,支付金额,微信支付商户号,商品描述,附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,附加业务参数,商户密钥)  

## APP支付

  WxPay.appPay(开放平台APPID,订单号,支付金额,微信支付商户号,商品描述,附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,附加业务参数,商户密钥)

## QQ小程序支付(个体户/企业)

 WxPay.qqPay("QQ小程序APPID", "QQ小程序的access_token", 订单号,支付金额,微信支付商户号,商品描述,附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,附加业务参数,商户密钥); 

## QQ小程序支付(个人)

 WxPay.qqPayParams("QQ小程序APPID", "QQ小程序的access_token", 订单号,支付金额,微信支付商户号,商品描述,收银台标题,附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,附加业务参数,商户密钥); 

## 刷脸支付凭证

    FacePayAuthInfoBiz facePayAuthInfo = WxPay.getFacePayAuthInfo(微信支付商户号, 门店ID, 门店名称, 刷脸支付信息, 设备ID, 附加数据,附加业务参数, 商户密钥);

## 订单查询

 SystemOrder.getOrderInfoByOutTradeNo(订单号, 微信支付商户号, 商户密钥);

## 发起退款

 WxPay.orderRefund(订单号, 微信支付商户号,自定义退款单号,退款金额,退款描述,异步回调地址,商户密钥);

## 查询微信支付退款结果

 WxPay.getRefundResult(退款单号（发起退款接口返回）,微信支付商户号, 商户密钥);

## 获取微信授权URL

 WxApi.getWxOauthUrl(商户号, 授权结束后返回地址, 类型, 额外参数json字符串, 商户密钥);

## 查询微信授权信息

  WxApi.getWxOauthInfo(商户号, 授权结束返回的code, 商户密钥);

## 支付宝扫码支付

 AliPay.nativePay(订单号,支付金额,支付宝商户号,商品描述,返回类型，附加数据，异步回调地址,同步回调地址,,分账配置单号,是否自动分账,自动分账节点,花呗分期业务,商户密钥);

## 支付宝WAP支付

 AliPay.wapPay(订单号,支付金额,支付宝商户号,商品描述,附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,花呗分期业务,商户密钥);

## 支付宝JS支付

 AliPay.jsPay(订单号,支付金额,支付宝商户号,买家的支付宝唯一用户号,商品描述,附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,花呗分期业务,商户密钥);

## 支付宝H5支付

 AliPay.h5Pay(订单号,支付金额,支付宝商户号,商品描述,附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,花呗分期业务,商户密钥);

## 支付宝APP支付

 AliPay.appPay(订单号,支付金额,支付宝商户号,商品描述,附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,花呗分期业务,商户密钥);

## 发起支付宝退款

 AliPay.orderRefund(订单号, 支付宝商户号, 退款金额,自定义退款单号,退款描述,回调地址,商户密钥);

## 查询支付宝退款结果

 WxPay.getRefundResult(退款单号（发起退款接口返回）,支付宝商户号, 商户密钥);
