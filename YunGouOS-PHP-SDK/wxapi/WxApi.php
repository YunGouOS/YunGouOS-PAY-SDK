<?php
/**
 *  YunGouOS微信开放API
 *  author YunGouOS
 *  site:www.yungouos.com
 * 文档地址：https://open.pay.yungouos.com
 */

require_once dirname(dirname(__FILE__)) . '/util/HttpUtil.php';
require_once dirname(dirname(__FILE__)) . '/util/PaySign.php';

class WxApi
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
     * 获取授权URL地址
     * 文档地址：https://open.pay.yungouos.com/#/api/api/wx/getOauthUrl
     * @param $mch_id 微信支付商户号或YunGouOS商户ID
     * @param $callback_url 授权完毕后回调地址
     * @param $type 授权类型【mp-base：基础授权，不会有授权页面，用户无感知，可获取openid；mp-info：详细授权，首次授权会弹出授权页面，可获取用户昵称、头像等信息；open-url：微信PC端扫码登录url】
     * @param $params 额外参数 数组
     * @param $key 商户号对应的密钥
     * @return 授权url 微信授权url，直接重定向到该地址
     * @throws Exception
     */
    public function getWxOauthUrl($mch_id, $callback_url, $type, $params, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("mch_id不能为空！");
            }
            if (empty($callback_url)) {
                throw new Exception("callback_url不能为空！");
            }
            if (empty($key)) {
                throw new Exception("key不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['callback_url'] = $callback_url;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            if (!empty($type)) {
                $paramsArray['type'] = $type;
            }
            if (!empty($params)) {
                $paramsArray['params'] = json_encode($params);
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxapi_get_wx_oauth_url'], $paramsArray);
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
     * 微信扫码登录
     * 文档地址：https://open.pay.yungouos.com/#/api/api/wx/getWebLogin
     * @param $mch_id 微信支付商户号或YunGouOS商户ID
     * @param $callback_url 授权完毕后回调地址
     * @param $params 额外参数 数组
     * @param $key 商户号对应的密钥
     * @return 微信扫码登录所需的参数对象 参考文档：https://open.pay.yungouos.com/#/api/api/wx/getWebLogin
     * @throws Exception
     */
    public function getWebLogin($mch_id, $callback_url,$params, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("mch_id不能为空！");
            }
            if (empty($callback_url)) {
                throw new Exception("callback_url不能为空！");
            }
            if (empty($key)) {
                throw new Exception("key不能为空！");
            }
            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['callback_url'] = $callback_url;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            if (!empty($params)) {
                $paramsArray['params'] = json_encode($params);
            }
            $resp = $this->httpUtil->httpsPost($this->apiConfig['wxapi_get_wx_web_login'], $paramsArray);
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
     * @param $mch_id 微信支付商户号或YunGouOS商户ID
     * @param $code 授权结束后返回的code
     * @param $key 商户号对应的密钥
     * @return 授权信息 参考文档：https://open.pay.yungouos.com/#/api/api/wx/getOauthInfo
     * @throws Exception
     */
    public function getWxOauthInfo($mch_id, $code, $key)
    {
        $result = null;
        $paramsArray = array();
        try {
            if (empty($mch_id)) {
                throw new Exception("mch_id不能为空！");
            }
            if (empty($code)) {
                throw new Exception("code不能为空！");
            }
            if (empty($key)) {
                throw new Exception("key不能为空！");
            }

            $paramsArray['mch_id'] = $mch_id;
            $paramsArray['code'] = $code;
            // 上述必传参数签名
            $sign = $this->paySign->getSign($paramsArray, $key);
            $paramsArray['sign'] = $sign;
            $resp = $this->httpUtil->httpGet($this->apiConfig['wxapi_get_wx_oauth_info'] . "?" . http_build_query($paramsArray));
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
