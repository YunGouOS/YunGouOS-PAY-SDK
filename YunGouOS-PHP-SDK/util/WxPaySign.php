<?php
header("Content-type: text/html; charset=utf-8");

/**
 *  微信支付签名
 *  author YunGouOS
 *  site:www.yungouos.com
 */
class WxPaySign
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
    public function checkSing($arr,$key)
    {
        //获取签名
        $sing = $this->getSign($arr,$key);
        if ($sing == $arr['sign']) {
            return true;
        } else {
            return false;
        }
    }
}