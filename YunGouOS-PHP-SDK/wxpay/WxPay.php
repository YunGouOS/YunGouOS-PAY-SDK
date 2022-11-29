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
     * @param $app_id 在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $receipt 是否开具电子发票 0：否 1：是 默认0
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function codePay($out_trade_no, $total_fee, $mch_id, $body, $auth_code, $app_id, $attach, $receipt, $notify_url, $config_no, $auto, $auto_node, $biz_params, $key)
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
            if (!empty($receipt)) {
                $paramsArray['receipt'] = $receipt;
            }
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }
            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
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
     * @param $app_id 在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function nativePay($out_trade_no, $total_fee, $mch_id, $body, $type, $app_id, $attach, $notify_url, $config_no, $auto, $auto_node, $biz_params, $key)
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
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }

            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
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
     * @param $app_id 在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $return_url 同步地址。支付完毕后用户浏览器返回到该地址
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function jsapiPay($out_trade_no, $total_fee, $mch_id, $body, $openId, $app_id, $attach, $notify_url, $return_url, $config_no, $auto, $auto_node, $biz_params, $key)
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
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($return_url)) {
                $paramsArray['return_url'] = $return_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }

            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
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
     * @param $app_id 在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $return_url 同步回调地址 不传支付后关闭页面
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function cashierPay($out_trade_no, $total_fee, $mch_id, $body, $app_id, $attach, $notify_url, $return_url, $config_no, $auto, $auto_node, $biz_params, $key)
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
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($return_url)) {
                $paramsArray['return_url'] = $return_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }
            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
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
     *
     * 微信小程序支付，返回小程序支付所需的参数，前端按照小程序API拉起支付界面。 适合个体户/企业
     *
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body 商品描述
     * @param $openId 用户openId（调用小程序wx.login接口获取）
     * @param $app_id 在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param $attach 附加数据，回调时候原路返回
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function minAppPay($out_trade_no, $total_fee, $mch_id, $body, $openId, $app_id, $attach, $notify_url, $config_no, $auto, $auto_node, $biz_params, $key)
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
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['openId'] = $openId;
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            //下面参数不参与签名，但是接口需要这些参数
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }

            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_minapp_pay_url'], $paramsArray);
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
     * 微信小程序支付，返回跳转“支付收银”小程序所需的参数。适合个人商户。
     *
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body 商品描述
     * @param $title 支付收银小程序页面顶部的title 可自定义品牌名称 不传默认为 “收银台” 如传递参数 “海底捞” 页面则显示 “海底捞-收银台”
     * @param $app_id 在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param $attach 附加数据，回调时候原路返回
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function minAppPayParams($out_trade_no, $total_fee, $mch_id, $body, $title, $app_id, $attach, $notify_url, $config_no, $auto, $auto_node, $biz_params, $key)
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
            $paramsArray['title'] = $title;
            //下面参数不参与签名，但是接口需要这些参数
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }

            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }
            $paramsArray['sign'] = $sign;
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return $paramsArray;
    }


    /**
     *  微信刷脸支付，通过微信刷脸SDK或青蛙APP调用摄像头获取到扫描人脸获取到人脸数据后，发起刷脸支付请求，进行支付扣款。
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body  商品描述
     * @param $openId 用户openId（调用授权接口获取）
     * @param $face_code 人脸凭证，通过摄像头配合微信刷脸SDK获得
     * @param $app_id 在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0 开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function facePay($out_trade_no, $total_fee, $mch_id, $body, $openId, $face_code, $app_id, $attach, $notify_url, $config_no, $auto, $auto_node, $biz_params, $key)
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
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            //下面参数不参与签名，但是接口需要这些参数

            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }

            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
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
     * @param $app_id 在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $return_url 同步回调地址，用户支付成功后从微信APP跳转回该地址。调转不会携带任何参数，如需携带参数请自行拼接
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function wapPay($out_trade_no, $total_fee, $mch_id, $body, $app_id, $attach, $notify_url, $return_url, $config_no, $auto, $auto_node, $biz_params, $key)
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
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($return_url)) {
                $paramsArray['return_url'] = $return_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }

            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
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
    public function appPay($app_id, $out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $config_no, $auto, $auto_node, $biz_params, $key)
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
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }

            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
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
     *  QQ小程序内使用微信支付进行付款，返回QQ小程序支付所需的参数。
     * @param $app_id QQ小程序的APPID
     * @param $access_token QQ小程序的accessToken
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
    public function qqPay($app_id, $access_token, $out_trade_no, $total_fee, $mch_id, $body, $attach, $notify_url, $return_url, $config_no, $auto, $auto_node, $biz_params, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($app_id)) {
                throw new Exception("QQ小程序app_id不能为空！");
            }
            if (empty($access_token)) {
                throw new Exception("QQ小程序access_token不能为空！");
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
            $paramsArray['access_token'] = $access_token;
            $paramsArray['out_trade_no'] = $out_trade_no;
            $paramsArray['total_fee'] = $total_fee;
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['body'] = $body;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            //下面参数不参与签名，但是接口需要这些参数
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($return_url)) {
                $paramsArray['return_url'] = $return_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }

            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_qq_pay_url'], $paramsArray);
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
     *  QQ小程序支付参数，适合个人用户，拿到参数后跳转到“支付收银"小程序可自动发起支付
     * @param $out_trade_no 订单号不可重复
     * @param $total_fee 支付金额 单位元 范围 0.01-99999
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $body  商品描述
     * @param $title 收银台标题
     * @param $app_id 在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param $attach 附加数据 回调时原路返回 可不传
     * @param $notify_url 异步回调地址，不传无回调
     * @param $return_url 同步回调地址，用户支付成功后从微信APP跳转回该地址。调转不会携带任何参数，如需携带参数请自行拼接
     * @param $config_no 分账配置单号。支持多个分账，使用,号分割
     * @param $auto 分账模式。【0：不分账 1：自动分账 2：手动分账】 默认 0开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param $auto_node 执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param $biz_params 支付附加业务参数数组，具体参考API文档
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public function qqPayParams($out_trade_no, $total_fee, $mch_id, $body, $title, $app_id, $attach, $notify_url, $return_url, $config_no, $auto, $auto_node, $biz_params, $key)
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
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            if (!empty($title)) {
                $paramsArray['title'] = $title;
            }
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($notify_url)) {
                $paramsArray['notify_url'] = $notify_url;
            }
            if (!empty($return_url)) {
                $paramsArray['return_url'] = $return_url;
            }
            if (!empty($config_no)) {
                $paramsArray['config_no'] = $config_no;
            }
            if (!empty($auto)) {
                $paramsArray['auto'] = $auto;
            }
            if (!empty($auto_node)) {
                $paramsArray['auto_node'] = $auto_node;
            }

            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }
            $paramsArray['sign'] = $sign;
        } catch (Exception $e) {
            throw  new Exception($e->getMessage());
        }
        return $paramsArray;
    }


    /**
     * 微信刷脸支付凭证
     *
     * @param mch_id         微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param store_id       门店编号，由商户定义，各门店唯一。
     * @param store_name     门店名称，由商户定义。（可用于展示）
     * @param face_auth_info 人脸数据。调用【get_wxpayface_authinfo】接口获取到的结果
     * @param device_id      终端设备编号，由商户定义。
     * @param $app_id 在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach         附加数据 回调时原路返回 可不传
     * @param bizParams      附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return FacePayAuthInfoBiz 刷脸支付凭证 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/getFacePayAuthInfo
     */
    public function getFacePayAuthInfo($mch_id, $store_id, $store_name, $face_auth_info, $device_id, $app_id, $attach, $biz_params, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("商户号不能为空！");
            }
            if (empty($store_id)) {
                throw new Exception("门店编号不能为空！");
            }
            if (empty($store_name)) {
                throw new Exception("门店名称不能为空！");
            }
            if (empty($face_auth_info)) {
                throw new Exception("人脸数据不能为空！");
            }
            if (empty($key)) {
                throw new Exception("商户密钥不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['store_id'] = $store_id;
            $paramsArray['store_name'] = $store_name;
            $paramsArray['face_auth_info'] = $face_auth_info;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            //下面参数不参与签名，但是接口需要这些参数
            if (!empty($app_id)) {
                $paramsArray['app_id'] = $app_id;
            }
            if (!empty($device_id)) {
                $paramsArray['device_id'] = $device_id;
            }
            if (!empty($attach)) {
                $paramsArray['attach'] = $attach;
            }
            if (!empty($biz_params)) {
                if (is_array($biz_params)) {
                    throw new Exception("biz_params不是合法的数组");
                }
                $biz_paramsJson = json_encode($biz_params);
                $paramsArray['biz_params'] = $biz_paramsJson;
            }

            $paramsArray['sign'] = $sign;

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_face_pay_auth_info_url'], $paramsArray);
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
    public function orderRefund($out_trade_no, $mch_id, $money, $out_trade_refund_no, $refund_desc, $notify_url, $key)
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
            if (!empty($out_trade_refund_no)) {
                $paramsArray['out_trade_refund_no'] = $out_trade_refund_no;
            }
            if (!empty($refund_desc)) {
                $paramsArray['refund_desc'] = $refund_desc;
            }
            if (!empty($notify_url)) {
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
    public function downloadBill($mch_id, $date, $end_date, $device_info, $key)
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
            if (!empty($end_date)) {
                $paramsArray['end_date'] = $end_date;
            }
            if (!empty($device_info)) {
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


    /**
     * 关闭订单
     * @param $out_trade_no 商户单号
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return 商户单号
     * @throws Exception
     */
    public function closeOrder($out_trade_no, $mch_id, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no)) {
                throw new Exception("商户单号不能为空！");
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

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_close_order_url'], $paramsArray);
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
     * 撤销订单
     * @param $out_trade_no 商户单号
     * @param $mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param $key 商户密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return 商户单号
     * @throws Exception
     */
    public function reverseOrder($out_trade_no, $mch_id, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($out_trade_no)) {
                throw new Exception("商户单号不能为空！");
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

            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxpay_reverse_order_url'], $paramsArray);
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

