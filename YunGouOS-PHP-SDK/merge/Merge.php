<?php
/**
 *  YunGouOS聚合支付相关接口
 *  author YunGouOS
 *  site:www.yungouos.com
 */

require_once dirname(dirname(__FILE__)) . '/util/HttpUtil.php';
require_once dirname(dirname(__FILE__)) . '/util/PaySign.php';

class Order
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
        $this->apiConfig = require_once '../config/YunGouOSPayApiConfig.php';
        $this->httpUtil = new HttpUtil();
        $this->paySign = new PaySign();
    }

    /**
     *  聚合支付一码付
     * 生成一个二维码支持微信、支付宝共同扫，将根据用户扫码情况自动调用相关支付接口。需要同时签约微信和支付宝接口才可以使用
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 一码付商户号 登录YunGouOS.com-》聚合支付-》商户管理  查看商户号
     * @param $body  商品描述
     * @param $type 返回类型（1、返回支付宝的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $return_url 同步地址，支付完毕后用户浏览器返回到该地址，如果不传递，页面支付完成后页面自动关闭，强烈建议传递。url不可包含？号、不可携带参数
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $key 支付密钥 登录YunGouOS.com-》聚合支付-》商户管理-》 支付密钥 查看密钥
     */
    public function nativePay($out_trade_no, $total_fee, $mch_id, $body, $type, $attach, $notify_url,$return_url,$config_no, $auto, $auto_node, $key)
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

            $resp = $this->httpUtil->httpsPost($this->apiConfig['merge_native_pay_url'], $paramsArray);
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

