<?php
/**
 *  YunGouOS微信个人支付API
 *  author YunGouOS
 *  site:www.yungouos.com
 * 文档地址：https://open.pay.yungouos.com
 */

require_once dirname(dirname(__FILE__)) . '/util/HttpUtil.php';
require_once dirname(dirname(__FILE__)) . '/util/PaySign.php';

class Finance
{

    //http请求工具类
    protected $httpUtil;

    //签名工具
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
     * 微信支付配置分账，添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
     * @param $mch_id 分账方支付商户号
     * @param $appId 自定义appId，如果传递了该参数则openId必须是通过该appId获取
     * @param $reason 分账原因
     * @param $openId 分账收款方的openId，通过授权接口获得。 优先级：高
     * @param $receiver_mch_id 分账收款方的商户号。 优先级：低
     * @param $name 分账收款方姓名
     * @param $rate 分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
     * @param $money 固定分账金额。每笔订单固定分账金额，优先级次于rate参数
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return $配置单号
     */
    public function wxPayConfig($mch_id, $appId, $reason, $openId, $receiver_mch_id, $name, $rate, $money, $key)
    {
        $result = null;
        $paramsArray = array();
        $channel = "wxpay";
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($reason)) {
                throw new Exception("分账原因不能为空！");
            }
            // 收款方账户信息验证
            if (empty($openId) && empty($receiver_mch_id)) {
                throw new Exception("分账收款方openId、收款商户号不能同时为空！");
            }
            // 设置了比例 验证比例
            if (!empty($rate)) {
                if (!is_numeric($rate)) {
                    throw new Exception("分账比例不是合法的数字类型！");
                }
            }
            // 设置了金额 验证金额
            if (!empty($money)) {
                if (!is_numeric($money)) {
                    throw new Exception("固定分账金额不是合法的数字类型！");
                }
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray["mch_id"] = $mch_id;
            $paramsArray["reason"] = $reason;
            $paramsArray["channel"] = $channel;
            if (!empty($openId)) {
                // 设置了openId参数，参与签名
                $paramsArray["openId"] = $openId;
            }
            if (!empty($receiver_mch_id)) {
                // 设置了receiver_mch_id参数，参与签名
                $paramsArray["receiver_mch_id"] = $receiver_mch_id;
            }
            if (!empty($name)) {
                // 设置了name参数，参与签名
                $paramsArray["name"] = $name;
            }
            if (!empty($rate)) {
                // 设置了rate参数，参与签名
                $paramsArray["rate"] = $rate;
            }
            if (!empty($money)) {
                // 设置了money参数，参与签名
                $paramsArray["money"] = $money;
            }
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray["sign"] = $sign;
            if (!empty($appId)) {
                $paramsArray["appId"] = $appId;
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['finance_config_url'], $paramsArray);
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
     * 支付宝配置分账，添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
     * @param $mch_id 分账方支付商户号
     * @param $reason 分账原因
     * @param $channel 分账渠道
     * @param $account 分账接收方支付宝账户
     * @param $name 分账收款方姓名。当传递了account参数时，该参数必填，且需要与account对应的微信实名信息一致
     * @param $rate 分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
     * @param $money 固定分账金额。每笔订单固定分账金额，优先级次于rate参数
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return $配置单号
     */
    public function aliPayConfig($mch_id, $reason, $account, $name, $rate, $money, $key)
    {
        $result = null;
        $paramsArray = array();
        $channel = "alipay";
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($reason)) {
                throw new Exception("分账原因不能为空！");
            }
            // 收款方账户信息验证
            if (empty($account)) {
                throw new Exception("分账接收方支付宝账户不能为空！");
            }
            if (empty($name)) {
                throw new Exception("分账接收方支付宝姓名不能为空！");
            }
            // 设置了比例 验证比例
            if (!empty($rate)) {
                if (!is_numeric($rate)) {
                    throw new Exception("分账比例不是合法的数字类型！");
                }
            }
            // 设置了金额 验证金额
            if (!empty($money)) {
                if (!is_numeric($money)) {
                    throw new Exception("固定分账金额不是合法的数字类型！");
                }
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray["mch_id"] = $mch_id;
            $paramsArray["reason"] = $reason;
            $paramsArray["channel"] = $channel;
            $paramsArray["account"] = $account;
            $paramsArray["name"] = $name;
            if (!empty($rate)) {
                // 设置了rate参数，参与签名
                $paramsArray["rate"] = $rate;
            }
            if (!empty($money)) {
                // 设置了money参数，参与签名
                $paramsArray["money"] = $money;
            }
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray["sign"] = $sign;
            $resp = $this->httpUtil->httpsPost($this->apiConfig['finance_config_url'], $paramsArray);
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
     * （接口升级，建议使用wxPayConfig或aliPayConfig方法）
     * 配置分账，添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
     * @param $mch_id 分账方支付商户号
     * @param $appId 自定义appId，如果传递了该参数则openId必须是通过该appId获取
     * @param $reason 分账原因
     * @param $channel 分账渠道
     * @param $openId 分账收款方的openId，通过授权接口获得。 优先级：高
     * @param $receiver_mch_id 分账收款方的商户号。 优先级：低
     * @param $name 分账收款方姓名。当传递了account参数时，该参数必填，且需要与account对应的微信实名信息一致
     * @param $rate 分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
     * @param $money 固定分账金额。每笔订单固定分账金额，优先级次于rate参数
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return $配置单号
     */
    public function configV2($mch_id, $appId, $reason, $channel, $openId, $receiver_mch_id, $name, $rate, $money, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($reason)) {
                throw new Exception("分账原因不能为空！");
            }
            if (empty($channel)) {
                throw new Exception("分账渠道不能为空！");
            }
            // 验证渠道
            $channelList = array('wxpay', 'alipay');
            if (in_array($channel, $channelList)) {
                throw new Exception("分账渠道参数不合法！参考值：" . implode(" ", $channelList));
            }
            // 收款方账户信息验证
            if (empty($openId) && empty($receiver_mch_id)) {
                throw new Exception("分账收款方openId、收款商户号不能同时为空！");
            }
            // 设置了比例 验证比例
            if (!empty($rate)) {
                if (!is_numeric($rate)) {
                    throw new Exception("分账比例不是合法的数字类型！");
                }
            }
            // 设置了金额 验证金额
            if (!empty($money)) {
                if (!is_numeric($money)) {
                    throw new Exception("固定分账金额不是合法的数字类型！");
                }
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray["mch_id"] = $mch_id;
            $paramsArray["reason"] = $reason;
            $paramsArray["channel"] = $channel;
            if (!empty($openId)) {
                // 设置了openId参数，参与签名
                $paramsArray["openId"] = $openId;
            }
            if (!empty($receiver_mch_id)) {
                // 设置了receiver_mch_id参数，参与签名
                $paramsArray["receiver_mch_id"] = $receiver_mch_id;
            }
            if (!empty($name)) {
                // 设置了name参数，参与签名
                $paramsArray["name"] = $name;
            }
            if (!empty($rate)) {
                // 设置了rate参数，参与签名
                $paramsArray["rate"] = $rate;
            }
            if (!empty($money)) {
                // 设置了money参数，参与签名
                $paramsArray["money"] = $money;
            }
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray["sign"] = $sign;
            if (!empty($appId)) {
                $paramsArray["appId"] = $appId;
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['finance_config_url'], $paramsArray);
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
     *
     * （接口升级，建议使用wxPayConfig或aliPayConfig方法）
     *
     * 配置分账，添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
     * @param $mch_id 分账方支付商户号
     * @param $reason 分账原因
     * @param $channel 分账渠道
     * @param $openId 分账收款方的openId，通过授权接口获得。 优先级：高
     * @param $account 分账收款方的微信账户或支付宝账户，打开微信-》我 查看微信号。 优先级：中
     * @param $receiver_mch_id 分账收款方的商户号。 优先级：低
     * @param $name 分账收款方姓名。当传递了account参数时，该参数必填，且需要与account对应的微信实名信息一致
     * @param $rate 分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
     * @param $money 固定分账金额。每笔订单固定分账金额，优先级次于rate参数
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return $配置单号
     */
    public function config($mch_id, $reason, $channel, $openId, $account, $receiver_mch_id, $name, $rate, $money, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($reason)) {
                throw new Exception("分账原因不能为空！");
            }
            if (empty($channel)) {
                throw new Exception("分账渠道不能为空！");
            }
            // 验证渠道
            $channelList = array('wxpay', 'alipay');
            if (in_array($channel, $channelList)) {
                throw new Exception("分账渠道参数不合法！参考值：" . implode(" ", $channelList));
            }
            // 收款方账户信息验证
            if (empty($openId) && empty($account) && empty($receiver_mch_id)) {
                throw new Exception("分账收款方openId、收款帐号、收款商户号不能同时为空！");
            }
            // 收款方姓名验证
            if (!empty($account) && empty($name)) {
                throw new Exception("分账收款方为帐号类型，分账收款方姓名不能为空！");
            }
            // 分账比例验证
            if (empty($rate) && empty($money)) {
                throw new Exception("分账比例、固定分账金额不能同时为空！");
            }
            // 设置了比例 验证比例
            if (!empty($rate)) {
                if (!is_numeric($rate)) {
                    throw new Exception("分账比例不是合法的数字类型！");
                }
            }
            // 设置了金额 验证金额
            if (!empty($money)) {
                if (!is_numeric($money)) {
                    throw new Exception("固定分账金额不是合法的数字类型！");
                }
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray["mch_id"] = $mch_id;
            $paramsArray["reason"] = $reason;
            $paramsArray["channel"] = $channel;
            if (!empty($openId)) {
                // 设置了openId参数，参与签名
                $paramsArray["openId"] = $openId;
            }
            if (!empty($account)) {
                // 设置了account参数，参与签名
                $paramsArray["account"] = $account;
            }
            if (!empty($receiver_mch_id)) {
                // 设置了receiver_mch_id参数，参与签名
                $paramsArray["receiver_mch_id"] = $receiver_mch_id;
            }
            if (!empty($name)) {
                // 设置了name参数，参与签名
                $paramsArray["name"] = $name;
            }
            if (!empty($rate)) {
                // 设置了rate参数，参与签名
                $paramsArray["rate"] = $rate;
            }
            if (!empty($money)) {
                // 设置了money参数，参与签名
                $paramsArray["money"] = $money;
            }
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray["sign"] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['finance_config_url'], $paramsArray);
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
     * 生成分账账单。对已支付的订单，生成分账账单，后续通过发起分账接口进行分账操作。文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/createBill
     * @param $mch_id 分账方支付商户号
     * @param $out_trade_no 商户单号 （需要分账的订单号）
     * @param $config_no 配置单号（分账收款人配置单号，支持多个 使用,号分割）
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return $配置单号
     */
    public function createBillV2($mch_id, $out_trade_no, $config_no, $rate, $money, $notify_url, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($out_trade_no)) {
                throw new Exception("商户单号不能为空！");
            }
            $paramsArray["mch_id"] = $mch_id;
            $paramsArray["out_trade_no"] = $out_trade_no;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray["config_no"] = $config_no;
            $paramsArray["sign"] = $sign;

            if (!empty($rate)) {
                $paramsArray["rate"] = $rate;
            }
            if (!empty($money)) {
                $paramsArray["money"] = $money;
            }
            if (!empty($notify_url)) {
                $paramsArray["notify_url"] = $notify_url;
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['finance_create_bill_url'], $paramsArray);
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
     * 接口升级，建议使用createBillV2方法
     * 生成分账账单。对已支付的订单，生成分账账单，后续通过发起分账接口进行分账操作。文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/createBill
     * @param $mch_id 分账方支付商户号
     * @param $out_trade_no 商户单号 （需要分账的订单号）
     * @param $config_no 配置单号（分账收款人配置单号，支持多个 使用,号分割）
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return $配置单号
     */
    public function createBill($mch_id, $out_trade_no, $config_no, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($out_trade_no)) {
                throw new Exception("商户单号不能为空！");
            }
            $paramsArray["mch_id"] = $mch_id;
            $paramsArray["out_trade_no"] = $out_trade_no;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray["config_no"] = $config_no;
            $paramsArray["sign"] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['finance_create_bill_url'], $paramsArray);
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
     * 分账支付。对已支付的订单，生成分账账单，后续通过发起分账接口进行分账操作。文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/sendPay
     * @param $mch_id 分账方支付商户号
     * @param $ps_no 分账单号
     * @param $description 分账描述
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return $配置单号
     */
    public function sendPay($mch_id, $ps_no, $description, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($ps_no)) {
                throw new Exception("分账单号不能为空！");
            }
            if (empty($description)) {
                throw new Exception("分账描述不能为空！");
            }
            $paramsArray["mch_id"] = $mch_id;
            $paramsArray["ps_no"] = $ps_no;
            $paramsArray["description"] = $description;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray["sign"] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['finance_send_pay_url'], $paramsArray);
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
     *
     *  接口升级，该方法已作废，请使用替代方法getInfo
     *
     * 查询分账支付结果。文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/getPayResult
     * @param $mch_id 分账方支付商户号
     * @param $ps_no 分账单号
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return $配置单号
     */
    public function getPayResult($mch_id, $ps_no, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($ps_no)) {
                throw new Exception("分账单号不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['ps_no'] = $ps_no;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpGet($this->apiConfig['finance_get_pay_result_url'] . "?" . http_build_query($paramsArray));
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
     * 查询分账。文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/getInfo
     * @param $mch_id 分账方支付商户号
     * @param $ps_no 分账单号
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return $配置单号
     */
    public function getInfo($mch_id, $ps_no, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($ps_no)) {
                throw new Exception("分账单号不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['ps_no'] = $ps_no;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpGet($this->apiConfig['finance_get_pay_result_url'] . "?" . http_build_query($paramsArray));
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
     * 完结分账。由于分账属性的订单，微信进行了冻结资金不结算的操作，故在分账完成或需解冻该订单款项需调用该接口。成功后金额解冻可正常结算。
     *
     * 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/finish
     *
     * @param $mch_id 分账方支付商户号
     * @param $out_trade_no 商户单号
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return $配置单号
     */
    public function finish($mch_id, $out_trade_no, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($out_trade_no)) {
                throw new Exception("商户单号不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['out_trade_no'] = $out_trade_no;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            $resp = $this->httpUtil->httpsPost($this->apiConfig['finance_finish_url'], $paramsArray);
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
     * 转账到微信零钱
     *
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/wxpay
     *
     * @param $merchant_id YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
     * @param $out_trade_no 商户单号
     * @param $account 收款账户openid
     * @param $account_name  收款方真实姓名
     * @param $money 付款金额。单位：元（范围：1~5000）
     * @param $desc 付款描述
     * @param $mch_id 付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传
     * @param $key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
     */
    public function rePayWxPay($merchant_id, $out_trade_no, $account, $account_name, $money, $desc, $mch_id, $notify_url, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($merchant_id)) {
                throw new Exception("YunGouOS商户ID不能为空！");
            }
            if (empty($out_trade_no)) {
                throw new Exception("商户单号不能为空！");
            }
            if (empty($account)) {
                throw new Exception("收款账户openid不能为空！");
            }
            if (empty($money)) {
                throw new Exception("付款金额不能为空！");
            }
            if (empty($desc)) {
                throw new Exception("付款描述不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['merchant_id'] = $merchant_id;
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['account'] = $account;
            $paramsArray['money'] = $money;
            $paramsArray['desc'] = $desc;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            if (!empty($account_name)) {
                $paramsArray['account_name'] = $account_name;
            }
            if (!empty($mch_id)) {
                $paramsArray['mch_id'] = $mch_id;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['repay_wxpay_url'], $paramsArray);
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
     * 转账到支付宝
     *
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/alipay
     *
     * @param $merchant_id YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
     * @param $out_trade_no 商户单号
     * @param $account 收款支付宝账户
     * @param $account_name  收款方真实姓名
     * @param $money 付款金额。单位：元（范围：1~5000）
     * @param $desc 付款描述
     * @param $mch_id 付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传
     * @param $key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
     */
    public function rePayAliPay($merchant_id, $out_trade_no, $account, $account_name, $money, $desc, $mch_id, $notify_url, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($merchant_id)) {
                throw new Exception("YunGouOS商户ID不能为空！");
            }
            if (empty($out_trade_no)) {
                throw new Exception("商户单号不能为空！");
            }
            if (empty($account)) {
                throw new Exception("收款支付宝账户不能为空！");
            }
            if (empty($account_name)) {
                throw new Exception("收款支付宝姓名不能为空！");
            }
            if (empty($money)) {
                throw new Exception("付款金额不能为空！");
            }
            if (empty($desc)) {
                throw new Exception("付款描述不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['merchant_id'] = $merchant_id;
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['account'] = $account;
            $paramsArray['account_name'] = $account_name;
            $paramsArray['money'] = $money;
            $paramsArray['desc'] = $desc;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            if (!empty($mch_id)) {
                $paramsArray['mch_id'] = $mch_id;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['repay_alipay_url'], $paramsArray);
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
     * 转账到银行卡
     *
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/bank
     *
     * @param $merchant_id YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
     * @param $out_trade_no 商户单号
     * @param $account 收款支付宝账户
     * @param $account_name  收款方真实姓名
     * @param $money 付款金额。单位：元（范围：1~5000）
     * @param $desc 付款描述
     * @param $bank_type 银行卡类型【0：对私、1：对公】不传默认0
     * @param $bank_name 银行名称。对公情况下必传
     * @param $bank_code 银行支行联行号。对公情况下必传
     * @param $mch_id 付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传（仅限支付宝商户）
     * @param $app_id 付款商户号绑定APPID。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传（仅限支付宝商户）
     * @param $key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
     */
    public function rePayBank($merchant_id, $out_trade_no, $account, $account_name, $money, $desc, $bank_type, $bank_name, $bank_code, $mch_id, $app_id, $notify_url, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($merchant_id)) {
                throw new Exception("YunGouOS商户ID不能为空！");
            }
            if (empty($out_trade_no)) {
                throw new Exception("商户单号不能为空！");
            }
            if (empty($account)) {
                throw new Exception("银行卡号不能为空！");
            }
            if (empty($account_name)) {
                throw new Exception("银行卡姓名不能为空！");
            }
            if (empty($money)) {
                throw new Exception("付款金额不能为空！");
            }
            if (empty($desc)) {
                throw new Exception("付款描述不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['merchant_id'] = $merchant_id;
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['account'] = $account;
            $paramsArray['account_name'] = $account_name;
            $paramsArray['money'] = $money;
            $paramsArray['desc'] = $desc;
            if (!empty($bank_name)) {
                $paramsArray['bank_name'] = $bank_name;
            }
            if (!empty($bank_code)) {
                $paramsArray['bank_code'] = $bank_code;
            }
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            if (!empty($bank_type)) {
                $paramsArray['bank_type'] = $bank_type;
            }
            if (!empty($mch_id)) {
                $paramsArray['mch_id'] = $mch_id;
            }
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['repay_bank_url'], $paramsArray);
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
     * 查询转账结果
     *
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/getRePayInfo
     *
     * @param $out_trade_no 商户单号
     * @param $merchant_id YunGouOS商户ID  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
     * @param $key 商户密钥  登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
     */
    public function getRePayInfo($out_trade_no, $merchant_id, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no)) {
                throw new Exception("商户单号不能为空！");
            }
            if (empty($merchant_id)) {
                throw new Exception("YunGouOS商户ID不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['merchant_id'] = $merchant_id;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            $resp = $this->httpUtil->httpGet($this->apiConfig['repay_get_repay_info_url'] . "?" . http_build_query($paramsArray));
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
     * 发起批量转账
     * <p>
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/create
     *
     * @param $out_trade_no     商户单号
     * @param $mch_id           批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
     * @param $repay_order_list 收款方列表
     * @param $pay_type         转账方式。固定值：alipay或wxpay
     * @param $order_title      支付宝收银台页面账单标题
     * @param $time_expire      转账超时时间。格式yyyy-MM-dd HH:mm:ss
     * @param $description      批量转账描述
     * @param $notify_url       异步回调地址。如传递该参数，转账成功后系统将会把转账结果发送到该地址
     * @param $return_url       同步回调地址。如传递该参数，转账成功后浏览器会跳转到该地址
     * @param $key              商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
     * @return BatchPayBiz 参考文档：https://open.pay.yungouos.com/#/api/api/finance/repay/create
     */
    public function batchPayCreate($out_trade_no, $mch_id, $repay_order_list, $pay_type, $order_title, $time_expire, $description, $notify_url, $return_url, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no)) {
                throw new Exception("商户单号不能为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("批量转账商户号不能为空！");
            }
            if (empty($repay_order_list) || count($repay_order_list) <= 0) {
                throw new Exception("收款方不能为空！");
            }
            if (empty($pay_type)) {
                throw new Exception("转账方式不能为空！");
            }
            if (empty($order_title)) {
                throw new Exception("账单标题不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['repay_order_list'] = json_encode($repay_order_list);
            $paramsArray['pay_type'] = $pay_type;
            $paramsArray['order_title'] = $order_title;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            if (!empty($time_expire)) {
                $paramsArray['time_expire'] = $time_expire;
            }
            if (!empty($description)) {
                $paramsArray['description'] = $description;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($return_url)) {
                $paramsArray['return_url'] = $return_url;
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['repay_get_repay_batch_pay_create_url'], $paramsArray);
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
     * 确认批量转账
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/sendPay
     *
     * @param $out_trade_no 商户单号。与batch_no参数不能同时为空
     * @param $batch_no     批次单号。与out_trade_no参数不能同时为空
     * @param $mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
     * @param $type         转账类型【web、app】分别表示【PC端确认付款、APP端确认付款】
     * @param $app_code     是否转换为二维码【true、false】。当type为app时传递有效，可将返回的付款链接生成二维码。
     * @param $key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
     * @return $确认转账的url
     */
    public function batchPaySendPay($out_trade_no, $batch_no, $mch_id, $type, $app_code, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no) && empty($batch_no)) {
                throw new Exception("商户单号和批次单号不能同时为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("批量转账商户号不能为空！");
            }
            if (empty($type)) {
                throw new Exception("转账类型不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }

            if (!empty($out_trade_no)) {
                $paramsArray['out_trade_no'] = $out_trade_no;
            }
            if (!empty($batch_no)) {
                $paramsArray['batch_no'] = $batch_no;
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['type'] = $type;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            if (!empty($app_code)) {
                $paramsArray['app_code'] = $app_code;
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['repay_get_repay_batch_pay_send_url'], $paramsArray);
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
     * 查询批量转账
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/getBatchPayInfo
     *
     * @param $out_trade_no 商户单号。与batch_no参数不能同时为空
     * @param $batch_no     批次单号。与out_trade_no参数不能同时为空
     * @param $mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
     * @param $key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
     * @return BatchPayInfoBiz 转账详情对象，参考文档：https://open.pay.yungouos.com/#/api/api/finance/repay/getBatchPayInfo
     */
    public function getBatchPayInfo($out_trade_no, $batch_no, $mch_id, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no) && empty($batch_no)) {
                throw new Exception("商户单号和批次单号不能同时为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("批量转账商户号不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            if (!empty($out_trade_no)) {
                $paramsArray['out_trade_no'] = $out_trade_no;
            }
            if (!empty($batch_no)) {
                $paramsArray['batch_no'] = $batch_no;
            }
            $paramsArray['mch_id'] = $mch_id;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            $resp = $this->httpUtil->httpGet($this->apiConfig['repay_get_repay_batch_pay_info_url'] . "?" . http_build_query($paramsArray));
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
     * 关闭批量转账
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/close
     *
     * @param $out_trade_no 商户单号。与batch_no参数不能同时为空
     * @param $batch_no     批次单号。与out_trade_no参数不能同时为空
     * @param $mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
     * @param $key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
     */
    public function batchPayClose($out_trade_no, $batch_no, $mch_id, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no) && empty($batch_no)) {
                throw new Exception("商户单号和批次单号不能同时为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("批量转账商户号不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            if (!empty($out_trade_no)) {
                $paramsArray['out_trade_no'] = $out_trade_no;
            }
            if (!empty($batch_no)) {
                $paramsArray['batch_no'] = $batch_no;
            }
            $paramsArray['mch_id'] = $mch_id;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            $resp = $this->httpUtil->httpsPost($this->apiConfig['repay_get_repay_batch_pay_close_url'], $paramsArray);
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
     * 对已经分账成功的分账账单进行分账回退，调用该接口将会退回分账金额。文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/refund
     *
     * @param $out_return_no 商户回退单号
     * @param $ps_no         分账单号
     * @param $mch_id        支付商户号
     * @param $money         回退金额。单位：元
     * @param $reason        回退原因
     * @param $notify_url    异步回调地址
     * @param $key           支付密钥 登录YunGouOS.com-》微信支付/支付宝-》商户管理-》支付密钥 查看密钥
     * @return  回退单详情对象，参考文档：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/refund
     */
    public function shareReturn($out_return_no, $ps_no, $mch_id, $money, $reason, $notify_url, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_return_no)) {
                throw new PayException("商户回退单号不能为空！");
            }
            if (empty($ps_no)) {
                throw new PayException("分账单号不能为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($money)) {
                throw new PayException("回退金额不能为空！");
            }
            if (empty($reason)) {
                throw new PayException("回退原因不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_return_no'] = $out_return_no;
            $paramsArray['ps_no'] = $ps_no;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['money'] = $money;
            $paramsArray['reason'] = $reason;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['finance_share_refund_url'], $paramsArray);
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
     * 查询分账回退
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/getShareReturnInfo
     *
     * @param out_return_no 商户分账回退单号。（与系统回退单号二选一）
     * @param return_no     系统回退单号。（与分账回退单号二选一）
     * @param mch_id        支付商户号 登录YunGouOS.com-》微信支付/支付宝-》商户管理 商户号
     * @param key           商户密钥 登录YunGouOS.com-》微信支付/支付宝-》商户管理 商户密钥
     * @return 回退单详情对象，参考文档：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/getShareReturnInfo
     */
    public function getShareReturnInfo($out_return_no, $return_no, $mch_id, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_return_no) && empty($return_no)) {
                throw new Exception("商户回退单号和系统回退单号不能同时为空！");
            }
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            if (!empty($out_return_no)) {
                $paramsArray['out_return_no'] = $out_return_no;
            }
            if (!empty($return_no)) {
                $paramsArray['return_no'] = $return_no;
            }
            $paramsArray['mch_id'] = $mch_id;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            $resp = $this->httpUtil->httpGet($this->apiConfig['finance_get_share_refund_result_url'] . "?" . http_build_query($paramsArray));
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

