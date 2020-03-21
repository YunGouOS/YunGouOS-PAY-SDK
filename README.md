# YunGouOS-PAY-SDK

![https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/logo/merchant/logo.png](https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/logo/merchant/logo.png)


# 关于我们

YunGouOS微信支付官方合作伙伴,YunGouOS-PAY是徐州市云宝网络科技有限公司研发的支付产品。

过去我们只将支付提供给自身系统使用，我们对市面上各种第四方支付深感痛恨 我们深知一些个人用户对支付的渴望。

为此，我们开放了重量级产品，YunGouOS旗下“支付API系统”正式对外开放。

为更多开发者、个体户、个人创业者、小公司提供正规的个人支付产品支持个人、个体户、企业申请签约，资金由微信官方直连结算。

# 用户疑惑

很多用户对官方个人支付持有怀疑等态度，表示理解，过去市场上出现了大量的所谓个人支付 基本采取以下几种方式：

第一种 普通的微信号的收款码。这个不支持信用卡支付、受限于个人账户20万每年的限额、同时官方对这方面不提供接口回调。

有些第三方通过外挂挂机等形式完成 稳定性不高。

第二种 二次清算，某企业与微信签约。与使用者二次清算（ps：其中风险自行衡量）

我们提供的则与官网相差无异，我们是微信支付合作伙伴，拥有直接开户权限，支持个人开户、个体户开户、企业开户。

我们并非使用某种外挂等形式完成支付，与普通企业申请一样，提交资料-》微信审核-》审核通过后微信下发商户号-》根据官网文档完成API对接

个人开户支持接口：扫码支付、JSAPI支付、付款码支付、小程序支付、刷脸支付、查询、退款等微信官方接口。单日限额30万。

个体户开户支持接口：扫码支付、JSAPI支付、付款码支付、刷脸支付、查询、退款等微信官方接口。可使用微信官方营销产品。无限额。

企业开户支持接口：扫码支付、JSAPI支付、付款码支付、小程序支付、刷脸支付、H5支付、APP支付。可使用所有微信官方营销产品。无限额。

# 流程图

![开户流程](https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/merchant/images/step.png)

# 如何使用

在官网提交资料，由微信/支付宝审核，审核通过后下发商户号，对接使用。

# 相关地址

官网地址：[http://merchant.yungouos.com](http://merchant.yungouos.com "http://merchant.yungouos.com")

接口文档：[http://open.pay.yungouos.com](http://open.pay.yungouos.com "http://open.pay.yungouos.com")

SDK文档：[https://apidoc.gitee.com/YunGouOS/YunGouOS-PAY-SDK/](https://apidoc.gitee.com/YunGouOS/YunGouOS-PAY-SDK/ "https://apidoc.gitee.com/YunGouOS/YunGouOS-PAY-SDK/")


# 小程序支付

针对小程序支付，我们在文档中使用大量的示例代码以及开源了一个小程序支付集成的Demo，希望帮助小程序开发者快速接入。

同时我们针对小程序也开发了小程序端的SDK，详情请看小程序内的SDK说明。只需要简单几句代码，即可接入。

小程序支付文档地址：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/minPay](http://open.pay.yungouos.com/#/api/api/pay/wxpay/minPay "http://open.pay.yungouos.com/#/api/api/pay/wxpay/minPay")

小程序SDK地址：[https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/tree/master/YunGouOS-WxApp-SDK](https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/tree/master/YunGouOS-WxApp-SDK "https://gitee.com/YunGouOS/YunGouOS-PAY-SDK/tree/master/YunGouOS-WxApp-SDK")


# 支付分账

针对商户更多的资金分配场景，如分销、推广奖励等，提供相关分账API与自动分账服务。

只需在调用支付接口时增加“分账配置单、是否分账、分账节点”三个参数即可快速实现订单分账。

去除了分账复杂的冗余流程。支持个人微信号、微信商户号分账。


## 在线体验

![https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/merchant/mindemo/minapp.jpg](https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/merchant/mindemo/minapp.jpg)




# 快速开始

maven添加依赖

  	<dependency>
	    <groupId>com.yungouos.pay</groupId>
	    <artifactId>yungouos-pay-sdk</artifactId>
	    <version>1.1.13</version>
	</dependency>


# 微信支付--示例代码


## 微信扫码支付

返回二维码地址或微信支付二维码连接（需自行生成二维码）

    String result= WxPay.nativePay(System.currentTimeMillis() + "", "1", mchId, "测试", null, null, null, null,null,null,null,key);

## 微信公众号支付

返回JSSDK需要的支付jspackage

	String jspackage = WxPay.jsapiPay(System.currentTimeMillis() + "", "1", mchId, "测试", "o-_-itxeWVTRnl-iGT_JJ-t3kpxU", null, null, null,null,null,null,key);

## 收银台支付

返回收银台支付地址，跳转到该地址即可。收银台可根据用户设备自动决定扫码支付还是JSAPI支付
	
	String cashierPayUrl=WxPay.cashierPay(System.currentTimeMillis() + "", "1", mchId, "测试收银台支付", null, null, null,null,null,null, key);

## 小程序支付

返回小程序支付所需的参数，需要使用小程序段端通过携带返回的参数跳转到支付收银小程序发起支付
	
	JSONObject minAppPay = WxPay.minAppPay(System.currentTimeMillis()+"", "0.01", mchId, "小程序支付演示", "海底捞", null, null,null,null,null,key);

## 微信刷卡支付

返回刷卡支付结果

	CodePayBiz codePayBiz = WxPay.codePay(System.currentTimeMillis() + "", "0.01", mchId, "测试", "134681285892396042", null, null, null, null, null, null, key);

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay](http://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay "http://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay")		

## 微信刷脸支付

返回微信刷脸支付结果

	FacePayBiz facePayBiz = WxPay.facePay(System.currentTimeMillis() + "", "0.01", mchId, "人脸支付测试", "o-_-itxeWVTRnl-iGT_JJ-t3kpxU", "人脸特征码", null, null, null, null, null, key);

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay](http://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay "http://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay")	

## 微信H5支付

返回H5支付的链接地址

	String result = WxPay.H5Pay(System.currentTimeMillis() + "", "0.01", mchId, "H5支付测试，仅限企业", null, null, null, null, null, null, key);

## 查询刷卡支付结果

用于查询刷卡支付结果

	CodePayBiz codePayBiz2 = WxPay.getCodePayResult("1556267522899", mchId, key);	

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/getCodePayResult](http://open.pay.yungouos.com/#/api/api/pay/wxpay/getCodePayResult "http://open.pay.yungouos.com/#/api/api/pay/wxpay/getCodePayResult")	

## 发起退款接口

	RefundOrder refundOrder = WxPay.orderRefund("1556267522899", "1529637931", "0.1", "6BA371F4CFAB4465AA04DAEADBAC4161");

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder](http://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder "http://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder")

## 查询微信退款结果接口

	RefundSearch refundSearch = WxPay.getRefundResult("R17200911248111", mchId, key);

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult](http://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult "http://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult")

没错就是这么简单，就可以快速的接入微信官方支付。

# 支付宝--示例代码 #


## 支付宝扫码支付

返回二维码地址或微信支付二维码连接（需自行生成二维码）

    String result = AliPay.nativePay(System.currentTimeMillis() + "", "0.01", "2088802674000755", "测试", null, null, null, null, "6BA371F4CFAB4465AA04DAEADBAC4161");

## 支付宝WAP支付

返回支付宝跳转连接，手机端重定向自动打开支付宝APP付款

	String result=AliPay.wapPay(System.currentTimeMillis() + "", "0.01", "2088802674000755", "支付测试", null, null, "6BA371F4CFAB4465AA04DAEADBAC4161");


## 发起支付宝退款接口

	RefundOrder refundOrder = AliPay.orderRefund("Y194506551713811", "2088802674000755", "0.1", "测试退款","6BA371F4CFAB4465AA04DAEADBAC4161");

返回结果说明：[https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder](https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder "https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder")

## 查询支付宝退款结果接口

	RefundSearch refundSearch = AliPay.getRefundResult("R17200911248111", "2088802674000755", key);

返回结果说明：[https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult](https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult "https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult")

没错就是这么简单，就可以快速的接入支付宝官方支付。

# 其他接口

## 订单查询接口
	PayOrder payOrder = SystemOrder.getOrderInfoByOutTradeNo("1556267522899", "1529637931", "6BA371F4CFAB4465AA04DAEADBAC4161");
	

返回结果说明：[http://open.pay.yungouos.com/#/api/api/pay/wxpay/getWxPayOrderInfo](http://open.pay.yungouos.com/#/api/api/pay/wxpay/getWxPayOrderInfo "http://open.pay.yungouos.com/#/api/api/pay/wxpay/getWxPayOrderInfo")



## 获取微信授权URL

	String url="http://www.yungouos.com/oauth?a=1"; 
	JSONObject paramJson=new JSONObject();
	paramJson.put("key", "123456");
	String oauthUrl = WxPay.getWxOauthUrl(paramJson.toJSONString(), url);

## 查询微信授权信息

	WxOauthInfo wxOauthInfo = WxPay.getWxOauthInfo("45AA0CEE43AE4F048384D655A77FA770");

# 方法说明

## 微信扫码支付

    WxPay.nativePay(订单号,支付金额,微信支付商户号,商品描述,返回类型，附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,商户密钥)

## 微信公众号支付

	 WxPay.jsapi(订单号,支付金额,微信支付商户号,商品描述,用户openid，附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,商户密钥)

## 收银台支付

	 WxPay.cashierPay(订单号,支付金额,微信支付商户号,商品描述,附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,商户密钥)

## 小程序支付

	 WxPay.minAppPay(订单号,支付金额,微信支付商户号,商品描述,收银台标题,附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,商户密钥)

## 订单查询

	WxPay.getOrderInfoByOutTradeNo(订单号, 微信支付商户号, 商户密钥);

## 发起退款

	WxPay.orderRefund(订单号, 微信支付商户号, 退款金额, 商户密钥);
	
## 查询微信支付退款结果
	
	WxPay.getRefundResult(退款单号（发起退款接口返回）,微信支付商户号, 商户密钥);

## 获取微信授权URL
	
	WxPay.getWxOauthUrl(额外参数json字符串,授权结束后返回地址);

## 查询微信授权信息

	WxPay.getWxOauthInfo(授权结束后返回的code);

## 支付宝扫码支付
	
	AliPay.nativePay(订单号,支付金额,支付宝商户号,商品描述,返回类型，附加数据，异步回调地址,同步回调地址,商户密钥);

## 支付宝WAP支付

	AliPay.wapPay(订单号,支付金额,支付宝商户号,商品描述,附加数据，异步回调地址,商户密钥);

## 发起支付宝退款

	AliPay.orderRefund(订单号, 支付宝商户号, 退款金额, 退款描述,商户密钥);

## 查询支付宝退款结果
	
	WxPay.getRefundResult(退款单号（发起退款接口返回）,支付宝商户号, 商户密钥);
	
## 签名工具
	 //参数签名
	 PaySignUtil.createSign([类型Map]签名参数,商户密钥)；

	 //回调签名验证
	 PaySignUtil.checkNotifySign(回调的request对象)；

	
	