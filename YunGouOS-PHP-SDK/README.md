# YunGouOS-PAY-SDK
微信官方合作伙伴，直接微信/支付宝开户，非聚合支付、非二次清算。资金微信/支付宝直连结算到自己银行卡

# 如何使用

在官网提交资料，由微信/支付宝审核，审核通过后下发商户号，对接使用。

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

3、实例化对象 
	
	微信支付 $wxpay = new WxPay(); 
	支付宝   $alipay= new AliPay();

# 示例代码

demo文件夹下已经集成了微信扫码支付、微信收银台支付、微信JSAPI支付、支付宝扫码、支付WAP

# 文件夹说明

    `	├─alipay //支付宝相关接口
		│      AliPay.php 
		│      
		├─config
		│      YunGouOSPayApiConfig.php  //API地址配置
		│      
		├─demo //调用示例代码
		│      index.php
		│      notify.php
		│      oauth.php
		│      payController.php
		│      return.php
		│
		├─finance //资金类相关，分账、转账
		│      Finance.php
		│
		├─merge //聚合支付相关
		│      Merge.php
		│
		├─order //订单相关
		│      Order.php
		│      
		├─util //工具类
		│      HttpUtil.php //http
		│      PaySign.php //签名
		│
        └─wxapi //微信登录相关接口
        │     		 WxA.php`
		│
		└─wxpay //微信支付相关接口
       		 WxPay.php`

# 微信支付

## 微信扫码支付

返回二维码地址或微信支付二维码连接（需自行生成二维码）

    $result = $wxpay->nativePay($out_trade_no, $total_fee, $mch_id, $body, $type, $attach, $notify_url,$config_no, $auto, $auto_node,$biz_params, $key);

## 微信公众号支付

返回JSSDK需要的支付jspackage

	$jsapi = $wxpay->jsapiPay($out_trade_no, $total_fee, $mch_id, $body, $openId, $attach, $notify_url,$return_url,$config_no, $auto, $auto_node,$biz_params, $key);

## 收银台支付

返回收银台支付地址，跳转到该地址即可。收银台可根据用户设备自动决定扫码支付还是JSAPI支付
	
	$result=$wxpay->cashierPay($out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $return_url, $config_no, $auto, $auto_node,$biz_params, $key);

## 微信H5支付

第三方浏览器外部拉起微信客户端进行支付，返回H5页面拉起微信APP的链接地址
	
	$result=$wxpay->wapPay($out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $return_url, $config_no, $auto, $auto_node,$biz_params, $key);

## 微信APP支付

第三方APP拉起微信APP进行支付，返回微信APP端SDK所需的支付参数，客户端需要按照微信官方SDK拉起方法，自行拉起。
	
	$result=$wxpay->appPay($app_id, $out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $config_no, $auto, $auto_node,$biz_params, $key);

## 微信付款码支付

线下扫码枪、扫码盒子、收银软件被扫支付，客户主动出示付款码，借助扫码设备完成收款。
	
	$result=$wxpay->codePay($out_trade_no, $total_fee, $mch_id, $body, $auth_code, $attach, $receipt, $notify_url, $config_no, $auto, $auto_node, $biz_params,$key);

## 微信刷脸支付

配合微信刷脸设备，如青蛙Pro、或其他支持微信刷脸的摄像头读取用户faceid后调用该接口完成扣款。
	
	$result=$wxpay->facePay($out_trade_no, $total_fee, $mch_id, $body, $openId, $face_code, $attach, $notify_url, $config_no, $auto, $auto_node,$biz_params, $key);


# 支付宝

## 支付宝扫码支付

	$result = $alipay->nativePay($out_trade_no, $total_fee, $mch_id, $body, $type, $attach, $notify_url,$config_no, $auto, $auto_node, $key);

## 支付宝WAP支付

	$result = $alipay->wapPay($out_trade_no, $total_fee, $mch_id, $body,$attach, $notify_url,$config_no, $auto, $auto_node, $key);

## 支付宝JS支付

	$result = $alipay->jsPay($out_trade_no, $total_fee, $mch_id,$buyer_id,$body,$attach, $notify_url,$config_no, $auto, $auto_node, $key);

## 支付宝H5支付

	$result = $alipay->h5Pay($out_trade_no, $total_fee, $mch_id, $body,$attach, $notify_url,$return_url,$config_no, $auto, $auto_node,$key);

## 支付宝APP支付

	$result = $alipay->appPay($out_trade_no, $total_fee, $mch_id, $body,$attach, $notify_url,$config_no, $auto, $auto_node, $key);

## 支付宝发起退款

	$result = $alipay->orderRefund($out_trade_no, $mch_id, $money, $refund_desc, $key);

## 支付宝查询退款结果

	$result = $alipay->getRefundResult($refund_no, $mch_id, $key);


# 资金分账

## 配置分账账户

	$result =$finance->configV2($mch_id,$appId, $reason, $channel, $openId,$receiver_mch_id, $name, $rate, $money, $key);

## 生成分账账单

	$result =$finance->createBill($mch_id, $out_trade_no, $config_no, $key);

## 发起分账支付

	$result =$finance->sendPay($mch_id, $ps_no, $description, $key);

## 查询分账

	$result =$finance->getInfo($mch_id, $ps_no, $key);

## 完结分账

	$result =$finance->finish($mch_id, $out_trade_no, $key);


# 资金转账

## 转账到微信零钱

	$result =$finance->rePayWxPay($merchant_id, $out_trade_no,$account,$account_name,$money,$desc,$mch_id, $key);

## 转账到支付宝账户

	$result =$finance->rePayAliPay($merchant_id, $out_trade_no,$account,$account_name,$money,$desc,$mch_id, $key);


没错就是这么简单，就可以快速的接入微信/支付宝官方支付。


# 微信支付方法说明

## 微信扫码支付

    $wxpay->nativePay(订单号,支付金额,微信支付商户号,商品描述,返回类型,附加数据,异步回调地址,分账配置单号,是否自动分账,自动分账节点,支付业务附加参数,商户密钥);

## 微信公众号支付

	 $wxpay->jsapiPay(订单号,支付金额,微信支付商户号,商品描述,用户openid,附加数据,异步回调地址,分账配置单号,是否自动分账,自动分账节点,支付业务附加参数,商户密钥);

## 微信收银台支付

	 $wxpay->cashierPay(订单号,支付金额,微信支付商户号,商品描述,附加数据,异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,支付业务附加参数,商户密钥);

## 微信H5支付

	$wxpay->wapPay(订单号, 支付金额, 微信支付商户号, 商品描述, 附加数据, 异步回调地址, 同步回调地址,分账配置单号,是否自动分账,自动分账节点,支付业务附加参数,商户密钥);

## 微信APP支付

	$wxpay->wapPay(开放平台APPID,订单号, 支付金额, 微信支付商户号, 商品描述, 附加数据, 异步回调地址,分账配置单号,是否自动分账,自动分账节点,支付业务附加参数,商户密钥);

## 微信付款码支付

	$wxpay->codePay(订单号, 支付金额, 微信支付商户号, 商品描述, 付款码, 附加数据, 是否需要发票,异步回调地址,分账配置单号,是否自动分账,自动分账节点,支付业务附加参数,商户密钥);

## 微信刷脸支付

	$wxpay->facePay(订单号, 支付金额, 微信支付商户号, 商品描述,用户openid,人脸凭证, 附加数据, 异步回调地址,分账配置单号,是否自动分账,自动分账节点,支付业务附加参数,商户密钥);

## 发起退款

	$wxpay->orderRefund(订单号,微信支付商户号,退款金额,退款描述,异步回调地址,商户密钥);

## 查询退款结果

	$wxpay->getRefundResult(退款单号,微信支付商户号,商户密钥);

## 查询微信结算信息

	$wxpay->getWxBillInfo(微信支付商户号,查询日期,商户密钥);

## 发起微信结算

	$wxpay->sendWxPayCash(微信支付商户号,结算日期,商户密钥);

## 下载微信对账单

	$wxpay->downloadBill(微信支付商户号,对账单日期,对账单结束日期,设备/门店,商户密钥);


# 支付宝支付方法说明

## 支付宝扫码支付

	$alipay->nativePay(订单号,支付金额,支付宝商户号,商品描述,返回类型，附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,商户密钥);

## 支付宝WAP支付

	$alipay->wapPay(订单号,支付金额,支付宝商户号,商品描述，附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,商户密钥);

## 支付宝JS支付

	$alipay->jsPay(订单号,支付金额,支付宝商户号,买家支付宝ID,商品描述，附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,商户密钥);

## 支付宝H5支付

	$alipay->h5Pay(订单号,支付金额,支付宝商户号,商品描述，附加数据，异步回调地址,同步回调地址,分账配置单号,是否自动分账,自动分账节点,商户密钥);

## 支付宝APP支付

	$alipay->appPay(订单号,支付金额,支付宝商户号,商品描述，附加数据，异步回调地址,分账配置单号,是否自动分账,自动分账节点,商户密钥);

## 发起退款
	
	$alipay->orderRefund(订单号,支付宝商户号,退款金额,退款描述,商户密钥);

## 查询退款结果

	$alipay->getRefundResult(退款单号,支付宝商户号,商户密钥);
	
# 资金分账方法说明	

## 配置分账账户

	$result =$finance->configV2(分账方支付商户号,自定义appId, 分账原因, 分账渠道, 分账收款方的openId,分账收款方的商户号, 分账收款方姓名, 分账比例, 固定分账金额, 商户密钥);

## 生成分账账单

	$result =$finance->createBill(分账方支付商户号, 订单号, 配置单号,分账比例,分账金额,分账回调,商户密钥);

## 发起分账支付

	$result =$finance->sendPay(分账方支付商户号, 分账单号, 分账描述, 商户密钥);

## 查询分账支付结果

	$result =$finance->getPayResult(分账方支付商户号, 分账单号, 商户密钥);

## 完结分账

	$result =$finance->finish(分账方支付商户号, 商户单号, 商户密钥);

# 资金转账方法说明	

## 转账到微信零钱

	$result =$finance->rePayWxPay(YunGouOS商户ID, 商户单号,收款账户openid,收款方真实姓名,付款金额,付款描述,付款商户号, 商户密钥);

## 转账到支付宝

	$result =$finance->rePayAliPay(YunGouOS商户ID, 商户单号,收款支付宝账户,收款方真实姓名,付款金额,付款描述,付款商户号, 商户密钥)

# 签名工具
	 $paySign->getSign(需要加密的array,商户密钥);

	 $paySign->checkNotifySign(post对象,商户密钥)

	
	