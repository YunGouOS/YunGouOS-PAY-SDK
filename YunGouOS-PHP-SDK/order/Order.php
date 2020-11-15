<?php
/**
 *  YunGouOS订单相关接口
 *  author YunGouOS
 *  site:www.yungouos.com
 */

require_once dirname(dirname(__FILE__)) . '/util/HttpUtil.php';
require_once dirname(dirname(__FILE__)) . '/util/PaySign.php';

class Order
{

    //http请求工具类
    protected $httpUtil;

    //微信支付签名
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
     * 查询订单
     * @param $out_trade_no 商户订单号
     * @param $mch_id 支付商户号 取决于订单所属类型。【微信支付：登录YunGouOS.com-》微信支付-》商户管理-》查看商户号】 【支付宝：登录YunGouOS.com-》支付宝-》商户管理-》查看商户号】
     * @param $key 商户密钥 取决于订单所属类型。【微信支付：登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥】 【支付宝：登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥】
     * @return 订单对象信息 详情参考https://open.pay.yungouos.com/#/api/api/system/order/getPayOrderInfo
     * @throws Exception
     */
    public function getOrderInfoByOutTradeNo($out_trade_no, $mch_id, $key)
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
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['mch_id'] = $mch_id;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpGet($this->apiConfig['serarch_order_url'] . "?" . http_build_query($paramsArray));
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

