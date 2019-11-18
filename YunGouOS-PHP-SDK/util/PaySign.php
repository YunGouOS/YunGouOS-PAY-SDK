<?php
header("Content-type: text/html; charset=utf-8");

/**
 *  支付签名
 *  author YunGouOS
 *  site:www.yungouos.com
 */
class PaySign
{
    /**
     * @param $arr 需要签名的参数数组
     * @param $key 商户密钥 商户密钥 登录YunGouOS.com-》我的账户-》账户中心 查看密钥
     * @return string
     */
    public function getSign($arr, $key)
    {
        //去除数组中的空值
        $arr = array_filter($arr);
        //如果数组中有签名删除签名
        if (isset($arr['sign'])) {
            unset($arr['sign']);
        }
        //按照键名字典排序
        ksort($arr);
        $str = http_build_query($arr) . "&key=" . $key;
        $str = $this->arrToUrl($str);
        return strtoupper(md5($str));
    }

    //URL解码为中文
    public function arrToUrl($str)
    {
        return urldecode($str);
    }

    //验证签名
    public function checkSing($arr, $key)
    {
        //获取签名
        $sing = $this->getSign($arr, $key);
        if ($sing == $arr['sign']) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 验证回调签名
     * @param $_POST 回调的post对象
     * @param $key 支付密钥
     * @return 签名是否正确
     */
    public function checkNotifySign($_POST, $key)
    {
        try {
            if (empty($_POST)) {
                throw new Exception("POST对象不能为空");
            }
            $sign = $_POST['sign'];
            if (empty($sign)) {
                throw new Exception("POST中未获取到sign");
            }
            $code = $_POST["code"];
            $orderNo = $_POST["orderNo"];
            $outTradeNo = $_POST["outTradeNo"];
            $payNo = $_POST["payNo"];
            $money = $_POST["money"];
            $mchId = $_POST["mchId"];
            $paramsArray['code'] = $code;
            $paramsArray["orderNo"] = $orderNo;
            $paramsArray["outTradeNo"] = $outTradeNo;
            $paramsArray["payNo"] = $payNo;
            $paramsArray["money"] = $money;
            $paramsArray["mchId"] = $mchId;
            $reSign = $this->getSign($paramsArray, $key);
            if ($sign == $reSign) {
                return true;
            }
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return false;
    }
}