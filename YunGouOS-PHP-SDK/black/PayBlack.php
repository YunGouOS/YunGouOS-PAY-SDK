<?php
/**
 *  YunGouOS支付盾产品相关接口
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
     *  添加黑名单
     *  将指定微信账户/支付宝账户添加为黑名单，黑名单用户将无法发起支付
     * @param $mch_id 微信支付商户号/支付宝商户号
     * @param $account 用户的openid或支付宝唯一身份id（2088开头）
     * @param $reason 原因
     * @param $end_time  黑名单有效期截至时间，不传则永久。示例值：2021-06-24 23:59:59
     * @param $key 支付密钥 登录YunGouOS.com-》聚合支付-》商户管理-》 支付密钥 查看密钥
     */
    public function create($mch_id,$account,$reason,$end_time,$key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("订单号不能为空！");
            }
            if (empty($account)) {
                throw new Exception("付款金额不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['account'] = $account;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            //下面参数不参与签名，但是接口需要这些参数
            if(!empty($reason)){
                $paramsArray['reason'] = $reason;
            }
            if(!empty($end_time)){
                $paramsArray['end_time'] = $end_time;
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['pay_black_create_url'], $paramsArray);
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
     * 验证黑名单
     * @param $mch_id 支付商户号 取决于订单所属类型。【微信支付：登录YunGouOS.com-》微信支付-》商户管理-》查看商户号】 【支付宝：登录YunGouOS.com-》支付宝-》商户管理-》查看商户号】
     * @param $account 用户的openid或支付宝唯一身份id（2088开头）
     * @param $key 商户密钥 取决于所属类型。【微信支付：登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥】 【支付宝：登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥】
     * @throws Exception
     */
    public function check($mch_id,$account, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($account)) {
                throw new Exception("用户账户不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['account'] = $account;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpGet($this->apiConfig['pay_black_check_url'] . "?" . http_build_query($paramsArray));
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

