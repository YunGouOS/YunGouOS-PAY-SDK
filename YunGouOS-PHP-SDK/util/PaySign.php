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
    public function checkSign($arr, $key)
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
    public function checkNotifySign($post, $key)
    {
        try {
            if (empty($post)) {
                throw new Exception("POST对象不能为空");
            }
            $sign = $post['sign'];
            if (empty($sign)) {
                throw new Exception("POST中未获取到sign");
            }
            $code = $post["code"];
            $orderNo = $post["orderNo"];
            $outTradeNo = $post["outTradeNo"];
            $payNo = $post["payNo"];
            $money = $post["money"];
            $mchId = $post["mchId"];
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


    /**
     * 验证退款回调签名是否正确
     * @param $_POST 回调的post对象
     * @param $key 支付密钥
     * @return 签名是否正确
     */
    public function checkRefundNotifySign($post, $key)
    {
        try {
            if (empty($post)) {
                throw new Exception("POST对象不能为空");
            }
            $sign = $post['sign'];
            if (empty($sign)) {
                throw new Exception("POST中未获取到sign");
            }
            $code = $post["code"];
            $refundNo = $post["refundNo"];
            $orderNo = $post["orderNo"];
            $outTradeNo = $post["outTradeNo"];
            $payNo = $post["payNo"];
            $mchId = $post["mchId"];
            $payName = $post["payName"];
            $refundMoney = $post["refundMoney"];
            $channel = $post["channel"];
            $refundTime = $post["refundTime"];
            $payRefundNo = $post["payRefundNo"];
            $applyTime = $post["applyTime"];

            $paramsArray["code"] = $code;
            $paramsArray["refundNo"] = $refundNo;
            $paramsArray["orderNo"] = $orderNo;
            $paramsArray["outTradeNo"] = $outTradeNo;
            $paramsArray["payNo"] = $payNo;
            $paramsArray["mchId"] = $mchId;
            $paramsArray["payName"] = $payName;
            $paramsArray["refundMoney"] = $refundMoney;
            $paramsArray["channel"] = $channel;
            $paramsArray["refundTime"] = $refundTime;
            $paramsArray["payRefundNo"] = $payRefundNo;
            $paramsArray["applyTime"] = $applyTime;

            $reSign = $this->getSign($paramsArray, $key);
            if ($sign == $reSign) {
                return true;
            }
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return false;
    }


    /**
     * 验证转账代付回调签名是否正确
     *
     * @param $_POST 回调的post对象
     * @param $key 支付密钥
     *
     * @return 签名是否正确
     */
    public function checkRePayNotifySign($post, $key)
    {
        try {
            if (empty($post)) {
                throw new Exception("POST对象不能为空");
            }
            $sign = $post['sign'];
            if (empty($sign)) {
                throw new Exception("POST中未获取到sign");
            }
            $code = $post["code"];
            $order_no = $post["order_no"];
            $out_trade_no = $post["out_trade_no"];
            $merchant_id = $post["merchant_id"];
            $money = $post["money"];
            $channel = $post["channel"];
            $account = $post["account"];
            $desc = $post["desc"];

            $paramsArray["code"] = $code;
            $paramsArray["order_no"] = $order_no;
            $paramsArray["out_trade_no"] = $out_trade_no;
            $paramsArray["merchant_id"] = $merchant_id;
            $paramsArray["money"] = $money;
            $paramsArray["channel"] = $channel;
            $paramsArray["account"] = $account;
            $paramsArray["desc"] = $desc;

            $reSign = $this->getSign($paramsArray, $key);
            if ($sign == $reSign) {
                return true;
            }
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return false;
    }



    /**
     * 验证分账回调签名是否正确
     *
     * @param $_POST 回调的post对象
     * @param $key 支付密钥
     *
     * @return 签名是否正确
     */
    public function checkShareMoneyNotifySign($post, $key)
    {
        try {
            if (empty($post)) {
                throw new Exception("POST对象不能为空");
            }
            $sign = $post['sign'];
            if (empty($sign)) {
                throw new Exception("POST中未获取到sign");
            }
            $code = $post["code"];
            $ps_no = $post["ps_no"];
            $order_no = $post["order_no"];
            $out_trade_no = $post["out_trade_no"];
            $pay_no = $post["pay_no"];
            $mch_id = $post["mch_id"];
            $order_money = $post["order_money"];
            $money = $post["money"];
            $channel = $post["channel"];
            $account = $post["account"];
            $desc = $post["desc"];

            $paramsArray["code"] = $code;
            $paramsArray["ps_no"] = $ps_no;
            $paramsArray["order_no"] = $order_no;
            $paramsArray["out_trade_no"] = $out_trade_no;
            $paramsArray["pay_no"] = $pay_no;
            $paramsArray["mch_id"] = $mch_id;
            $paramsArray["order_money"] = $order_money;
            $paramsArray["money"] = $money;
            $paramsArray["channel"] = $channel;
            $paramsArray["account"] = $account;
            $paramsArray["desc"] = $desc;

            $reSign = $this->getSign($paramsArray, $key);
            if ($sign == $reSign) {
                return true;
            }
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return false;
    }


    /**
     * 验证批量转账回调签名是否正确
     *
     * @param $_POST 回调的post对象
     * @param $key 支付密钥
     *
     * @return 签名是否正确
     */
    public function checkBatchPayNotifySign($post, $key)
    {
        try {
            if (empty($post)) {
                throw new Exception("POST对象不能为空");
            }
            $sign = $post['sign'];
            if (empty($sign)) {
                throw new Exception("POST中未获取到sign");
            }
            $code = $post["code"];
            $batch_no = $post["batch_no"];
            $out_trade_no = $post["out_trade_no"];
            $mch_id = $post["mch_id"];
            $money = $post["money"];
            $rate = $post["rate"];
            $count = $post["count"];
            $pay_type = $post["pay_type"];
            $channel = $post["channel"];
            $success_count = $post["success_count"];
            $success_money = $post["success_money"];
            $fail_count = $post["fail_count"];
            $fail_money = $post["fail_money"];
            $add_time = $post["add_time"];
            $success_list = $post["success_list"];
            $fail_list = $post["fail_list"];

            $paramsArray["code"] = $code;
            $paramsArray["batch_no"] = $batch_no;
            $paramsArray["out_trade_no"] = $out_trade_no;
            $paramsArray["mch_id"] = $mch_id;
            $paramsArray["money"] = $money;
            $paramsArray["rate"] = $rate;
            $paramsArray["count"] = $count;
            $paramsArray["pay_type"] = $pay_type;
            $paramsArray["channel"] = $channel;
            $paramsArray["success_count"] = $success_count;
            $paramsArray["success_money"] = $success_money;
            $paramsArray["fail_count"] = $fail_count;
            $paramsArray["fail_money"] = $fail_money;
            $paramsArray["add_time"] = $add_time;
            if(!empty($success_list)){
                $paramsArray["success_list"] = $success_list;
            }
            if(!empty($fail_list)){
                $paramsArray["fail_list"] = $fail_list;
            }
            $reSign = $this->getSign($paramsArray, $key);
            if ($sign == $reSign) {
                return true;
            }
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return false;
    }


    /**
     * 验证分账回退回调签名是否正确
     *
     * @param $_POST 回调的post对象
     * @param $key 支付密钥
     *
     * @return 签名是否正确
     */
    public function checkShareReturnNotifySign($post, $key)
    {
        try {
            if (empty($post)) {
                throw new Exception("POST对象不能为空");
            }
            $sign = $post['sign'];
            if (empty($sign)) {
                throw new Exception("POST中未获取到sign");
            }
            $code = $post["code"];
            $return_no = $post["return_no"];
            $out_return_no = $post["out_return_no"];
            $order_no = $post["order_no"];
            $out_trade_no = $post["out_trade_no"];
            $pay_no = $post["pay_no"];
            $ps_no = $post["ps_no"];
            $mch_id = $post["mch_id"];
            $money = $post["money"];
            $channel = $post["channel"];
            $desc = $post["desc"];

            $paramsArray["code"] = $code;
            $paramsArray["return_no"] = $return_no;
            $paramsArray["out_return_no"] = $out_return_no;
            $paramsArray["order_no"] = $order_no;
            $paramsArray["out_trade_no"] = $out_trade_no;
            $paramsArray["pay_no"] = $pay_no;
            $paramsArray["ps_no"] = $ps_no;
            $paramsArray["mch_id"] = $mch_id;
            $paramsArray["money"] = $money;
            $paramsArray["channel"] = $channel;
            $paramsArray["desc"] = $desc;
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