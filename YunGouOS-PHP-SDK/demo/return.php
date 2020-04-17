<?php
/**
 * YunGouOS微信支付同步回调（收银台支付才会有）
 * 文档地址：http://open.pay.yungouos.com/#/api/api/pay/wxpay/cashierPay
 */

//引入签名工具
require_once dirname(dirname(__FILE__)) . '/util/PaySign.php';

//支付结果（1、支付成功）
$code = trim($_GET['code']);
//系统订单号（YunGouOS系统内单号）
$orderNo = trim($_GET['orderNo']);
//商户订单号
$outTradeNo = trim($_GET['outTradeNo']);
//微信支付单号（微信支付单号）
$wxPayNo = trim($_GET['wxPayNo']);
//支付金额 单位：元
$money = trim($_GET['money']);
//商户号
$mchId = trim($_GET['mchId']);
//支付成功时间
$time = trim($_GET['time']);
//附加数据
$attach = trim($_GET['attach']);
//用户openId
$openId = trim($_GET['openId']);
//签名（见签名算法文档）
$sign = trim($_GET['sign']);

$paySign = new PaySign();
try {
    //此处不一定需要像异步回调那么严格，可以直接获取outTradeNo 您自己的订单号，查询您系统库内的订单状态即可

    //商户密钥 登录 yungouos.com-》微信支付/支付宝-》商户管理-》独立密钥
    $key = "6BA371F4CFAB4465AA04DAEADBAC4161";
    //验证签名
    $result=$paySign->checkNotifySign($_POST,$key);
    if (!$result) {
        //签名错误
        exit();
    }

    //签名验证成功
    if ($code == 1) {
        //支付成功 处理您自己的业务
    }


} catch (Exception $e) {
    echo('<script type="text/javascript">alert("' . $e->getMessage() . '");window.close();</script>');
}
?>
