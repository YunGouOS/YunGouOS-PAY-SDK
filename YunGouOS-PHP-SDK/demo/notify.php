<?php
/**
 * YunGouOS微信支付回调
 * 文档地址：http://open.pay.yungouos.com/#/callback/pay
 */

//引入签名工具
require_once dirname(dirname(__FILE__)) . '/util/WxPaySign.php';

//支付结果（1、支付成功）
$code = trim($_POST['code']);
//系统订单号（YunGouOS系统内单号）
$orderNo = trim($_POST['orderNo']);
//商户订单号
$outTradeNo = trim($_POST['outTradeNo']);
//微信支付单号（微信支付单号）
$wxPayNo = trim($_POST['wxPayNo']);
//支付金额 单位：元
$money = trim($_POST['money']);
//商户号
$mchId = trim($_POST['mchId']);
//支付成功时间
$time = trim($_POST['time']);
//附加数据
$attach = trim($_POST['attach']);
//用户openId
$openId = trim($_POST['openId']);
//签名（见签名算法文档）
$sign = trim($_POST['sign']);

$wxPaySign = new WxPaySign();
try {
    $signParam = array(
        "code" => $code,
        "orderNo" => $orderNo,
        "outTradeNo" => $outTradeNo,
        "wxPayNo" => $wxPayNo,
        "money" => $money,
        "mchId" => $mchId
    );
    //商户密钥 登录YunGouOS.com-》我的账户-》账户中心 查看密钥
    $key = "6BA371F4CFAB4465AA04DAEADBAC4161";
    //验证签名
    $result = $wxPaySign->checkSing($signParam, $key);
    if (!$result) {
        //签名错误
        echo "FIALD";
        exit();
    }

    //签名验证成功
    if ($code == 1) {
        //支付成功 处理您自己的业务



        //最后输出 SUCCESS 告诉YunGouOS不用再通知
        echo "SUCCESS";
        exit();
    }

} catch (Exception $e) {
    echo('<script type="text/javascript">alert("' . $e->getMessage() . '");window.close();</script>');
}
?>
