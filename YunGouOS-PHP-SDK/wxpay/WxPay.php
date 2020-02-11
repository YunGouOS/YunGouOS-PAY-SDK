<?php
/**
 *  YunGouOS微信个人支付API
 *  author YunGouOS
 *  site:www.yungouos.com
 * 文档地址：https://open.pay.yungouos.com
 */

require_once dirname(dirname(__FILE__)) . '/util/HttpUtil.php';
require_once dirname(dirname(__FILE__)) . '/util/PaySign.php';

class WxPay
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
        $this->apiConfig = require '../config/YunGouOSPayApiConfig.php';
        $this->httpUtil = new HttpUtil();
        $this->paySign = new PaySign();
    }

    /**
     *  微信扫码支付 返回支付二维码链接
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
     * @param $body  商品描述
     * @param $type 返回类型（1、返回微信原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》我的支付-》独立密钥 查看密钥
     */
    public function nativePay($out_trade_no, $total_fee, $mch_id, $body, $type, $attach, $notify_url, $key)
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
            $paramsArray['attach'] = $attach;
            $paramsArray['notify_url'] = $notify_url;
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_native_pay_url'], $paramsArray);
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
     *  微信公众号支付 返回JSSDK支付需要的jspackage
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
     * @param $body  商品描述
     * @param $openId 用户openId 通过授权接口获得
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》我的支付-》独立密钥 查看密钥
     */
    public function jsapiPay($out_trade_no, $total_fee, $mch_id, $body, $openId, $attach, $notify_url, $key)
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
            if (empty($openId)) {
                throw new Exception("openId不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['total_fee'] = $total_fee;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['body'] = $body;
            $paramsArray['openId'] = $openId;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);

            //下面参数不参与签名，但是接口需要这些参数
            $paramsArray['attach'] = $attach;
            $paramsArray['notify_url'] = $notify_url;
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_jsapi_pay_url'], $paramsArray);
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
     *  收银台支付，对扫码支付、JSAPI支付的封装，提供了相关页面 返回收银台地址，重定向到该地址即可
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
     * @param $body  商品描述
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $return_url 同步回调地址 不传支付后关闭页面
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》我的支付-》独立密钥 查看密钥
     */
    public function cashierPay($out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $return_url, $key)
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
            $paramsArray['attach'] = $attach;
            $paramsArray['notify_url'] = $notify_url;
            $paramsArray['return_url'] = $return_url;
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_cashier_pay_url'], $paramsArray);
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
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
     * @param $money 退款金额
     * @param $refund_desc 退款描述
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》我的支付-》独立密钥 查看密钥
     * @return 退款信息 详情 https://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder
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

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_refund_order_url'], $paramsArray);
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
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》我的支付-》独立密钥 查看密钥
     * @return 退款对象 详情参考 https://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult
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

            $resp = $this->httpUtil->httpGet($this->apiConfig['wxpay_get_refund_result_url'] . "?" . http_build_query($paramsArray));
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
     * 获取授权URL地址
     * @param $params 额外参数 数组
     * @param $callbackUrl 授权结束的回调地址。此处授权后是回到oauth.php下处理
     * @return 授权url 直接重定向到该地址 需要包含 http:// 以及携带一个参数 示例值：http://www.baidu.com?a=1
     * @throws Exception
     */
    public function getOauthUrl($params, $callbackUrl)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($callbackUrl)) {
                throw new Exception("callbackUrl不能为空！");
            }
            $paramsArray['url'] = $callbackUrl;
            $paramsArray['params'] = json_encode($params);

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wx_get_wx_oauth_url'], $paramsArray);
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
     * 查询微信授权信息
     * @param $code 授权结束后返回到回调地址上的参数
     * @return 授权信息 参考文档：https://open.pay.yungouos.com/#/api/api/wxlogin/getBaseOauthInfo
     * @throws Exception
     */
    public function getOauthInfo($code)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($code)) {
                throw new Exception("code不能为空！");
            }

            $paramsArray['code'] = $code;

            $resp = $this->httpUtil->httpGet($this->apiConfig['wx_get_wx_oauth_info'] . "?" . http_build_query($paramsArray));
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
     * 查询微信结算信息
     * @param $mch_id 微信支付商户号
     * @param $date 查询日期 示例值：2020-01-23
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》我的支付-》独立密钥 查看密钥
     * @return 结算信息 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/getWxBillInfo
     * @throws Exception
     */
    public function getWxBillInfo($mch_id, $date, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($date)) {
                throw new Exception("查询日期不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['date'] = $date;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpGet($this->apiConfig['wxpay_get_wx_bill_info_url'] . "?" . http_build_query($paramsArray));
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
     * 发起微信支付结算
     * 使用场景：对于结算失败的订单进行重新发起微信打款结算，如因银行卡错误导致结算失败，请先修改银行卡后再发起。
     * @param $mch_id 微信支付商户号
     * @param $date 结算日期（交易日期+1天）示例值：2020-01-23
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》我的支付-》独立密钥 查看密钥
     * @return 结算金额 文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/sendWxCash
     * @throws Exception
     */
    public function sendWxPayCash($mch_id, $date, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($date)) {
                throw new Exception("结算日期不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['date'] = $date;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_send_wx_cash_url'], $paramsArray);
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
     * 下载微信对账单
     * 使用场景：下载微信官方对账单。商户可以通过该接口下载历史交易清单。返回excel下载地址和原生数据。
     * @param $mch_id 微信支付商户号
     * @param $date 对账单日期 示例值：2020-01-23
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》我的支付-》独立密钥 查看密钥
     * @return 对账单信息 包括对账单数据，excel下载地址，汇总数据 文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/downloadBill
     * @throws Exception
     */
    public function downloadBill($mch_id, $date, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($date)) {
                throw new Exception("查询日期不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['date'] = $date;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpGet($this->apiConfig['wxpay_download_bill_url'] . "?" . http_build_query($paramsArray));
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

