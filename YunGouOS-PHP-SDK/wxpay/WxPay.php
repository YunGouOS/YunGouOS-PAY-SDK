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
     *  微信付款码支付（原刷卡支付） 被扫
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body  商品描述
     * @param $auth_code  扫码支付授权码，设备读取用户微信中的条码或者二维码信息（注：用户付款码条形码规则：18位纯数字，以10、11、12、13、14、15开头）
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $receipt 是否开具电子发票 0：否 1：是 默认0
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function codePay($out_trade_no, $total_fee, $mch_id, $body, $auth_code, $attach, $receipt, $notify_url, $config_no, $auto, $auto_node,$biz_params,$key)
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
            if (empty($auth_code)) {
                throw new Exception("授权码不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['total_fee'] = $total_fee;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['body'] = $body;
            $paramsArray['auth_code'] = $auth_code;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            //下面参数不参与签名，但是接口需要这些参数
            if(!empty($receipt)){
                $paramsArray['receipt'] = $receipt;
            }
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
            if(!empty($biz_params)){
                if(is_array($biz_params)){
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson=json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_code_pay_url'], $paramsArray);
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
     *  微信扫码支付 返回支付二维码链接
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body  商品描述
     * @param $type 返回类型（1、返回微信原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function nativePay($out_trade_no, $total_fee, $mch_id, $body, $type, $attach, $notify_url, $config_no, $auto, $auto_node,$biz_params, $key)
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

            if(!empty($biz_params)){
                if(is_array($biz_params)){
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson=json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }

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
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body  商品描述
     * @param $openId 用户openId 通过授权接口获得
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function jsapiPay($out_trade_no, $total_fee, $mch_id, $body, $openId, $attach, $notify_url, $config_no, $auto, $auto_node,$biz_params, $key)
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

            if(!empty($biz_params)){
                if(is_array($biz_params)){
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson=json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }

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
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body  商品描述
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $return_url 同步回调地址 不传支付后关闭页面
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function cashierPay($out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $return_url, $config_no, $auto, $auto_node,$biz_params, $key)
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
            if(!empty($biz_params)){
                if(is_array($biz_params)){
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson=json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }

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
     *  微信刷脸支付，通过微信刷脸SDK或青蛙APP调用摄像头获取到扫描人脸获取到人脸数据后，发起刷脸支付请求，进行支付扣款。
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body  商品描述
     * @param $openId 用户openId（调用授权接口获取）
     * @param $face_code 人脸凭证，通过摄像头配合微信刷脸SDK获得
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0 开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function facePay($out_trade_no, $total_fee, $mch_id, $body, $openId, $face_code, $attach, $notify_url, $config_no, $auto, $auto_node,$biz_params, $key)
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
                throw new Exception("用户openId不能为空！");
            }
            if (empty($face_code)) {
                throw new Exception("人脸凭证不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['total_fee'] = $total_fee;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['body'] = $body;
            $paramsArray['openId'] = $openId;
            $paramsArray['auth_code'] = $face_code;
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

            if(!empty($biz_params)){
                if(is_array($biz_params)){
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson=json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_face_pay_url'], $paramsArray);
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
     *  微信H5支付接口，在非微信以外的第三方浏览器环境下拉起微信客户端进行付款，返回拉起微信支付的URL。
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body  商品描述
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $return_url 同步回调地址，用户支付成功后从微信APP跳转回该地址。调转不会携带任何参数，如需携带参数请自行拼接
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function wapPay($out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $return_url, $config_no, $auto, $auto_node,$biz_params, $key)
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

            if(!empty($biz_params)){
                if(is_array($biz_params)){
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson=json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_wap_pay_url'], $paramsArray);
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
     *  微信APP支付接口，返回APP拉起微信支付的参数，用户只需在APP端做拉起支付的动作即可。
     * @param $app_id 微信开放平台申请的APPID
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body  商品描述
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function appPay($app_id, $out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $config_no, $auto, $auto_node,$biz_params,$key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($app_id)) {
                throw new Exception("微信开放平台APPID不能为空！！");
            }
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
            $paramsArray['app_id'] = $app_id;
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

            if(!empty($biz_params)){
                if(is_array($biz_params)){
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson=json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_app_pay_url'], $paramsArray);
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
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $money 退款金额
     * @param $refund_desc 退款描述
     * @param $notify_url 退款结果异步通知地址
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return 退款信息 详情 https://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder
     * @throws Exception
     */
    public function orderRefund($out_trade_no, $mch_id, $money, $refund_desc,$notify_url,$key)
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
            if(!empty($notify_url)){
                $paramsArray['notify_url'] = $notify_url;
            }
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
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
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
     * 下载微信对账单
     * 使用场景：下载微信官方对账单。商户可以通过该接口下载历史交易清单。返回excel下载地址和原生数据。
     * @param $mch_id 微信支付商户号
     * @param $date 对账单日期 示例值：2020-01-23
     * @param $end_date 对账单结束日期 示例值：2020-01-25
     * @param $device_info 设备号或门店号
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return 对账单信息 包括对账单数据，excel下载地址，汇总数据 文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/downloadBill
     * @throws Exception
     */
    public function downloadBill($mch_id, $date,$end_date,$device_info, $key)
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
            if(!empty($end_date)){
                $paramsArray['end_date'] = $end_date;
            }
            if(!empty($device_info)){
                $paramsArray['device_info'] = $device_info;
            }
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


    /**
     * 查询刷卡支付结果
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $out_trade_no 商户单号
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return 查询结果对象 详情参考 https://open.pay.yungouos.com/#/api/api/pay/wxpay/getCodePayResult
     * @throws Exception
     */
    public function getCodePayResult($mch_id, $out_trade_no, $key)
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

            $resp = $this->httpUtil->httpGet($this->apiConfig['wxpay_get_code_pay_result_url'] . "?" . http_build_query($paramsArray));
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

