# YunGouOS-PAY-SDK

![https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/logo/merchant/logo.png](https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/logo/merchant/logo.png)


# 关于我们

YunGouOS微信支付官方合作伙伴,YunGouOS-PAY是徐州市云宝网络科技有限公司研发的支付产品。

过去我们只将支付提供给自身系统使用，我们对市面上各种第四方支付深感痛恨 我们深知一些个人用户对支付的渴望。

为此，我们开放了重量级产品，YunGouOS旗下“微信个人支付”正式对外开放。

为更多开发者、个体户、个人创业者、小公司提供正规的个人支付产品支持个人、个体户、企业申请签约，资金由微信结算。

# 用户疑惑

很多用户对官方个人支付持有怀疑等态度，表示理解，过去市场上出现了大量的所谓个人支付 基本采取以下几种方式：

第一种 普通的微信号的收款码。这个不支持信用卡支付、受限于个人账户20万每年的限额、同时官方对这方面不提供接口回调。

有些第三方通过外挂挂机等形式完成 稳定性不高。

第二种 二次清算，某企业与微信签约。与使用者二次清算（ps：其中风险自行衡量）

我们提供的则与官网相差无异，我们是微信支付合作伙伴，拥有直接开户权限，支持个人开户、个体户开户、企业开户。

我们并非使用某种外挂等形式完成支付，与普通企业申请一样，提交资料-》微信审核-》审核通过后微信下发商户号-》根据官网文档完成API对接

个人开户支持接口：扫码支付、JSAPI支付、付款码支付、小程序支付、查询、退款等微信官方接口。单日限额30万。

个体户开户支持接口：扫码支付、JSAPI支付、付款码支付、查询、退款等微信官方接口。可使用微信官方营销产品。无限额。

企业开户支持接口：扫码支付、JSAPI支付、付款码支付、小程序支付、APP支付。可使用所有微信官方营销产品。无限额。

# 流程图

![开户流程](https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/merchant/images/step.png)

# 如何使用

在官网提交资料，由微信审核，审核通过后下发商户号，对接使用。

# 相关地址

官网地址：[http://merchant.yungouos.com](http://merchant.yungouos.com "http://merchant.yungouos.com")

接口文档：[http://open.pay.yungouos.com](http://open.pay.yungouos.com "http://open.pay.yungouos.com")

# 演示

1、下载代码放到web容器中

2、访问 [http://127.0.0.1/demo](http://127.0.0.1/demo "http://127.0.0.1/demo")


# 快速开始

1、下载YunGouOS-PHP-SDK 到您的项目中

2、在需要发起支付的地方导入 /wxpay/WxPay.php;

3、实例化对象 $wxpay = new WxPay();

# 示例代码

demo文件夹下已经集成了扫码支付、收银台支付、JSAPI支付


## 微信扫码支付

返回二维码地址或微信支付二维码连接（需自行生成二维码）

    $result = $wxpay->nativePay($out_trade_no, $total_fee, $mch_id, $body, $type, $attach, $notify_url, $return_url, $key);



## 微信公众号支付

返回JSSDK需要的支付jspackage

	$jsapi = $wxpay->jsapiPay($params['out_trade_no'], $params['total_fee'], $params['mch_id'], $params['body'], $openId, $params['attach'], $params['notify_url'], $params['return_url'], $params['key']);

## 收银台支付

返回收银台支付地址，跳转到该地址即可。收银台可根据用户设备自动决定扫码支付还是JSAPI支付
	
	$result=$wxpay->cashierPay($out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $return_url, $key);


没错就是这么简单，就可以快速的接入微信官方支付。


# 方法说明

## 微信扫码支付

    $wxpay->nativePay(订单号,支付金额,微信支付商户号,商品描述,返回类型，附加数据，异步回调地址,同步回调地址,商户密钥)

## 微信公众号支付

	 $wxpay->jsapiPay(订单号,支付金额,微信支付商户号,商品描述,用户openid，附加数据，异步回调地址,同步回调地址,商户密钥)

## 收银台支付

	 $wxpay->cashierPay(订单号,支付金额,微信支付商户号,商品描述,附加数据，异步回调地址,同步回调地址,商户密钥)


	
## 签名工具
	 $wxPaySign->getSign(需要加密的array,商户密钥)

	
	