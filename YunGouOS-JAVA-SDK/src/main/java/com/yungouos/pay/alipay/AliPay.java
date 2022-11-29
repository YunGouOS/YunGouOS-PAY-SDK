package com.yungouos.pay.alipay;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.common.PayException;
import com.yungouos.pay.config.AlipayApiConfig;
import com.yungouos.pay.entity.*;
import com.yungouos.pay.util.PaySignUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * YunGouOS支付宝支付API接口对接
 *
 * @author YunGouOS技术部-029
 */
public class AliPay {

    /**
     * 付款码支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param body         商品描述
     * @param auth_code    扫码支付授权码，设备读取用户支付宝中的条码或者二维码信息
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param hbFqBiz      花呗分期业务对象
     * @param key          支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return 支付结果对象 参考：https://open.pay.yungouos.com/#/api/api/pay/alipay/codePay
     */
    public static AliPayCodePayBiz codePay(String out_trade_no, String total_fee, String mch_id, String body, String auth_code,String app_id,String attach, String notify_url, String config_no, String auto,
                                           String auto_node, HbFqBiz hbFqBiz, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        AliPayCodePayBiz aliPayCodePayBiz = null;
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
            if (StrUtil.isBlank(auth_code)) {
                throw new PayException("授权码不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("auth_code", auth_code);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if(!StrUtil.isBlank(app_id)){
                params.put("app_id", app_id);
            }
            if(!StrUtil.isBlank(attach)){
                params.put("attach", attach);
            }
            if(!StrUtil.isBlank(notify_url)){
                params.put("notify_url", notify_url);
            }
            if(!StrUtil.isBlank(config_no)){
                params.put("config_no", config_no);
            }
            if(!StrUtil.isBlank(auto)){
                params.put("auto", auto);
            }
            if(!StrUtil.isBlank(auto_node)){
                params.put("auto_node", auto_node);
            }
            if (hbFqBiz != null) {
                JSONObject hbfqJson = (JSONObject) JSON.toJSON(hbFqBiz);
                if (hbfqJson != null) {
                    params.put("hb_fq", hbfqJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(AlipayApiConfig.codePayUrl).form(params).execute().body();
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
                throw new PayException("API结果为空");
            }
            aliPayCodePayBiz = JSONObject.toJavaObject(data, AliPayCodePayBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return aliPayCodePayBiz;
    }

    /**
     * 支付宝扫码支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param body         商品描述
     * @param type         返回类型（1、返回支付宝原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param hbFqBiz      花呗分期业务对象
     * @param key          支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return 支付二维码连接
     */
    public static String nativePay(String out_trade_no, String total_fee, String mch_id, String body, String type, String app_id,String attach, String notify_url, String config_no, String auto, String auto_node,
                                   HbFqBiz hbFqBiz, String key) throws PayException {
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
                throw new PayException("商户密钥不能为空！");
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

            if(!StrUtil.isBlank(app_id)){
                params.put("app_id", app_id);
            }
            if(!StrUtil.isBlank(attach)){
                params.put("attach", attach);
            }
            if(!StrUtil.isBlank(notify_url)){
                params.put("notify_url", notify_url);
            }
            if(!StrUtil.isBlank(config_no)){
                params.put("config_no", config_no);
            }
            if(!StrUtil.isBlank(auto)){
                params.put("auto", auto);
            }
            if(!StrUtil.isBlank(auto_node)){
                params.put("auto_node", auto_node);
            }
            if (hbFqBiz != null) {
                JSONObject hbfqJson = (JSONObject) JSON.toJSON(hbFqBiz);
                if (hbfqJson != null) {
                    params.put("hb_fq", hbfqJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(AlipayApiConfig.nativePayUrl).form(params).execute().body();
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
     * WAP支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param body         商品描述
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param hbFqBiz      花呗分期业务对象
     * @param key          支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return wap支付连接，重定向到该地址自动打开支付APP付款
     */
    public static String wapPay(String out_trade_no, String total_fee, String mch_id, String body, String app_id,String attach, String notify_url, String config_no, String auto, String auto_node, HbFqBiz hbFqBiz,
                                String key) throws PayException {
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
                throw new PayException("商户密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if(!StrUtil.isBlank(app_id)){
                params.put("app_id", app_id);
            }
            if(!StrUtil.isBlank(attach)){
                params.put("attach", attach);
            }
            if(!StrUtil.isBlank(notify_url)){
                params.put("notify_url", notify_url);
            }
            if(!StrUtil.isBlank(config_no)){
                params.put("config_no", config_no);
            }
            if(!StrUtil.isBlank(auto)){
                params.put("auto", auto);
            }
            if(!StrUtil.isBlank(auto_node)){
                params.put("auto_node", auto_node);
            }
            if (hbFqBiz != null) {
                JSONObject hbfqJson = (JSONObject) JSON.toJSON(hbFqBiz);
                if (hbfqJson != null) {
                    params.put("hb_fq", hbfqJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(AlipayApiConfig.wapPayUrl).form(params).execute().body();
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
     * JS支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param buyer_id     买家的支付宝唯一用户号（2088开头的16位纯数字）
     * @param body         商品描述
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param hbFqBiz      花呗分期业务对象
     * @param key          支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return 支付宝JSSDK所需的对象数据 参考：https://open.pay.yungouos.com/#/api/api/pay/alipay/jsPay
     */
    public static AliPayJsPayBiz jsPay(String out_trade_no, String total_fee, String mch_id, String buyer_id, String body, String app_id,String attach, String notify_url, String config_no, String auto,
                                       String auto_node, HbFqBiz hbFqBiz, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        AliPayJsPayBiz aliPayJsPayBiz = null;
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
            if (StrUtil.isBlank(buyer_id)) {
                throw new PayException("买家ID不能为空！");
            }
            if (StrUtil.isBlank(body)) {
                throw new PayException("商品描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("buyer_id", buyer_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);

            if(!StrUtil.isBlank(app_id)){
                params.put("app_id", app_id);
            }
            if(!StrUtil.isBlank(attach)){
                params.put("attach", attach);
            }
            if(!StrUtil.isBlank(notify_url)){
                params.put("notify_url", notify_url);
            }
            if(!StrUtil.isBlank(config_no)){
                params.put("config_no", config_no);
            }
            if(!StrUtil.isBlank(auto)){
                params.put("auto", auto);
            }
            if(!StrUtil.isBlank(auto_node)){
                params.put("auto_node", auto_node);
            }
            if (hbFqBiz != null) {
                JSONObject hbfqJson = (JSONObject) JSON.toJSON(hbFqBiz);
                if (hbfqJson != null) {
                    params.put("hb_fq", hbfqJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(AlipayApiConfig.jsPayUrl).form(params).execute().body();
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
                throw new PayException("API结果为空");
            }
            aliPayJsPayBiz = JSONObject.toJavaObject(data, AliPayJsPayBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return aliPayJsPayBiz;
    }

    /**
     * H5支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param body         商品描述
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param return_url   同步回调地址，用户支付成功后或取消支付都会跳转回到该地址
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param hbFqBiz      花呗分期业务对象
     * @param key          支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return 拉起H5页面的form表单
     */
    public static AliPayH5Biz h5Pay(String out_trade_no, String total_fee, String mch_id, String body, String app_id,String attach, String notify_url, String return_url, String config_no, String auto,
                                    String auto_node, HbFqBiz hbFqBiz, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        AliPayH5Biz aliPayH5Biz = null;
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
                throw new PayException("商户密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);

            if(!StrUtil.isBlank(app_id)){
                params.put("app_id", app_id);
            }
            if(!StrUtil.isBlank(attach)){
                params.put("attach", attach);
            }
            if(!StrUtil.isBlank(notify_url)){
                params.put("notify_url", notify_url);
            }
            if(!StrUtil.isBlank(return_url)){
                params.put("return_url", return_url);
            }
            if(!StrUtil.isBlank(config_no)){
                params.put("config_no", config_no);
            }
            if(!StrUtil.isBlank(auto)){
                params.put("auto", auto);
            }
            if(!StrUtil.isBlank(auto_node)){
                params.put("auto_node", auto_node);
            }

            if (hbFqBiz != null) {
                JSONObject hbfqJson = (JSONObject) JSON.toJSON(hbFqBiz);
                if (hbfqJson != null) {
                    params.put("hb_fq", hbfqJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(AlipayApiConfig.h5PayUrl).form(params).execute().body();
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
                throw new PayException("API结果为空");
            }
            aliPayH5Biz = JSON.toJavaObject(data, AliPayH5Biz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return aliPayH5Biz;
    }

    /**
     * APP支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param body         商品描述
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param hbFqBiz      花呗分期业务对象
     * @param key          支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return APP支付所需的参数
     */
    public static String appPay(String out_trade_no, String total_fee, String mch_id, String body, String app_id,String attach, String notify_url, String config_no, String auto, String auto_node, HbFqBiz hbFqBiz,
                                String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String appParams = null;
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
                throw new PayException("商户密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if(!StrUtil.isBlank(app_id)){
                params.put("app_id", app_id);
            }
            if(!StrUtil.isBlank(attach)){
                params.put("attach", attach);
            }
            if(!StrUtil.isBlank(notify_url)){
                params.put("notify_url", notify_url);
            }
            if(!StrUtil.isBlank(config_no)){
                params.put("config_no", config_no);
            }
            if(!StrUtil.isBlank(auto)){
                params.put("auto", auto);
            }
            if(!StrUtil.isBlank(auto_node)){
                params.put("auto_node", auto_node);
            }
            if (hbFqBiz != null) {
                JSONObject hbfqJson = (JSONObject) JSON.toJSON(hbFqBiz);
                if (hbfqJson != null) {
                    params.put("hb_fq", hbfqJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(AlipayApiConfig.appPayUrl).form(params).execute().body();
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
            appParams = jsonObject.getString("data");
            if (StrUtil.isBlank(appParams)) {
                throw new PayException("APP下单失败");
            }
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return appParams;
    }


    /**
     * 电脑网站支付
     *
     * @param out_trade_no 订单号 不可重复
     * @param total_fee    支付金额 单位：元 范围：0.01-99999
     * @param mch_id       支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param body         商品描述
     * @param app_id       在YunGouOS平台报备的app_id，不传则按照商户号开户时的场景发起。
     * @param attach       附加数据 回调时原路返回 可不传
     * @param notify_url   异步回调地址，不传无回调
     * @param return_url   同步回调地址，用户支付成功后或取消支付都会跳转回到该地址
     * @param config_no    分账配置单号。支持多个分账，使用,号分割
     * @param auto         自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
     * @param auto_node    执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
     * @param hbFqBiz      花呗分期业务对象
     * @param key          支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return 电脑网站支付对象，文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/webPay
     */
    public static AliPayWebPayBiz webPay(String out_trade_no, String total_fee, String mch_id, String body, String app_id,String attach, String notify_url, String return_url, String config_no, String auto, String auto_node, HbFqBiz hbFqBiz,
                                         String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        AliPayWebPayBiz aliPayWebPayBiz = null;
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
                throw new PayException("商户密钥不能为空！");
            }
            params.put("out_trade_no", out_trade_no);
            params.put("total_fee", total_fee);
            params.put("mch_id", mch_id);
            params.put("body", body);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            if(!StrUtil.isBlank(app_id)){
                params.put("app_id", app_id);
            }
            if(!StrUtil.isBlank(attach)){
                params.put("attach", attach);
            }
            if(!StrUtil.isBlank(notify_url)){
                params.put("notify_url", notify_url);
            }
            if(!StrUtil.isBlank(return_url)){
                params.put("return_url", return_url);
            }
            if(!StrUtil.isBlank(config_no)){
                params.put("config_no", config_no);
            }
            if(!StrUtil.isBlank(auto)){
                params.put("auto", auto);
            }
            if(!StrUtil.isBlank(auto_node)){
                params.put("auto_node", auto_node);
            }
            if (hbFqBiz != null) {
                JSONObject hbfqJson = (JSONObject) JSON.toJSON(hbFqBiz);
                if (hbfqJson != null) {
                    params.put("hb_fq", hbfqJson.toJSONString());
                }
            }
            params.put("sign", sign);
            String result = HttpRequest.post(AlipayApiConfig.webPayUrl).form(params).execute().body();
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
                throw new PayException("API结果为空");
            }
            aliPayWebPayBiz = JSON.toJavaObject(data, AliPayWebPayBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return aliPayWebPayBiz;
    }

    /**
     * 关闭订单
     *
     * @param out_trade_no 订单号 不可重复
     * @param mch_id       支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param key          支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
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
            String result = HttpRequest.post(AlipayApiConfig.closeOrderUrl).form(params).execute().body();
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
     * @param mch_id       支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param key          支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return 支付宝撤销订单对象，文档地址：https://open.pay.yungouos.com/#/api/api/pay/alipay/reverseOrder
     */
    public static AliPayReverseOrderBiz reverseOrder(String out_trade_no, String mch_id, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        AliPayReverseOrderBiz aliPayReverseOrderBiz = null;
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
            String result = HttpRequest.post(AlipayApiConfig.reverseOrderUrl).form(params).execute().body();
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
                throw new PayException("API结果为空");
            }
            aliPayReverseOrderBiz = JSON.toJavaObject(data, AliPayReverseOrderBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return aliPayReverseOrderBiz;
    }

    /**
     * 订单退款
     *
     * @param out_trade_no        订单号
     * @param mch_id              支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param money               退款金额
     * @param out_trade_refund_no 商户系统内的退款单号（不可重复），传递该参数情况下，查询退款接口可以通过该参数查询
     * @param refund_desc         退款描述
     * @param notify_url          退款成功异步回调地址
     * @param key                 支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return refundOrder 退款订单对象 参考文档：http://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder
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
                throw new PayException("商户密钥不能为空！");
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
            String result = HttpRequest.post(AlipayApiConfig.refundOrderUrl).form(params).execute().body();
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
     * @param mch_id    支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
     * @param key       支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return RefundSearch 退款结果对象，参考文档 http://open.pay.yungouos.com/#/api/api/pay/alipay/getRefundResult
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
                throw new PayException("商户密钥不能为空！");
            }
            params.put("refund_no", refund_no);
            params.put("mch_id", mch_id);
            // 上述必传参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.get(AlipayApiConfig.getRefundResultUrl).form(params).execute().body();
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

}
