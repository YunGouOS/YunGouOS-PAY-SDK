# YunGouOS-PAY-SDK

![https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/logo/merchant/logo.png](https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/logo/merchant/logo.png)


# 关于我们

YunGouOS微信支付官方合作伙伴,YunGouOS-PAY是徐州市云宝网络科技有限公司研发的支付产品。

过去我们只将支付提供给自身系统使用，我们对市面上各种第四方支付深感痛恨 我们深知一些个人用户对支付的渴望。

为此，我们开放了重量级产品，YunGouOS旗下“微信个人支付”正式对外开放。

为更多开发者、个体户、个人创业者、小公司提供正规的个人支付产品支持个人、个体户、企业申请签约，资金由微信结算。


# 如何使用

在官网提交资料，由微信审核，审核通过后下发商户号，对接使用。

# 相关地址

官网地址：[https://merchant.yungouos.com](https://merchant.yungouos.com "https://merchant.yungouos.com")

接口文档：[http://open.pay.yungouos.com](http://open.pay.yungouos.com "http://open.pay.yungouos.com")


# 快速开始

方式一：下载jar架包 导入

方式二：maven引用（目前正在提交）


# 示例代码


## 微信扫码支付

返回二维码地址或微信支付二维码连接（需自行生成二维码）

    String result = WxPay.nativePay(System.currentTimeMillis() + "", "0.01", "1529637931", "测试", null, null, null, null, "6BA371F4CFAB4465AA04DAEADBAC4161");



## 微信公众号支付

返回 返回JSSDK需要的支付jspackage

	String jspackage = WxPay.jsapi(System.currentTimeMillis() + "", "0.01", "1529637931", "测试", "o-_-itxeWVTRnl-iGT_JJ-t3kpxU", null, null, null, "6BA371F4CFAB4465AA04DAEADBAC4161");


没错就是这么简单，就可以快速的接入微信官方支付。


# 方法说明

## 微信扫码支付

    WxPay.nativePay(订单号,支付金额,微信支付商户号,商品描述,返回类型，附加数据，异步回调地址,同步回调地址,商户密钥)

## 微信公众号支付

	 WxPay.jsapi(订单号,支付金额,微信支付商户号,商品描述,用户openid，附加数据，异步回调地址,同步回调地址,商户密钥)
	


