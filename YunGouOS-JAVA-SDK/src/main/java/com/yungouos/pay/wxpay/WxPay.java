package com.yungouos.pay.wxpay;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.common.PayException;
import com.yungouos.pay.config.AlipayApiConfig;
import com.yungouos.pay.config.WxPayApiConfig;
import com.yungouos.pay.entity.*;
import com.yungouos.pay.entity.qqpay.QqPayBiz;
import com.yungouos.pay.util.PaySignUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * 微信支付API对接
 *
 * @author YunGouOS技术部-029
 */
public class WxPay {

    /**
     * 微信付款码支付（原刷卡支付） 被扫
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param auth_code    扫码支付授权码，设备读取用户微信中的条码或者二维码信息（注：用户付款码条形码规则：18位纯数字，以10、11、12、13、14、15开头）
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param receipt      是否开具电子发票 0：否 1：是 默认0
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return CodePayBiz 付款码支付结果对象 参考文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay
     */
    public static CodePayBiz codePay(String out_trade_no, String total_fee, String mch_id, String body, String auth_code, String app_id, String attach, String receipt, String notify_url, String config_no,
                                     String auto, String auto_node, BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        CodePayBiz codePayBiz = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(auth_code)) {
                throw new PayException("授权码不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            params.put("auth_code", auth_code);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (StrUtil.isBlank(receipt)) {
                receipt = "0";
            }
            params.put("receipt", receipt);
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.codePayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject dataJson = jsonObject.getJSONObject("data");
            codePayBiz = JSON.toJavaObject(dataJson, CodePayBiz.class);
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return codePayBiz;
    }

    /**
     * 微信扫码支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param type         返回类型（1、返回微信原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param return_url   同步回调地址，暂时没什么卵用
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return 支付二维码连接
     */
    public static String nativePay(String out_trade_no, String total_fee, String mch_id, String body, String type, String app_id, String attach, String notify_url, String return_url, String config_no, String auto,
                                   String auto_node, BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String resultUrl = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (StrUtil.isBlank(type)) {
                type = "2";
            }
            params.put("type", type);
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(return_url)) {
                params.put("return_url", return_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }

            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }

            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.nativePayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            resultUrl = jsonObject.getString("data");
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return resultUrl;
    }

    /**
     * 公众号支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param openId       用户openId 通过授权接口获得
     * @param app_id       在YunGouOS平台报备的app_id。传递后则openId参数也要是通过该app_id微信授权获取。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param return_url   同步回调地址，支付后用户返回到该地址
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return JSSDK支付需要的jspackage
     */
    public static String jsapiPay(String out_trade_no, String total_fee, String mch_id, String body, String openId, String app_id, String attach, String notify_url, String return_url, String config_no, String auto,
                                  String auto_node, BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String resultUrl = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(openId)) {
                throw new PayException("openId不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            params.put("openId", openId);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(return_url)) {
                params.put("return_url", return_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.jsapiUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            resultUrl = jsonObject.getString("data");
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return resultUrl;
    }

    /**
     * 收银台支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param attach       附加数据 回调时原路返回 可不传
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param notify_url   异步回调地址，不传无回调
     * @param return_url   同步回调地址，不传支付后关闭页面
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return 返回收银台地址，重定向到该地址即可
     */
    public static String cashierPay(String out_trade_no, String total_fee, String mch_id, String body, String app_id, String attach, String notify_url, String return_url, String config_no, String auto,
                                    String auto_node, BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String resultUrl = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(return_url)) {
                params.put("return_url", return_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.cashierUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            resultUrl = jsonObject.getString("data");
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return resultUrl;
    }


    /**
     * 小程序支付（原生）
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param open_id      用户openid，通过wx.login获取
     * @param app_id       小程序APPID
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return 返回小程序支付所需的参数，拿到参数后由小程序端使用wx.requestPayment进行支付
     */
    public static JSONObject minAppPayV3(String out_trade_no, String total_fee, String mch_id, String body, String open_id, String app_id, String attach, String notify_url, String config_no, String auto,
                                         String auto_node, BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        JSONObject json = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(app_id)) {
                throw new PayException("小程序APPID不能为空！");
            }
            if (StrUtil.isBlank(open_id)) {
                throw new PayException("open_id不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            params.put("app_id", app_id);
            params.put("open_id", open_id);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.minAppPayV3Url).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            json = jsonObject.getJSONObject("data");
            if (json == null) {
                throw new PayException("小程序支付发起失败");
            }
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return json;
    }


    /**
     * 小程序支付（半屏）推荐使用WxPay.minAppPayV3 小程序支付（原生）方式
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param title        支付收银小程序显示的标题
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return 返回小程序支付所需的参数，拿到参数后由小程序端将参数携带跳转到“支付收银”小程序
     */
    @Deprecated
    public static JSONObject minAppPay(String out_trade_no, String total_fee, String mch_id, String body, String title, String app_id, String attach, String notify_url, String config_no, String auto,
                                       String auto_node, BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        JSONObject json = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(title)) {
                params.put("title", title);
            }
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            json = (JSONObject) JSONObject.toJSON(params);
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return json;
    }

    /**
     * 小程序支付（旧版，随时下线）推荐使用WxPay.minAppPayV3 小程序支付（原生）方式
     *
     * @param openId       小程序openId
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。传递该参数则openId也是要通过该app_id下获得
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return 返回原生小程序支付所需的参数，拿到参数后由小程序端调用微信小程序API发起支付
     */
    @Deprecated
    public static JSONObject minAppPaySend(String openId, String out_trade_no, String total_fee, String mch_id, String body, String app_id, String attach, String notify_url, String config_no, String auto,
                                           String auto_node, BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        JSONObject json = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(openId)) {
                params.put("openId", openId);
            }
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.minAppPayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            json = jsonObject.getJSONObject("data");
            if (json == null) {
                throw new PayException("小程序支付发起失败");
            }
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return json;
    }

    /**
     * 微信刷脸支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param openId       用户openId（调用授权接口获取）
     * @param face_code    人脸凭证，通过摄像头配合微信刷脸SDK获得
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return FacePayBiz 人脸支付结果对象 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay
     */
    public static FacePayBiz facePay(String out_trade_no, String total_fee, String mch_id, String body, String openId, String face_code, String app_id, String attach, String notify_url, String config_no,
                                     String auto, String auto_node, BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        FacePayBiz facePayBiz = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(openId)) {
                throw new PayException("用户openId不能为空！");
            }
            if (StrUtil.isBlank(face_code)) {
                throw new PayException("人脸凭证不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            params.put("openId", openId);
            params.put("face_code", face_code);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.facePayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject dataJson = jsonObject.getJSONObject("data");
            facePayBiz = JSON.toJavaObject(dataJson, FacePayBiz.class);
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return facePayBiz;
    }


    /**
     * 微信刷脸支付凭证
     *
     * @param mch_id         微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param store_id       门店编号，由商户定义，各门店唯一。
     * @param store_name     门店名称，由商户定义。（可用于展示）
     * @param face_auth_info 人脸数据。调用【get_wxpayface_authinfo】接口获取到的结果
     * @param device_id      终端设备编号，由商户定义。
     * @param app_id         在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach         附加数据 回调时原路返回 可不传
     * @param bizParams      附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return FacePayAuthInfoBiz 刷脸支付凭证 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/getFacePayAuthInfo
     */
    public static FacePayAuthInfoBiz getFacePayAuthInfo(String mch_id, String store_id, String store_name, String face_auth_info, String device_id, String app_id, String attach, BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        FacePayAuthInfoBiz facePayAuthInfoBiz = null;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(store_id)) {
                throw new PayException("门店编号不能为空！");
            }
            if (StrUtil.isBlank(store_name)) {
                throw new PayException("门店名称不能为空！");
            }
            if (StrUtil.isBlank(face_auth_info)) {
                throw new PayException("人脸数据不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("mch_id", mch_id);
            params.put("store_id", store_id);
            params.put("store_name", store_name);
            params.put("face_auth_info", face_auth_info);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(device_id)) {
                params.put("device_id", device_id);
            }
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.getFacePayAuthInfoUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject dataJson = jsonObject.getJSONObject("data");
            facePayAuthInfoBiz = JSON.toJavaObject(dataJson, FacePayAuthInfoBiz.class);
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return facePayAuthInfoBiz;
    }


    /**
     * 微信H5支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param attach       附加数据 回调时原路返回 可不传
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param notify_url   异步回调地址，不传无回调
     * @param return_url   同步回调地址，用户支付成功后从微信APP跳转回该地址。调转不会携带任何参数，如需携带参数请自行拼接
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return 返回微信H5支付链接，重定向到该地址可打开微信H5进行支付
     */
    public static String H5Pay(String out_trade_no, String total_fee, String mch_id, String body, String app_id, String attach, String notify_url, String return_url, String config_no, String auto, String auto_node,
                               BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String resultUrl = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(return_url)) {
                params.put("return_url", return_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.wapPayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            resultUrl = jsonObject.getString("data");
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return resultUrl;
    }

    /**
     * 微信APP支付
     *
     * @param app_id       微信开放平台申请的APPID
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return JSONObject 返回微信APP支付所需的参数 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/appPay
     */
    public static JSONObject appPay(String app_id, String out_trade_no, String total_fee, String mch_id, String body, String attach, String notify_url, String config_no, String auto, String auto_node,
                                    BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        JSONObject resultJson = null;
        try {
            if (StrUtil.isBlank(app_id)) {
                throw new PayException("微信开放平台APPID不能为空！");
            }
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("app_id", app_id);
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.appPayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            resultJson = jsonObject.getJSONObject("data");
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return resultJson;
    }


    /**
     * QQ小程序支付，适合企业/个体户 在自己小程序内拉起支付
     *
     * @param app_id       QQ小程序APPID
     * @param access_token QQ小程序的access_token
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param return_url   同步回调地址，用户支付成功后从微信APP跳转回该地址。调转不会携带任何参数，如需携带参数请自行拼接
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return 返回微信H5支付链接，QQ小程序端，按照QQ小程序前端API完成支付调用即可
     */
    public static QqPayBiz qqPay(String app_id, String access_token, String out_trade_no, String total_fee, String mch_id, String body, String attach, String notify_url, String return_url, String config_no, String auto, String auto_node,
                                 BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        QqPayBiz qqPayBiz = null;
        try {
            if (StrUtil.isBlank(app_id)) {
                throw new PayException("QQ小程序APPID不能为空！");
            }
            if (StrUtil.isBlank(access_token)) {
                throw new PayException("QQ小程序access_token不能为空！");
            }
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("app_id", app_id);
            params.put("access_token", access_token);
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(return_url)) {
                params.put("return_url", return_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.qqPayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject data = jsonObject.getJSONObject("data");
            if (data == null) {
                throw new PayException("API结果数据转换错误");
            }
            qqPayBiz = JSONObject.toJavaObject(data, QqPayBiz.class);
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return qqPayBiz;
    }


    /**
     * QQ小程序支付跳转参数，不会真正的调用接口，拿到参数后小程序端跳转到“支付收银”自动进行支付发起
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param body         商品描述
     * @param title        支付收银小程序页面顶部的title 可自定义品牌名称 不传默认为 “收银台” 如传递参数 “海底捞” 页面则显示 “海底捞-收银台”
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param return_url   同步回调地址，用户支付成功后从微信APP跳转回该地址。调转不会携带任何参数，如需携带参数请自行拼接
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param bizParams    附加业务参数对象，具体参考API文档biz_params参数说明
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return 返回小程序支付所需的参数，拿到参数后由小程序端将参数携带跳转到“支付收银”小程序
     */
    public static JSONObject qqPayParams(String out_trade_no, String total_fee, String mch_id, String body, String title, String app_id, String attach, String notify_url, String return_url, String config_no, String auto,
                                         String auto_node, BizParams bizParams, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        JSONObject json = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(total_fee)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(title)) {
                params.put("title", title);
            }
            if (!StrUtil.isBlank(attach)) {
                params.put("attach", attach);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(return_url)) {
                params.put("return_url", return_url);
            }
            if (!StrUtil.isBlank(config_no)) {
                params.put("config_no", config_no);
            }
            if (!StrUtil.isBlank(auto)) {
                params.put("auto", auto);
            }
            if (!StrUtil.isBlank(auto_node)) {
                params.put("auto_node", auto_node);
            }
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            json = (JSONObject) JSONObject.toJSON(params);
        } catch (JSONException e) {
            throw new PayException(e.getMessage());
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return json;
    }


    /**
     * 查询微信刷卡支付结果
     *
     * @param out_trade_no 订单号 不可重复
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return CodePayBiz 刷卡支付结果对象 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/getCodePayResult
     */
    public static CodePayBiz getCodePayResult(String out_trade_no, String mch_id, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        CodePayBiz codePayBiz = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("mch_id", mch_id);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.get(WxPayApiConfig.getCodePayResultUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject dataJson = jsonObject.getJSONObject("data");
            codePayBiz = JSON.toJavaObject(dataJson, CodePayBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return codePayBiz;
    }

    /**
     * 订单退款
     *
     * @param out_trade_no        订单号
     * @param mch_id              微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param money               退款金额
     * @param out_trade_refund_no 商户系统内的退款单号（不可重复），传递该参数情况下，查询退款接口可以通过该参数查询
     * @param refund_desc         退款描述
     * @param notify_url          退款成功异步回调地址
     * @param key                 支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return refundOrder 退款订单对象 参考文档：http://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder
     */
    public static RefundOrder orderRefund(String out_trade_no, String mch_id, String money, String out_trade_refund_no, String refund_desc, String notify_url, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        RefundOrder refundOrder = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(money)) {
                throw new PayException("退款金额不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("mch_id", mch_id);
            params.put("money", money);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(out_trade_refund_no)) {
                params.put("out_trade_refund_no", out_trade_refund_no);
            }
            if (!StrUtil.isBlank(refund_desc)) {
                params.put("refund_desc", refund_desc);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.refundOrderUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject json = jsonObject.getJSONObject("data");
            if (json == null) {
                throw new PayException("API结果数据转换错误");
            }
            refundOrder = JSONObject.toJavaObject(json, RefundOrder.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return refundOrder;
    }

    /**
     * 查询退款结果
     *
     * @param refund_no 退款单号，（由调用退款接口返回）
     * @param mch_id    微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param key       支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
     * @return RefundSearch 退款结果对象，参考文档 http://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult
     */
    public static RefundSearch getRefundResult(String refund_no, String mch_id, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        RefundSearch refundSearch = null;
        try {
            if (StrUtil.isBlank(refund_no)) {
                throw new PayException("退款单号不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("refund_no", refund_no);
            params.put("mch_id", mch_id);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.get(WxPayApiConfig.getRefundResultUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject json = jsonObject.getJSONObject("data");
            if (json == null) {
                throw new PayException("API结果数据转换错误");
            }
            refundSearch = JSONObject.toJavaObject(json, RefundSearch.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return refundSearch;
    }

    /**
     * 查询微信结算信息
     *
     * @param mch_id 微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param date   需要查询的结算日期，如：2020-01-23
     * @param key    支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return WxBillStatusBiz 结算结果对象，参考文档 https://open.pay.yungouos.com/#/api/api/pay/wxpay/getBillStatus
     */
    public static WxBillInfoBiz getWxBillInfo(String mch_id, String date, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        WxBillInfoBiz wxBillInfoBiz = null;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(date)) {
                throw new PayException("查询日期不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("mch_id", mch_id);
            params.put("date", date);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.get(WxPayApiConfig.getWxBillInfoUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject json = jsonObject.getJSONObject("data");
            if (json == null) {
                throw new PayException("API结果数据转换错误");
            }
            wxBillInfoBiz = JSONObject.toJavaObject(json, WxBillInfoBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return wxBillInfoBiz;
    }

    /**
     * 下载对账单
     *
     * @param mch_id      微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param date        对账单日期，如：2020-01-23
     * @param end_date    对账单结束日期，如：2020-02-23
     * @param device_info 设备号或门店号
     * @param key         支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return WxDownloadBillBiz 对账单对象 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/downloadBill
     */
    public static WxDownloadBillBiz downloadBill(String mch_id, String date, String end_date, String device_info, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        WxDownloadBillBiz wxDownloadBillBiz = null;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(date)) {
                throw new PayException("日期不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("mch_id", mch_id);
            params.put("date", date);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if (!StrUtil.isBlank(end_date)) {
                params.put("end_date", end_date);
            }
            if (!StrUtil.isBlank(device_info)) {
                params.put("device_info", device_info);
            }
            params.put("sign", sign);
            String result = HttpRequest.get(WxPayApiConfig.getDownloadBillUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject dataJson = jsonObject.getJSONObject("data");
            if (dataJson == null) {
                return null;
            }
            wxDownloadBillBiz = JSON.toJavaObject(dataJson, WxDownloadBillBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return wxDownloadBillBiz;
    }

    /**
     * 查询微信支付投诉（内测接口，请勿使用）
     *
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param status       状态 0：待处理 1：已处理
     * @param order_no     系统单号
     * @param out_trade_no 商户单号
     * @param pay_no       支付单号
     * @param start_time   起始时间
     * @param end_time     结束时间
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     */
    public static void getComplaintList(String mch_id, String status, String order_no, String out_trade_no, String pay_no, String start_time, String end_time, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            params.put("mch_id", mch_id);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            if (!StrUtil.isBlank(status)) {
                params.put("status", status);
            }
            if (!StrUtil.isBlank(order_no)) {
                params.put("order_no", order_no);
            }
            if (!StrUtil.isBlank(out_trade_no)) {
                params.put("out_trade_no", out_trade_no);
            }
            if (!StrUtil.isBlank(pay_no)) {
                params.put("pay_no", pay_no);
            }
            if (!StrUtil.isBlank(start_time)) {
                params.put("start_time", start_time);
            }
            if (!StrUtil.isBlank(end_time)) {
                params.put("end_time", end_time);
            }
            String result = HttpRequest.get(WxPayApiConfig.getComplaintUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject dataJson = jsonObject.getJSONObject("data");
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
    }


    /**
     * 关闭订单
     *
     * @param out_trade_no 订单号 不可重复
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return 商户单号
     */
    public static String closeOrder(String out_trade_no, String mch_id, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String closeResult = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("mch_id", mch_id);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.closeOrderUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            closeResult = jsonObject.getString("data");
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return closeResult;
    }


    /**
     * 撤销订单
     *
     * @param out_trade_no 订单号 不可重复
     * @param mch_id       微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return 商户单号
     */
    public static String reverseOrder(String out_trade_no, String mch_id, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String reverseResult = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("订单号不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("mch_id", mch_id);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.post(WxPayApiConfig.reverseOrderUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            reverseResult = jsonObject.getString("data");
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return reverseResult;
    }

}
