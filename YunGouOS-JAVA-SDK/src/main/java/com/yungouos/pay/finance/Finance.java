package com.yungouos.pay.finance;

import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.common.PayException;
import com.yungouos.pay.config.FinanceConfig;
import com.yungouos.pay.entity.AllocateResultBiz;
import com.yungouos.pay.entity.ProfitSharingInfo;
import com.yungouos.pay.entity.RePayBiz;
import com.yungouos.pay.entity.batchpay.AccountBiz;
import com.yungouos.pay.entity.batchpay.BatchPayBiz;
import com.yungouos.pay.entity.batchpay.BatchPayInfoBiz;
import com.yungouos.pay.util.PaySignUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * YunGouOS资金管理接口
 *
 * @author YunGouOS技术部-029
 */
public class Finance {

    /**
     * 微信支付配置分账，添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
     *
     * @param mch_id          分账方支付商户号
     * @param appId           自定义appId，如果传递了该参数则openId必须是通过该appId获取
     * @param reason          分账原因
     * @param openId          分账收款方的openId，通过授权接口获得。 优先级：高
     * @param receiver_mch_id 分账收款方的商户号。 优先级：低
     * @param name            分账收款方姓名或商户号主体名称。传递了则校验
     * @param rate            分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
     * @param money           固定分账金额。每笔订单固定分账金额，优先级次于rate参数
     * @param key             支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return String 配置单号
     */
    public static String wxPayConfig(String mch_id, String appId, String reason, String openId, String receiver_mch_id, String name, String rate, String money, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String configNo = null;
        String channel = "wxpay";
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(reason)) {
                throw new PayException("分账原因不能为空！");
            }
            // 收款方账户信息验证
            if (StrUtil.isBlank(openId) && StrUtil.isBlank(receiver_mch_id)) {
                throw new PayException("分账收款方openId、收款商户号不能同时为空！");
            }

            // 设置了比例 验证比例
            if (!StrUtil.isBlank(rate)) {
                if (!NumberUtil.isNumber(rate)) {
                    throw new PayException("分账比例不是合法的数字类型！");
                }
            }
            // 设置了金额 验证金额
            if (!StrUtil.isBlank(money)) {
                if (!NumberUtil.isNumber(money)) {
                    throw new PayException("固定分账金额不是合法的数字类型！");
                }
            }

            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            params.put("mch_id", mch_id);
            params.put("reason", reason);
            params.put("channel", channel);
            if (!StrUtil.isBlank(openId)) {
                // 设置了openId参数，参与签名
                params.put("openId", openId);
            }
            if (!StrUtil.isBlank(receiver_mch_id)) {
                // 设置了receiver_mch_id参数，参与签名
                params.put("receiver_mch_id", receiver_mch_id);
            }
            if (!StrUtil.isBlank(name)) {
                // 设置了name参数，参与签名
                params.put("name", name);
            }
            if (!StrUtil.isBlank(rate)) {
                // 设置了rate参数，参与签名
                params.put("rate", rate);
            }
            if (!StrUtil.isBlank(money)) {
                // 设置了money参数，参与签名
                params.put("money", money);
            }
            // 上述参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            // 不参与签名
            if (!StrUtil.isBlank(appId)) {
                params.put("appId", appId);
            }
            String result = HttpRequest.post(FinanceConfig.getConfigUrl).form(params).execute().body();
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
            configNo = jsonObject.getString("data");
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return configNo;
    }

    /**
     * 支付宝配置分账，添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
     *
     * @param mch_id  分账方支付商户号
     * @param reason  分账原因
     * @param account 分账收款方的支付宝账户
     * @param name    分账收款方姓名
     * @param rate    分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
     * @param money   固定分账金额。每笔订单固定分账金额，优先级次于rate参数
     * @param key     支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
     * @return String 配置单号
     */
    public static String aliPayConfig(String mch_id, String reason, String account, String name, String rate, String money, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String configNo = null;
        String channel = "alipay";
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(reason)) {
                throw new PayException("分账原因不能为空！");
            }
            if (StrUtil.isBlank(account)) {
                throw new PayException("分账收款方支付宝账户不能为空！");
            }
            if (StrUtil.isBlank(name)) {
                throw new PayException("分账收款方支付宝姓名不能为空！");
            }

            // 设置了比例 验证比例
            if (!StrUtil.isBlank(rate)) {
                if (!NumberUtil.isNumber(rate)) {
                    throw new PayException("分账比例不是合法的数字类型！");
                }
            }
            // 设置了金额 验证金额
            if (!StrUtil.isBlank(money)) {
                if (!NumberUtil.isNumber(money)) {
                    throw new PayException("固定分账金额不是合法的数字类型！");
                }
            }

            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            params.put("mch_id", mch_id);
            params.put("reason", reason);
            params.put("channel", channel);
            params.put("account", account);
            params.put("name", name);
            if (!StrUtil.isBlank(rate)) {
                // 设置了rate参数，参与签名
                params.put("rate", rate);
            }
            if (!StrUtil.isBlank(money)) {
                // 设置了money参数，参与签名
                params.put("money", money);
            }
            // 上述参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.post(FinanceConfig.getConfigUrl).form(params).execute().body();
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
            configNo = jsonObject.getString("data");
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return configNo;
    }

    /**
     * （接口已升级，建议使用wxPayConfig或aliPayConfig方法）
     * <p>
     * 配置分账，添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
     *
     * @param mch_id          分账方支付商户号
     * @param appId           自定义appId，如果传递了该参数则openId必须是通过该appId获取
     * @param reason          分账原因
     * @param channel         分账渠道
     * @param openId          分账收款方的openId，通过授权接口获得。 优先级：高
     * @param receiver_mch_id 分账收款方的商户号。 优先级：低
     * @param name            分账收款方姓名或商户号主体名称。传递了则校验
     * @param rate            分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
     * @param money           固定分账金额。每笔订单固定分账金额，优先级次于rate参数
     * @param key             支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return String 配置单号
     */
    @Deprecated
    public static String configV2(String mch_id, String appId, String reason, String channel, String openId, String receiver_mch_id, String name, String rate, String money, String key)
            throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String configNo = null;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(reason)) {
                throw new PayException("分账原因不能为空！");
            }
            if (StrUtil.isBlank(channel)) {
                throw new PayException("分账渠道不能为空！");
            }

            // 验证渠道
            List<String> channelList = new ArrayList<String>();
            channelList.add("wxpay");
            channelList.add("alipay");
            if (!channelList.contains(channel)) {
                throw new PayException("分账渠道参数不合法！参考值：" + channelList.toString());
            }

            // 收款方账户信息验证
            if (StrUtil.isBlank(openId) && StrUtil.isBlank(receiver_mch_id)) {
                throw new PayException("分账收款方openId、收款帐号、收款商户号不能同时为空！");
            }

            // 设置了比例 验证比例
            if (!StrUtil.isBlank(rate)) {
                if (!NumberUtil.isNumber(rate)) {
                    throw new PayException("分账比例不是合法的数字类型！");
                }
            }
            // 设置了金额 验证金额
            if (!StrUtil.isBlank(money)) {
                if (!NumberUtil.isNumber(money)) {
                    throw new PayException("固定分账金额不是合法的数字类型！");
                }
            }

            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            params.put("mch_id", mch_id);
            params.put("reason", reason);
            params.put("channel", channel);
            if (!StrUtil.isBlank(openId)) {
                // 设置了openId参数，参与签名
                params.put("openId", openId);
            }
            if (!StrUtil.isBlank(receiver_mch_id)) {
                // 设置了receiver_mch_id参数，参与签名
                params.put("receiver_mch_id", receiver_mch_id);
            }
            if (!StrUtil.isBlank(name)) {
                // 设置了name参数，参与签名
                params.put("name", name);
            }
            if (!StrUtil.isBlank(rate)) {
                // 设置了rate参数，参与签名
                params.put("rate", rate);
            }
            if (!StrUtil.isBlank(money)) {
                // 设置了money参数，参与签名
                params.put("money", money);
            }
            // 上述参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            // 不参与签名
            if (!StrUtil.isBlank(appId)) {
                params.put("appId", appId);
            }
            String result = HttpRequest.post(FinanceConfig.getConfigUrl).form(params).execute().body();
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
            configNo = jsonObject.getString("data");
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return configNo;
    }

    /**
     * （接口已升级，建议使用wxPayConfig或aliPayConfig方法）
     * <p>
     * 配置分账，添加分账收款方的账户信息。使用该功能请仔细阅读注意事项。文档地址：https://open.pay.yungouos.com/#/api/api/finance/profitsharing/config
     *
     * @param mch_id          分账方支付商户号
     * @param reason          分账原因
     * @param channel         分账渠道
     * @param openId          分账收款方的openId，通过授权接口获得。 优先级：高
     * @param account         分账收款方的微信账户或支付宝账户，打开微信-》我 查看微信号。 优先级：中
     * @param receiver_mch_id 分账收款方的商户号。 优先级：低
     * @param name            分账收款方姓名。当传递了account参数时，该参数必填，且需要与account对应的微信实名信息一致
     * @param rate            分账比例。如：10 则代表分账比例是订单金额的10% 优先级高于money参数
     * @param money           固定分账金额。每笔订单固定分账金额，优先级次于rate参数
     * @param key             支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return String 配置单号
     */
    @Deprecated
    public static String config(String mch_id, String reason, String channel, String openId, String account, String receiver_mch_id, String name, String rate, String money, String key)
            throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String configNo = null;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(reason)) {
                throw new PayException("分账原因不能为空！");
            }
            if (StrUtil.isBlank(channel)) {
                throw new PayException("分账渠道不能为空！");
            }

            // 验证渠道
            List<String> channelList = new ArrayList<String>();
            channelList.add("wxpay");
            channelList.add("alipay");
            if (!channelList.contains(channel)) {
                throw new PayException("分账渠道参数不合法！参考值：" + channelList.toString());
            }

            // 收款方账户信息验证
            if (StrUtil.isBlank(openId) && StrUtil.isBlank(account) && StrUtil.isBlank(receiver_mch_id)) {
                throw new PayException("分账收款方openId、收款帐号、收款商户号不能同时为空！");
            }

            // 收款方姓名验证
            if (!StrUtil.isBlank(account) && StrUtil.isBlank(name)) {
                throw new PayException("分账收款方为帐号类型，分账收款方姓名不能为空！");
            }

            // 设置了比例 验证比例
            if (!StrUtil.isBlank(rate)) {
                if (!NumberUtil.isNumber(rate)) {
                    throw new PayException("分账比例不是合法的数字类型！");
                }
            }
            // 设置了金额 验证金额
            if (!StrUtil.isBlank(money)) {
                if (!NumberUtil.isNumber(money)) {
                    throw new PayException("固定分账金额不是合法的数字类型！");
                }
            }

            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            params.put("mch_id", mch_id);
            params.put("reason", reason);
            params.put("channel", channel);
            if (!StrUtil.isBlank(openId)) {
                // 设置了openId参数，参与签名
                params.put("openId", openId);
            }
            if (!StrUtil.isBlank(account)) {
                // 设置了account参数，参与签名
                params.put("account", account);
            }
            if (!StrUtil.isBlank(receiver_mch_id)) {
                // 设置了receiver_mch_id参数，参与签名
                params.put("receiver_mch_id", receiver_mch_id);
            }
            if (!StrUtil.isBlank(name)) {
                // 设置了name参数，参与签名
                params.put("name", name);
            }
            if (!StrUtil.isBlank(rate)) {
                // 设置了rate参数，参与签名
                params.put("rate", rate);
            }
            if (!StrUtil.isBlank(money)) {
                // 设置了money参数，参与签名
                params.put("money", money);
            }
            // 上述参数签名
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.post(FinanceConfig.getConfigUrl).form(params).execute().body();
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
            configNo = jsonObject.getString("data");
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return configNo;
    }

    /**
     * 生成分账账单。对已支付的订单，生成分账账单，后续通过发起分账接口进行分账操作。文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/createBill
     *
     * @param mch_id       分账方支付商户号
     * @param out_trade_no 商户单号 （需要分账的订单号）
     * @param config_no    配置单号（分账收款人配置单号，支持多个 使用,号分割）
     * @param rate         分账比例。该优先级比配置单号中的比例优先级高，如果传递了该参数则以改参数值进行计算分账金额。优先级高于money参数
     * @param money        分账金额。该优先级比配置单号中的比例优先级高，如果传递了该参数则分账金额就为该参数。优先级次于rate参数
     * @param notify_url   异步回调地址，分账完成后将分账结果发送到该地址，不填则无回调
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return List 配置单号列表
     */
    public static List<String> createBill(String mch_id, String out_trade_no, String config_no, String rate, String money, String notify_url, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        List<String> list = null;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("商户单号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("mch_id", mch_id);
            params.put("out_trade_no", out_trade_no);
            String sign = PaySignUtil.createSign(params, key);
            params.put("config_no", config_no);
            params.put("sign", sign);

            if (!StrUtil.isBlank(rate)) {
                params.put("rate", rate);
            }
            if (!StrUtil.isBlank(money)) {
                params.put("money", money);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            String result = HttpRequest.post(FinanceConfig.getCreateBillUrl).form(params).execute().body();
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
            JSONArray jsonArray = jsonObject.getJSONArray("data");
            if (jsonArray != null) {
                list = JSONObject.toJavaObject(jsonArray, List.class);
            }
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return list;
    }

    /**
     * 生成分账账单。对已支付的订单，生成分账账单，后续通过发起分账接口进行分账操作。文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/createBill
     *
     * @param mch_id       分账方支付商户号
     * @param out_trade_no 商户单号 （需要分账的订单号）
     * @param config_no    配置单号（分账收款人配置单号，支持多个 使用,号分割）
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return List 配置单号列表
     */
    @Deprecated
    public static List<String> createBill(String mch_id, String out_trade_no, String config_no, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        List<String> list = null;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("商户单号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("mch_id", mch_id);
            params.put("out_trade_no", out_trade_no);
            String sign = PaySignUtil.createSign(params, key);
            params.put("config_no", config_no);
            params.put("sign", sign);
            String result = HttpRequest.post(FinanceConfig.getCreateBillUrl).form(params).execute().body();
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
            JSONArray jsonArray = jsonObject.getJSONArray("data");
            if (jsonArray != null) {
                list = JSONObject.toJavaObject(jsonArray, List.class);
            }
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return list;
    }

    /**
     * 分账支付。对已支付的订单，生成分账账单，后续通过发起分账接口进行分账操作。文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/sendPay
     *
     * @param mch_id      分账方支付商户号
     * @param ps_no       分账单号
     * @param description 分账描述
     * @param key         支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return boolean 是否成功
     */
    public static boolean sendPay(String mch_id, String ps_no, String description, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        boolean falg = false;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(ps_no)) {
                throw new PayException("分账单号不能为空！");
            }
            if (StrUtil.isBlank(description)) {
                throw new PayException("分账描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("mch_id", mch_id);
            params.put("ps_no", ps_no);
            params.put("description", description);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.post(FinanceConfig.getSendPayUrl).form(params).execute().body();
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
            falg = true;
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return falg;
    }

    /**
     * 查询分账信息。文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/getInfo
     *
     * @param mch_id 分账方支付商户号
     * @param ps_no  分账单号
     * @param key    支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return ProfitSharingInfo 分账对象，文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/getInfo
     */
    public static ProfitSharingInfo getInfo(String mch_id, String ps_no, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        ProfitSharingInfo profitSharingInfo = null;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(ps_no)) {
                throw new PayException("分账单号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("mch_id", mch_id);
            params.put("ps_no", ps_no);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.get(FinanceConfig.getPayResultUrl).form(params).execute().body();
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
            JSONObject json = (JSONObject) jsonObject.get("data");
            if (json == null) {
                throw new PayException("查询结果转换失败！");
            }
            profitSharingInfo = JSONObject.toJavaObject(json, ProfitSharingInfo.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return profitSharingInfo;
    }

    /**
     * 该方法已作废，请使用 getInfo方法
     * <p>
     * 查询分账支付结果。文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/getPayResult
     *
     * @param mch_id 分账方支付商户号
     * @param ps_no  分账单号
     * @param key    支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return String 配置单号
     */
    @Deprecated
    public static AllocateResultBiz getPayResult(String mch_id, String ps_no, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        AllocateResultBiz allocateResultBiz = null;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(ps_no)) {
                throw new PayException("分账单号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("mch_id", mch_id);
            params.put("ps_no", ps_no);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.get(FinanceConfig.getPayResultUrl).form(params).execute().body();
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
            JSONObject json = (JSONObject) jsonObject.get("data");
            if (json == null) {
                throw new PayException("查询结果转换失败！");
            }
            allocateResultBiz = JSONObject.toJavaObject(json, AllocateResultBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return allocateResultBiz;
    }

    /**
     * 完结分账。由于分账属性的订单，微信进行了冻结资金不结算的操作，故在分账完成或需解冻该订单款项需调用该接口。成功后金额解冻可正常结算。
     * <p>
     * 文档地址：https://api.pay.yungouos.com/api/finance/profitsharing/finish
     *
     * @param mch_id       分账方支付商户号
     * @param out_trade_no 商户单号
     * @param key          支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
     * @return boolean 是否成功
     */
    public static boolean finish(String mch_id, String out_trade_no, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        boolean flag = false;
        try {
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("商户号不能为空！");
            }
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("商户单号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("mch_id", mch_id);
            params.put("out_trade_no", out_trade_no);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.post(FinanceConfig.getFinishUrl).form(params).execute().body();
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
            flag = true;
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return flag;
    }

    /**
     * 转账到微信零钱
     * <p>
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/wxpay
     *
     * @param merchant_id  YunGouOS商户ID 登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
     * @param out_trade_no 商户单号
     * @param account      收款账户openid
     * @param account_name 收款方真实姓名
     * @param money        付款金额。单位：元（范围：1~5000）
     * @param desc         付款描述
     * @param mch_id       付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传
     * @param notify_url   异步回调地址。传递后会将转账结果发送到该地址，不传则无回调。
     * @param key          商户密钥 登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
     * @return RePayBiz 参考文档：https://open.pay.yungouos.com/#/api/api/finance/repay/wxpay
     */
    public static RePayBiz rePayWxPay(String merchant_id, String out_trade_no, String account, String account_name, String money, String desc, String mch_id, String notify_url, String key)
            throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        RePayBiz rePayBiz = null;
        try {
            if (StrUtil.isBlank(merchant_id)) {
                throw new PayException("YunGouOS商户ID不能为空！");
            }
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("商户单号不能为空！");
            }
            if (StrUtil.isBlank(account)) {
                throw new PayException("收款账户openid不能为空！");
            }
            if (StrUtil.isBlank(money)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(desc)) {
                throw new PayException("付款描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("merchant_id", merchant_id);
            params.put("out_trade_no", out_trade_no);
            params.put("account", account);
            params.put("money", money);
            params.put("desc", desc);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            // 不需要参与签名的参数
            if (!StrUtil.isBlank(account_name)) {
                params.put("account_name", account_name);
            }
            if (!StrUtil.isBlank(mch_id)) {
                params.put("mch_id", mch_id);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            String result = HttpRequest.post(FinanceConfig.getRePayWxPayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (code == null || 0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject json = (JSONObject) jsonObject.get("data");
            if (json == null) {
                throw new PayException("查询结果转换失败！");
            }
            rePayBiz = JSONObject.toJavaObject(json, RePayBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return rePayBiz;
    }

    /**
     * 转账到支付宝余额
     * <p>
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/alipay
     *
     * @param merchant_id  YunGouOS商户ID 登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
     * @param out_trade_no 商户单号
     * @param account      收款支付宝账户
     * @param account_name 收款方真实姓名
     * @param money        付款金额。单位：元（范围：1~5000）
     * @param desc         付款描述
     * @param mch_id       付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传
     * @param notify_url   异步回调地址。传递后会将转账结果发送到该地址，不传则无回调。
     * @param key          商户密钥 登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
     * @return RePayBiz 参考文档：https://open.pay.yungouos.com/#/api/api/finance/repay/alipay
     */
    public static RePayBiz rePayAliPay(String merchant_id, String out_trade_no, String account, String account_name, String money, String desc, String mch_id, String notify_url, String key)
            throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        RePayBiz rePayBiz = null;
        try {
            if (StrUtil.isBlank(merchant_id)) {
                throw new PayException("YunGouOS商户ID不能为空！");
            }
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("商户单号不能为空！");
            }
            if (StrUtil.isBlank(account)) {
                throw new PayException("收款支付宝账户不能为空！");
            }
            if (StrUtil.isBlank(account_name)) {
                throw new PayException("收款支付宝姓名不能为空！");
            }
            if (StrUtil.isBlank(money)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(desc)) {
                throw new PayException("付款描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("merchant_id", merchant_id);
            params.put("out_trade_no", out_trade_no);
            params.put("account", account);
            params.put("account_name", account_name);
            params.put("money", money);
            params.put("desc", desc);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            // 不需要参与签名的参数
            if (!StrUtil.isBlank(mch_id)) {
                params.put("mch_id", mch_id);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            String result = HttpRequest.post(FinanceConfig.getRePayAliPayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (code == null || 0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject json = (JSONObject) jsonObject.get("data");
            if (json == null) {
                throw new PayException("查询结果转换失败！");
            }
            rePayBiz = JSONObject.toJavaObject(json, RePayBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return rePayBiz;
    }

    /**
     * 给指定银行卡进行转账。支持对私、对公转账
     * <p>
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/bank
     *
     * @param merchant_id  YunGouOS商户ID 登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
     * @param out_trade_no 商户单号
     * @param account      银行卡号
     * @param account_name 银行卡姓名
     * @param money        付款金额。单位：元（范围：1~5000）
     * @param desc         付款描述
     * @param bank_type    银行卡类型【0：对私、1：对公】不传默认0
     * @param bank_name    银行名称。对公情况下必传
     * @param bank_code    银行支行联行号。对公情况下必传
     * @param mch_id       付款商户号。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传（仅限支付宝商户）
     * @param app_id       付款商户号绑定APPID。自有商户接入的开通了代付权限的可以使用，如果使用YunGouOS代付体系可不传（仅限支付宝商户）
     * @param notify_url   异步回调地址。传递后会将转账结果发送到该地址，不传则无回调。
     * @param key          商户密钥 登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
     * @return RePayBiz 参考文档：https://open.pay.yungouos.com/#/api/api/finance/repay/bank
     */
    public static RePayBiz rePayBank(String merchant_id, String out_trade_no, String account, String account_name, String money, String desc, Integer bank_type, String bank_name, String bank_code,
                                     String mch_id, String app_id, String notify_url, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        RePayBiz rePayBiz = null;
        try {
            if (StrUtil.isBlank(merchant_id)) {
                throw new PayException("YunGouOS商户ID不能为空！");
            }
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("商户单号不能为空！");
            }
            if (StrUtil.isBlank(account)) {
                throw new PayException("银行卡号不能为空！");
            }
            if (StrUtil.isBlank(account_name)) {
                throw new PayException("银行卡姓名不能为空！");
            }
            if (StrUtil.isBlank(money)) {
                throw new PayException("付款金额不能为空！");
            }
            if (StrUtil.isBlank(desc)) {
                throw new PayException("付款描述不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("merchant_id", merchant_id);
            params.put("out_trade_no", out_trade_no);
            params.put("account", account);
            params.put("account_name", account_name);
            params.put("money", money);
            params.put("desc", desc);
            if (!StrUtil.isBlank(bank_name)) {
                params.put("bank_name", bank_name);
            }
            if (!StrUtil.isBlank(bank_code)) {
                params.put("bank_code", bank_code);
            }
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            // 不需要参与签名的参数
            if (bank_type != null) {
                params.put("bank_type", bank_type);
            }
            if (!StrUtil.isBlank(mch_id)) {
                params.put("mch_id", mch_id);
            }
            if (!StrUtil.isBlank(app_id)) {
                params.put("app_id", app_id);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            String result = HttpRequest.post(FinanceConfig.getRePayBankUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (code == null || 0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject json = (JSONObject) jsonObject.get("data");
            if (json == null) {
                throw new PayException("查询结果转换失败！");
            }
            rePayBiz = JSONObject.toJavaObject(json, RePayBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return rePayBiz;
    }

    /**
     * 查询转账结果
     * <p>
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/getRePayInfo
     *
     * @param out_trade_no 商户单号
     * @param merchant_id  YunGouOS商户ID 登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号
     * @param key          商户密钥 登录YunGouOS.com-》账户设置-》开发者身份-》账户商户号 商户密钥
     * @return RePayBiz 参考文档：https://open.pay.yungouos.com/#/api/api/finance/repay/getRePayInfo
     */
    public static RePayBiz getRePayInfo(String out_trade_no, String merchant_id, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        RePayBiz rePayBiz = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("商户单号不能为空！");
            }
            if (StrUtil.isBlank(merchant_id)) {
                throw new PayException("YunGouOS商户ID不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("out_trade_no", out_trade_no);
            params.put("merchant_id", merchant_id);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            String result = HttpRequest.get(FinanceConfig.getRePayInfoUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (code == null || 0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject json = (JSONObject) jsonObject.get("data");
            if (json == null) {
                throw new PayException("查询结果转换失败！");
            }
            rePayBiz = JSONObject.toJavaObject(json, RePayBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return rePayBiz;
    }


    /**
     * 发起批量转账
     * <p>
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/create
     *
     * @param out_trade_no     商户单号
     * @param mch_id           批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
     * @param repay_order_list 收款方列表
     * @param pay_type         转账方式。固定值：【alipay、wxpay】
     * @param order_title      支付宝收银台页面账单标题
     * @param time_expire      转账超时时间。格式yyyy-MM-dd HH:mm:ss
     * @param description      批量转账描述
     * @param notify_url       异步回调地址。如传递该参数，转账成功后系统将会把转账结果发送到该地址
     * @param return_url       同步回调地址。如传递该参数，转账成功后浏览器会跳转到该地址
     * @param key              商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
     * @return BatchPayBiz 参考文档：https://open.pay.yungouos.com/#/api/api/finance/repay/create
     */
    public static BatchPayBiz batchPayCreate(String out_trade_no, String mch_id, List<AccountBiz> repay_order_list, String pay_type, String order_title, String time_expire, String description, String notify_url, String return_url, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        BatchPayBiz batchPayBiz = null;
        try {
            if (StrUtil.isBlank(out_trade_no)) {
                throw new PayException("商户单号不能为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("批量转账商户号不能为空！");
            }
            if (repay_order_list == null || repay_order_list.size() <= 0) {
                throw new PayException("收款方不能为空！");
            }
            if (StrUtil.isBlank(pay_type)) {
                throw new PayException("转账方式不能为空！");
            }
            if (StrUtil.isBlank(order_title)) {
                throw new PayException("账单标题不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            params.put("out_trade_no", out_trade_no);
            params.put("mch_id", mch_id);
            params.put("repay_order_list", JSON.toJSONString(repay_order_list));
            params.put("pay_type", pay_type);
            params.put("order_title", order_title);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            // 不需要参与签名的参数
            if (!StrUtil.isBlank(time_expire)) {
                params.put("time_expire", time_expire);
            }
            if (!StrUtil.isBlank(description)) {
                params.put("description", description);
            }
            if (!StrUtil.isBlank(notify_url)) {
                params.put("notify_url", notify_url);
            }
            if (!StrUtil.isBlank(return_url)) {
                params.put("return_url", return_url);
            }
            String result = HttpRequest.post(FinanceConfig.getBatchPayCreateUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (code == null || 0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject json = (JSONObject) jsonObject.get("data");
            if (json == null) {
                throw new PayException("查询结果转换失败！");
            }
            batchPayBiz = JSONObject.toJavaObject(json, BatchPayBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return batchPayBiz;
    }


    /**
     * 确认批量转账
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/sendPay
     *
     * @param out_trade_no 商户单号。与batch_no参数不能同时为空
     * @param batch_no     批次单号。与out_trade_no参数不能同时为空
     * @param mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
     * @param type         转账类型【web、app】分别表示【PC端确认付款、APP端确认付款】
     * @param app_code     是否转换为二维码【true、false】。当type为app时传递有效，可将返回的付款链接生成二维码。
     * @param key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
     * @return String 确认转账的url
     */
    public static String batchPaySendPay(String out_trade_no, String batch_no, String mch_id, String type, boolean app_code, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        String url = null;
        try {
            if (StrUtil.isBlank(out_trade_no) && StrUtil.isBlank(batch_no)) {
                throw new PayException("商户单号和批次单号不能同时为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("批量转账商户号不能为空！");
            }
            if (StrUtil.isBlank(type)) {
                throw new PayException("转账类型不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            if (!StrUtil.isBlank(out_trade_no)) {
                params.put("out_trade_no", out_trade_no);
            }
            if (!StrUtil.isBlank(batch_no)) {
                params.put("batch_no", batch_no);
            }
            params.put("mch_id", mch_id);
            params.put("type", type);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            // 不需要参与签名的参数
            params.put("app_code", app_code);
            String result = HttpRequest.post(FinanceConfig.getBatchPaySendPayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (code == null || 0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            url = jsonObject.getString("data");
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return url;
    }

    /**
     * 查询批量转账
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/getBatchPayInfo
     *
     * @param out_trade_no 商户单号。与batch_no参数不能同时为空
     * @param batch_no     批次单号。与out_trade_no参数不能同时为空
     * @param mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
     * @param key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
     * @return BatchPayInfoBiz 转账详情对象，参考文档：https://open.pay.yungouos.com/#/api/api/finance/repay/getBatchPayInfo
     */
    public static BatchPayInfoBiz getBatchPayInfo(String out_trade_no, String batch_no, String mch_id, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        BatchPayInfoBiz batchPayInfoBiz = null;
        try {
            if (StrUtil.isBlank(out_trade_no) && StrUtil.isBlank(batch_no)) {
                throw new PayException("商户单号和批次单号不能同时为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("批量转账商户号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            if (!StrUtil.isBlank(out_trade_no)) {
                params.put("out_trade_no", out_trade_no);
            }
            if (!StrUtil.isBlank(batch_no)) {
                params.put("batch_no", batch_no);
            }
            params.put("mch_id", mch_id);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            // 不需要参与签名的参数
            String result = HttpRequest.get(FinanceConfig.getBatchPayInfoUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (code == null || 0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
            JSONObject json = jsonObject.getJSONObject("data");
            if (json == null) {
                throw new PayException("查询结果转换失败！");
            }
            batchPayInfoBiz = JSONObject.toJavaObject(json, BatchPayInfoBiz.class);
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
        return batchPayInfoBiz;
    }

    /**
     * 关闭批量转账
     * 文档地址：https://open.pay.yungouos.com/#/api/api/finance/repay/close
     *
     * @param out_trade_no 商户单号。与batch_no参数不能同时为空
     * @param batch_no     批次单号。与out_trade_no参数不能同时为空
     * @param mch_id       批量转账商户号 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约中查看
     * @param key          商户密钥 登录YunGouOS.com-》开放市场-》应用市场-》批量转账-》账户签约 商户密钥
     */
    public static void batchPayClose(String out_trade_no, String batch_no, String mch_id, String key) throws PayException {
        Map<String, Object> params = new HashMap<String, Object>();
        try {
            if (StrUtil.isBlank(out_trade_no) && StrUtil.isBlank(batch_no)) {
                throw new PayException("商户单号和批次单号不能同时为空！");
            }
            if (StrUtil.isBlank(mch_id)) {
                throw new PayException("批量转账商户号不能为空！");
            }
            if (StrUtil.isBlank(key)) {
                throw new PayException("商户密钥不能为空！");
            }
            // 上述参数签名
            if (!StrUtil.isBlank(out_trade_no)) {
                params.put("out_trade_no", out_trade_no);
            }
            if (!StrUtil.isBlank(batch_no)) {
                params.put("batch_no", batch_no);
            }
            params.put("mch_id", mch_id);
            String sign = PaySignUtil.createSign(params, key);
            params.put("sign", sign);
            // 不需要参与签名的参数
            String result = HttpRequest.post(FinanceConfig.getCloseBatchPayUrl).form(params).execute().body();
            if (StrUtil.isBlank(result)) {
                throw new PayException("API接口返回为空，请联系客服");
            }
            JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
            if (jsonObject == null) {
                throw new PayException("API结果转换错误");
            }
            Integer code = jsonObject.getInteger("code");
            if (code == null || 0 != code.intValue()) {
                throw new PayException(jsonObject.getString("msg"));
            }
        } catch (PayException e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            throw new PayException(e.getMessage());
        }
    }
}
