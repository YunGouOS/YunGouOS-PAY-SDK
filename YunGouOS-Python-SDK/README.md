# YunGouOS-PAY-SDK
微信官方合作伙伴，直接微信/支付宝开户，非聚合支付、非二次清算。资金微信/支付宝直连结算到自己银行卡

# 如何使用

在官网提交资料，由微信/支付宝审核，审核通过后下发商户号，对接使用。

# 相关地址

官网地址：[http://merchant.yungouos.com](http://merchant.yungouos.com "http://merchant.yungouos.com")

接口文档：[http://open.pay.yungouos.com](http://open.pay.yungouos.com "http://open.pay.yungouos.com")

# 演示

在线演示 [http://demo.php.yungouos.com/demo](http://demo.php.yungouos.com/demo "http://demo.php.yungouos.com/demo")


# 快速开始

1、下载YunGouOS-Python-SDK 到您的项目中

2、在需要发起支付的地方导入 wx_pay.py;

3、实例化对象 
	
	微信支付 wx_pay = WxPay()
	支付宝（暂未开发）

# 示例代码

demo文件夹下已经集成了微信收银台支付；微信JSAPI支付、支付宝扫码、支付WAP、微信扫码支付将后续上线

# 微信支付


## 收银台支付

返回收银台支付地址，跳转到该地址即可。收银台可根据用户设备自动决定扫码支付还是JSAPI支付
	
	result = wx_pay.cashierPay(out_trade_no=out_trade_no,
                                   total_fee=total_fee,
                                   mch_id=MCH_ID, body=body,
                                   notify_url=notify_url,
                                   return_url=return_url, key=PAY_KEY)

## 微信扫码支付

返回二维码地址或微信支付二维码连接（需自行生成二维码）


## 微信公众号支付

返回JSSDK需要的支付jspackage




## 微信H5支付

第三方浏览器外部拉起微信客户端进行支付，返回H5页面拉起微信APP的链接地址
	
	

## 微信APP支付

第三方APP拉起微信APP进行支付，返回微信APP端SDK所需的支付参数，客户端需要按照微信官方SDK拉起方法，自行拉起。
	
	

## 微信付款码支付

线下扫码枪、扫码盒子、收银软件被扫支付，客户主动出示付款码，借助扫码设备完成收款。
	
	

## 微信刷脸支付

配合微信刷脸设备，如青蛙Pro、或其他支持微信刷脸的摄像头读取用户faceid后调用该接口完成扣款。
	


# 微信支付方法说明

## 微信扫码支付

## 微信公众号支付


## 微信收银台支付

	wx_pay.cashierPay(out_trade_no=out_trade_no,
                                   total_fee=total_fee,
                                   mch_id=MCH_ID, body=body,
                                   notify_url=notify_url,
                                   return_url=return_url, key=PAY_KEY)

## 微信H5支付

## 微信APP支付
	
## 微信付款码支付

## 微信刷脸支付

## 发起退款

## 查询退款结果

## 查询微信结算信息

## 发起微信结算

## 下载微信对账单



# 签名工具
	 pay_sign = PaySign()
	 
	 sign = pay_sign.get_sign(params_dict, key)
	 pay_sign.check_notify_sign(request.POST, PAY_KEY)

	
	
