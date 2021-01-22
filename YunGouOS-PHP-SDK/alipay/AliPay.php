<?php
/**
 *  YunGouOS支付宝个人支付API
 *  author YunGouOS
 *  site:www.yungouos.com
 * 文档地址：https://open.pay.yungouos.com
 */

require_once dirname(dirname(__FILE__)) . '/util/HttpUtil.php';
require_once dirname(dirname(__FILE__)) . '/util/PaySign.php';

class AliPay
{

    //http请求工具类
    protected $httpUtil;

    //支付签名
    protected $paySign;

    //api接口配置
    protected $apiConfig;

    /**
     * 加载工具类对象
     */
    public function __construct()
    {
        $this->apiConfig = require '../config/YunGouOSPayApiConfig.php';
        $this->httpUtil = new HttpUtil();
        $this->paySign = new PaySign();
    }

    /**
     *  支付宝扫码支付 返回支付二维码链接
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》支付宝-》我的支付 查看商户号
     * @param $body  商品描述
     * @param $type 返回类型（1、返回支付宝的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $key 商户密钥 登录YunGouOS.com-》支付宝-》我的支付-》支付密钥 查看密钥
     */
    public function nativePay($out_trade_no, $total_fee, $mch_id, $body, $type, $attach, $notify_url, $config_no, $auto, $auto_node, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no)) {
                throw new Exception("订单号不能为空！");
            }
            if (empty($total_fee)) {
                throw new Exception("付款金额不能为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($body)) {
                throw new Exception("商品描述不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['total_fee'] = $total_fee;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['body'] = $body;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            if (empty($type)) {
                $type = 2;
            }
            //下面参数不参与签名，但是接口需要这些参数
            $paramsArray['type'] = $type;
            if(!empty($attach)){
                $paramsArray['attach'] = $attach;
            }
            if(!empty($notify_url)){
                $paramsArray['notify_url'] = $notify_url;
            }
            if(!empty($config_no)){
                $paramsArray['config_no'] = $config_no;
            }
            if(!empty($auto)){
                $paramsArray['auto'] = $auto;
            }
            if(!empty($auto_node)){
                $paramsArray['auto_node'] = $auto_node;
            }
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['alipay_native_pay_url'], $paramsArray);
            if (empty($resp)) {
                throw new Exception("API接口返回为空");
            }
            $ret = @json_decode($resp, true);
            if (empty($ret)) {
                throw new Exception("API接口返回为空");
            }
            $code = $ret['code'];
            if ($code != 0) {
                throw new Exception($ret['msg']);
            }
            $result = $ret['data'];
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return $result;
    }

    /**
     *  支付宝WAP支付 返回WAP支付连接，直接重定向到该地址，自动打开支付宝APP付款
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 支付宝商户号 登录YunGouOS.com-》支付宝-》我的支付 查看商户号
     * @param $body  商品描述
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $key 商户密钥 登录YunGouOS.com-》支付宝-》我的支付-》支付密钥 查看密钥
     */
    public function wapPay($out_trade_no, $total_fee, $mch_id, $body,$attach, $notify_url, $config_no, $auto, $auto_node, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no)) {
                throw new Exception("订单号不能为空！");
            }
            if (empty($total_fee)) {
                throw new Exception("付款金额不能为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($body)) {
                throw new Exception("商品描述不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['total_fee'] = $total_fee;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['body'] = $body;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            //下面参数不参与签名，但是接口需要这些参数

            if(!empty($attach)){
                $paramsArray['attach'] = $attach;
            }
            if(!empty($notify_url)){
                $paramsArray['notify_url'] = $notify_url;
            }
            if(!empty($config_no)){
                $paramsArray['config_no'] = $config_no;
            }
            if(!empty($auto)){
                $paramsArray['auto'] = $auto;
            }
            if(!empty($auto_node)){
                $paramsArray['auto_node'] = $auto_node;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['alipay_wap_pay_url'], $paramsArray);
            if (empty($resp)) {
                throw new Exception("API接口返回为空");
            }
            $ret = @json_decode($resp, true);
            if (empty($ret)) {
                throw new Exception("API接口返回为空");
            }
            $code = $ret['code'];
            if ($code != 0) {
                throw new Exception($ret['msg']);
            }
            $result = $ret['data'];
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return $result;
    }


    /**
     *  支付宝JS支付，适用于支付宝网页内打开的H5应用使用支付宝的JSSDK发起支付
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 支付宝商户号 登录YunGouOS.com-》支付宝-》我的支付 查看商户号
     * @param $buyer_id 买家的支付宝唯一用户号（2088开头的16位纯数字）
     * @param $body  商品描述
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $key 商户密钥 登录YunGouOS.com-》支付宝-》我的支付-》支付密钥 查看密钥
     */
    public function jsPay($out_trade_no, $total_fee, $mch_id,$buyer_id,$body,$attach, $notify_url, $config_no, $auto, $auto_node, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no)) {
                throw new Exception("订单号不能为空！");
            }
            if (empty($total_fee)) {
                throw new Exception("付款金额不能为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($buyer_id)) {
                throw new Exception("买家ID不能为空！");
            }
            if (empty($body)) {
                throw new Exception("商品描述不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['total_fee'] = $total_fee;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['buyer_id'] = $buyer_id;
            $paramsArray['body'] = $body;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            //下面参数不参与签名，但是接口需要这些参数

            if(!empty($attach)){
                $paramsArray['attach'] = $attach;
            }
            if(!empty($notify_url)){
                $paramsArray['notify_url'] = $notify_url;
            }
            if(!empty($config_no)){
                $paramsArray['config_no'] = $config_no;
            }
            if(!empty($auto)){
                $paramsArray['auto'] = $auto;
            }
            if(!empty($auto_node)){
                $paramsArray['auto_node'] = $auto_node;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['alipay_js_pay_url'], $paramsArray);
            if (empty($resp)) {
                throw new Exception("API接口返回为空");
            }
            $ret = @json_decode($resp, true);
            if (empty($ret)) {
                throw new Exception("API接口返回为空");
            }
            $code = $ret['code'];
            if ($code != 0) {
                throw new Exception($ret['msg']);
            }
            $result = $ret['data'];
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return $result;
    }


    /**
     *  支付宝H5手机网站接口，可自动打开支付宝APP支付。和WAP接口不同的是，H5可以传递return_url也就是支付后或取消支付可以自动跳回网站
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 支付宝商户号 登录YunGouOS.com-》支付宝-》我的支付 查看商户号
     * @param $body  商品描述
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $return_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $key 商户密钥 登录YunGouOS.com-》支付宝-》我的支付-》支付密钥 查看密钥
     */
    public function h5Pay($out_trade_no, $total_fee, $mch_id, $body,$attach, $notify_url,$return_url, $config_no, $auto, $auto_node,$key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no)) {
                throw new Exception("订单号不能为空！");
            }
            if (empty($total_fee)) {
                throw new Exception("付款金额不能为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($body)) {
                throw new Exception("商品描述不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['total_fee'] = $total_fee;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['body'] = $body;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            //下面参数不参与签名，但是接口需要这些参数

            if(!empty($attach)){
                $paramsArray['attach'] = $attach;
            }
            if(!empty($notify_url)){
                $paramsArray['notify_url'] = $notify_url;
            }
            if(!empty($return_url)){
                $paramsArray['return_url'] = $return_url;
            }
            if(!empty($config_no)){
                $paramsArray['config_no'] = $config_no;
            }
            if(!empty($auto)){
                $paramsArray['auto'] = $auto;
            }
            if(!empty($auto_node)){
                $paramsArray['auto_node'] = $auto_node;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['alipay_mobile_pay_url'], $paramsArray);
            if (empty($resp)) {
                throw new Exception("API接口返回为空");
            }
            $ret = @json_decode($resp, true);
            if (empty($ret)) {
                throw new Exception("API接口返回为空");
            }
            $code = $ret['code'];
            if ($code != 0) {
                throw new Exception($ret['msg']);
            }
            $result = $ret['data'];
            if(empty($result)){
                throw new Exception('支付宝H5下单失败');
            }
            $result=$result['form'];
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return $result;
    }


    /**
     *  支付宝原生APP支付，返回APP端拉起支付宝所需的参数。
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 支付宝商户号 登录YunGouOS.com-》支付宝-》我的支付 查看商户号
     * @param $body  商品描述
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $key 商户密钥 登录YunGouOS.com-》支付宝-》我的支付-》支付密钥 查看密钥
     */
    public function appPay($out_trade_no, $total_fee, $mch_id, $body,$attach, $notify_url, $config_no, $auto, $auto_node, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no)) {
                throw new Exception("订单号不能为空！");
            }
            if (empty($total_fee)) {
                throw new Exception("付款金额不能为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($body)) {
                throw new Exception("商品描述不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['total_fee'] = $total_fee;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['body'] = $body;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            //下面参数不参与签名，但是接口需要这些参数

            if(!empty($attach)){
                $paramsArray['attach'] = $attach;
            }
            if(!empty($notify_url)){
                $paramsArray['notify_url'] = $notify_url;
            }
            if(!empty($config_no)){
                $paramsArray['config_no'] = $config_no;
            }
            if(!empty($auto)){
                $paramsArray['auto'] = $auto;
            }
            if(!empty($auto_node)){
                $paramsArray['auto_node'] = $auto_node;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['alipay_app_pay_url'], $paramsArray);
            if (empty($resp)) {
                throw new Exception("API接口返回为空");
            }
            $ret = @json_decode($resp, true);
            if (empty($ret)) {
                throw new Exception("API接口返回为空");
            }
            $code = $ret['code'];
            if ($code != 0) {
                throw new Exception($ret['msg']);
            }
            $result = $ret['data'];
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return $result;
    }

    /**
     * 发起退款
     * @param $out_trade_no 商户订单号
     * @param $mch_id 支付宝商户号 登录YunGouOS.com-》支付宝-》我的支付 查看商户号
     * @param $money 退款金额
     * @param $refund_desc 退款描述
     * @param $key 商户密钥 登录YunGouOS.com-》支付宝-》我的支付 支付密钥 查看密钥
     * @return 退款信息 详情 https://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder
     * @throws Exception
     */
    public function orderRefund($out_trade_no, $mch_id, $money, $refund_desc, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no)) {
                throw new Exception("订单号不能为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($money)) {
                throw new Exception("退款金额不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['money'] = $money;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['refund_desc'] = $refund_desc;
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['alipay_refund_order_url'], $paramsArray);
            if (empty($resp)) {
                throw new Exception("API接口返回为空");
            }
            $ret = @json_decode($resp, true);
            if (empty($ret)) {
                throw new Exception("API接口返回为空");
            }
            $code = $ret['code'];
            if ($code != 0) {
                throw new Exception($ret['msg']);
            }
            $result = $ret['data'];
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return $result;
    }

    /**
     * 查询退款结果
     * @param $refund_no 退款单号，调用发起退款结果返回
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》支付宝-》我的支付 查看商户号
     * @param $key 商户密钥 登录YunGouOS.com-》支付宝-》我的支付 支付密钥 查看密钥
     * @return 退款对象 详情参考https://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult
     * @throws Exception
     */
    public function getRefundResult($refund_no, $mch_id, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($refund_no)) {
                throw new Exception("退款单号不能为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['refund_no'] = $refund_no;
            $paramsArray['mch_id'] = $mch_id;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpGet($this->apiConfig['alipay_refund_result_url'] . "?" . http_build_query($paramsArray));
            if (empty($resp)) {
                throw new Exception("API接口返回为空");
            }
            $ret = @json_decode($resp, true);
            if (empty($ret)) {
                throw new Exception("API接口返回为空");
            }
            $code = $ret['code'];
            if ($code != 0) {
                throw new Exception($ret['msg']);
            }
            $result = $ret['data'];
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return $result;
    }
}

