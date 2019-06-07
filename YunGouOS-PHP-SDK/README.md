# YunGouOS-PAY-SDK
微信官方合作伙伴，直接微信开户，非聚合支付、非二次清算。资金微信直连结算到自己银行卡

# 如何使用

在官网提交资料，由微信审核，审核通过后下发商户号，对接使用。

# 相关地址

官网地址：[http://merchant.yungouos.com](http://merchant.yungouos.com "http://merchant.yungouos.com")

接口文档：[http://open.pay.yungouos.com](http://open.pay.yungouos.com "http://open.pay.yungouos.com")

# 演示

1、下载代码放到web容器中

2、访问 [http://127.0.0.1/demo](http://127.0.0.1/demo "http://127.0.0.1/demo")

3、在线演示 [http://demo.php.yungouos.com/demo](http://demo.php.yungouos.com/demo "http://demo.php.yungouos.com/demo")


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

	
	