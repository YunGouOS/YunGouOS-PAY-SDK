package com.yungouos.pay.merge;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.common.PayException;
import com.yungouos.pay.config.MergePayApiConfig;
import com.yungouos.pay.entity.BizParams;
import com.yungouos.pay.entity.CodePayBiz;
import com.yungouos.pay.util.PaySignUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * YunGouOS聚合支付
 *
 * @author YunGouOS技术部-029
 */
public class MergePay {

    /**
     * 一码付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       一码付商户号 登录YunGouOS.com-》聚合支付-》商户管理  查看商户号
     * @param body         商品描述
     * @param type         返回类型（1、返回一码付支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param return_url   同步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param key          支付密钥 登录YunGouOS.com-》聚合支付-》商户管理-》 支付密钥 查看密钥
     * @return 支付二维码连接
     */
    public static String nativePay(String out_trade_no, String total_fee, String mch_id, String body, String type, String attach, String notify_url, String return_url, String config_no, String auto,
                                   String auto_node, String key) throws PayException {
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
            params.put("attach", attach);
            params.put("notify_url", notify_url);
            params.put("return_url", return_url);
            params.put("config_no", config_no);
            params.put("auto", auto);
            params.put("auto_node", auto_node);
            params.put("sign", sign);
            String result = HttpRequest.post(MergePayApiConfig.nativePayUrl).form(params).execute().body();
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
     * 一码收
     * 文档地址：https://open.pay.yungouos.com/#/api/api/pay/merge/codePay
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       一码付商户号 登录YunGouOS.com-》聚合支付-》商户管理  查看商户号
     * @param body         商品描述
     * @param app_id       YunGouOS平台报备的app_id。
     * @param auth_code    支付授权码，通过设备读取用户微信、支付宝中的条码信息。
     * @param receipt      是否开具电子发票 0：否 1：是 默认0
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param bizParams    附加业务参数
     * @param key          支付密钥 登录YunGouOS.com-》聚合支付-》商户管理-》 支付密钥 查看密钥
     * @return
     */
    public static CodePayBiz codePay(String out_trade_no, String total_fee, String mch_id, String body, String app_id, String auth_code, String receipt, String attach, String notify_url, BizParams bizParams, String key) throws PayException {
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
            if (StrUtil.isBlank(app_id)) {
                throw new PayException("app_id不能为空！");
            }
            if (StrUtil.isBlank(auth_code)) {
                throw new PayException("auth_code不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("支付密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            params.put("app_id", app_id);
            params.put("auth_code", auth_code);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("receipt", receipt);
            params.put("attach", attach);
            params.put("notify_url", notify_url);
            if (bizParams != null) {
                JSONObject bizParamsJson = (JSONObject) JSON.toJSON(bizParams);
                if (bizParamsJson != null) {
                    params.put("biz_params", bizParamsJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(MergePayApiConfig.codePayUrl).form(params).execute().body();
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
}
