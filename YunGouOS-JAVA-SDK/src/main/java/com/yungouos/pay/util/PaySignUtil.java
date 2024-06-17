package com.yungouos.pay.util;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

/**
 * YunGouOS支付签名工具类
 *
 * @author YunGouOS技术部-029
 */
public class PaySignUtil {

    /**
     * 支付参数签名
     *
     * @param params     需要参与签名的参数
     * @param partnerKey 商户密钥
     * @return {String} 参数签名
     */
    public static String createSign(Map<String, Object> params, String partnerKey) {
        // 生成签名前先去除sign
        params.remove("sign");
        String stringA = packageSign(params, false);
        String stringSignTemp = stringA + "&key=" + partnerKey;
        return SecureUtil.md5(stringSignTemp).toUpperCase();
    }

    /**
     * 组装签名的字段
     *
     * @param params     参数
     * @param urlEncoder 是否urlEncoder
     * @return {String}
     */
    public static String packageSign(Map<String, Object> params, boolean urlEncoder) {
        // 先将参数以其参数名的字典序升序进行排序
        TreeMap<String, Object> sortedParams = new TreeMap<String, Object>(params);
        // 遍历排序后的字典，将所有参数按"key=value"格式拼接在一起
        StringBuilder sb = new StringBuilder();
        boolean first = true;
        for (Entry<String, Object> param : sortedParams.entrySet()) {
            String value = String.valueOf(param.getValue());
            if (StrUtil.isBlank(value)) {
                continue;
            }
            if (first) {
                first = false;
            } else {
                sb.append("&");
            }
            sb.append(param.getKey()).append("=");
            if (urlEncoder) {
                try {
                    value = urlEncode(value);
                } catch (UnsupportedEncodingException e) {
                }
            }
            sb.append(value);
        }
        return sb.toString();
    }

    public static String urlEncode(String src) throws UnsupportedEncodingException {
        return URLEncoder.encode(src, "utf-8");
    }

    /**
     * 验证支付回调签名是否正确
     *
     * @param request 回调的request对象
     * @return 签名是否正确
     */
    public static boolean checkNotifySign(HttpServletRequest request, String partnerKey) throws Exception {
        try {
            if (request == null) {
                throw new Exception("request对象不能为空");
            }
            String sign = request.getParameter("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("request中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = request.getParameter("code");
            String orderNo = request.getParameter("orderNo");
            String outTradeNo = request.getParameter("outTradeNo");
            String payNo = request.getParameter("payNo");
            String money = request.getParameter("money");
            String mchId = request.getParameter("mchId");
            params.put("code", code);
            params.put("orderNo", orderNo);
            params.put("outTradeNo", outTradeNo);
            params.put("payNo", payNo);
            params.put("money", money);
            params.put("mchId", mchId);
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }


    /**
     * 验证支付回调签名是否正确
     *
     * @param data 回调参数对象
     * @return 签名是否正确
     */
    public static boolean checkNotifySign(Map<String, String> data, String partnerKey) throws Exception {
        try {
            if (data == null) {
                throw new Exception("回调参数data对象不能为空");
            }
            String sign = data.get("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("回调参数data对象中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = data.get("code");
            String orderNo = data.get("orderNo");
            String outTradeNo = data.get("outTradeNo");
            String payNo = data.get("payNo");
            String money = data.get("money");
            String mchId = data.get("mchId");
            params.put("code", code);
            params.put("orderNo", orderNo);
            params.put("outTradeNo", outTradeNo);
            params.put("payNo", payNo);
            params.put("money", money);
            params.put("mchId", mchId);
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }


    /**
     * 验证退款回调签名是否正确
     *
     * @param request 回调的request对象
     * @return 签名是否正确
     */
    public static boolean checkRefundNotifySign(HttpServletRequest request, String partnerKey) throws Exception {
        try {
            if (request == null) {
                throw new Exception("request对象不能为空");
            }
            String sign = request.getParameter("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("request中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = request.getParameter("code");
            String refundNo = request.getParameter("refundNo");
            String orderNo = request.getParameter("orderNo");
            String outTradeNo = request.getParameter("outTradeNo");
            String payNo = request.getParameter("payNo");
            String mchId = request.getParameter("mchId");
            String payName = request.getParameter("payName");
            String refundMoney = request.getParameter("refundMoney");
            String channel = request.getParameter("channel");
            String refundTime = request.getParameter("refundTime");
            String payRefundNo = request.getParameter("payRefundNo");
            String applyTime = request.getParameter("applyTime");

            params.put("code", code);
            params.put("refundNo", refundNo);
            params.put("orderNo", orderNo);
            params.put("outTradeNo", outTradeNo);
            params.put("payNo", payNo);
            params.put("mchId", mchId);
            params.put("payName", payName);
            params.put("refundMoney", refundMoney);
            params.put("channel", channel);
            params.put("refundTime", refundTime);
            params.put("payRefundNo", payRefundNo);
            params.put("applyTime", applyTime);
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }


    /**
     * 验证退款回调签名是否正确
     *
     * @param data 回调参数对象
     * @return 签名是否正确
     */
    public static boolean checkRefundNotifySign(Map<String, String> data, String partnerKey) throws Exception {
        try {
            if (data == null) {
                throw new Exception("回调参数data对象不能为空");
            }
            String sign = data.get("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("回调参数data对象中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = data.get("code");
            String refundNo = data.get("refundNo");
            String orderNo = data.get("orderNo");
            String outTradeNo = data.get("outTradeNo");
            String payNo = data.get("payNo");
            String mchId = data.get("mchId");
            String payName = data.get("payName");
            String refundMoney = data.get("refundMoney");
            String channel = data.get("channel");
            String refundTime = data.get("refundTime");
            String payRefundNo = data.get("payRefundNo");
            String applyTime = data.get("applyTime");

            params.put("code", code);
            params.put("refundNo", refundNo);
            params.put("orderNo", orderNo);
            params.put("outTradeNo", outTradeNo);
            params.put("payNo", payNo);
            params.put("mchId", mchId);
            params.put("payName", payName);
            params.put("refundMoney", refundMoney);
            params.put("channel", channel);
            params.put("refundTime", refundTime);
            params.put("payRefundNo", payRefundNo);
            params.put("applyTime", applyTime);
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }


    /**
     * 验证转账代付回调签名是否正确
     *
     * @param request 回调的request对象
     * @return 签名是否正确
     */
    public static boolean checkRePayNotifySign(HttpServletRequest request, String partnerKey) throws Exception {
        try {
            if (request == null) {
                throw new Exception("request对象不能为空");
            }
            String sign = request.getParameter("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("request中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = request.getParameter("code");
            String order_no = request.getParameter("order_no");
            String out_trade_no = request.getParameter("out_trade_no");
            String merchant_id = request.getParameter("merchant_id");
            String money = request.getParameter("money");
            String channel = request.getParameter("channel");
            String account = request.getParameter("account");
            String desc = request.getParameter("desc");
            params.put("code", code);
            params.put("order_no", order_no);
            params.put("out_trade_no", out_trade_no);
            params.put("merchant_id", merchant_id);
            params.put("money", money);
            params.put("channel", channel);
            params.put("account", account);
            params.put("desc", desc);
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }

    /**
     * 验证转账代付回调签名是否正确
     *
     * @param data 回调参数对象
     * @return 签名是否正确
     */
    public static boolean checkRePayNotifySign(Map<String, String> data, String partnerKey) throws Exception {
        try {
            if (data == null) {
                throw new Exception("回调参数data对象不能为空");
            }
            String sign = data.get("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("回调参数data对象中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = data.get("code");
            String order_no = data.get("order_no");
            String out_trade_no = data.get("out_trade_no");
            String merchant_id = data.get("merchant_id");
            String money = data.get("money");
            String channel = data.get("channel");
            String account = data.get("account");
            String desc = data.get("desc");
            params.put("code", code);
            params.put("order_no", order_no);
            params.put("out_trade_no", out_trade_no);
            params.put("merchant_id", merchant_id);
            params.put("money", money);
            params.put("channel", channel);
            params.put("account", account);
            params.put("desc", desc);
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }



    /**
     * 验证分账回调签名是否正确
     *
     * @param request 回调的request对象
     * @return 签名是否正确
     */
    public static boolean checkShareMoneyNotifySign(HttpServletRequest request, String partnerKey) throws Exception {
        try {
            if (request == null) {
                throw new Exception("request对象不能为空");
            }
            String sign = request.getParameter("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("request中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = request.getParameter("code");
            String ps_no = request.getParameter("ps_no");
            String order_no = request.getParameter("order_no");
            String out_trade_no = request.getParameter("out_trade_no");
            String pay_no = request.getParameter("pay_no");
            String mch_id = request.getParameter("mch_id");
            String order_money = request.getParameter("order_money");
            String money = request.getParameter("money");
            String channel = request.getParameter("channel");
            String account = request.getParameter("account");
            String desc = request.getParameter("desc");
            params.put("code", code);
            params.put("ps_no", ps_no);
            params.put("order_no", order_no);
            params.put("out_trade_no", out_trade_no);
            params.put("pay_no", pay_no);
            params.put("mch_id", mch_id);
            params.put("order_money", order_money);
            params.put("money", money);
            params.put("channel", channel);
            params.put("account", account);
            params.put("desc", desc);
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }

    /**
     * 验证分账回调签名是否正确
     *
     * @param data 回调参数对象
     * @return 签名是否正确
     */
    public static boolean checkShareMoneyNotifySign(Map<String, String> data, String partnerKey) throws Exception {
        try {
            if (data == null) {
                throw new Exception("回调参数data对象不能为空");
            }
            String sign = data.get("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("回调参数data对象中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = data.get("code");
            String ps_no = data.get("ps_no");
            String order_no = data.get("order_no");
            String out_trade_no = data.get("out_trade_no");
            String pay_no = data.get("pay_no");
            String mch_id = data.get("mch_id");
            String order_money = data.get("order_money");
            String money = data.get("money");
            String channel = data.get("channel");
            String account = data.get("account");
            String desc = data.get("desc");
            params.put("code", code);
            params.put("ps_no", ps_no);
            params.put("order_no", order_no);
            params.put("out_trade_no", out_trade_no);
            params.put("pay_no", pay_no);
            params.put("mch_id", mch_id);
            params.put("order_money", order_money);
            params.put("money", money);
            params.put("channel", channel);
            params.put("account", account);
            params.put("desc", desc);
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }

    /**
     * 验证批量转账回调签名是否正确
     *
     * @param request 回调的request对象
     * @return 签名是否正确
     */
    public static boolean checkBatchPayNotifySign(HttpServletRequest request, String partnerKey) throws Exception {
        try {
            if (request == null) {
                throw new Exception("request对象不能为空");
            }
            String sign = request.getParameter("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("request中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = request.getParameter("code");
            String batch_no = request.getParameter("batch_no");
            String out_trade_no = request.getParameter("out_trade_no");
            String mch_id = request.getParameter("mch_id");
            String money = request.getParameter("money");
            String rate = request.getParameter("rate");
            String count = request.getParameter("count");
            String pay_type = request.getParameter("pay_type");
            String channel = request.getParameter("channel");
            String success_count = request.getParameter("success_count");
            String success_money = request.getParameter("success_money");
            String fail_count = request.getParameter("fail_count");
            String fail_money = request.getParameter("fail_money");
            String add_time = request.getParameter("add_time");
            String success_list = request.getParameter("success_list");
            String fail_list = request.getParameter("fail_list");
            params.put("code", code);
            params.put("batch_no", batch_no);
            params.put("out_trade_no", out_trade_no);
            params.put("mch_id", mch_id);
            params.put("money", money);
            params.put("rate", rate);
            params.put("count", count);
            params.put("pay_type", pay_type);
            params.put("channel", channel);
            params.put("success_count", success_count);
            params.put("success_money", success_money);
            params.put("fail_count", fail_count);
            params.put("fail_money", fail_money);
            params.put("add_time", add_time);
            if (!StrUtil.isBlank(success_list)) {
                params.put("success_list", success_list);
            }
            if (!StrUtil.isBlank(fail_list)) {
                params.put("fail_list", fail_list);
            }
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }


    /**
     * 验证批量转账回调签名是否正确
     *
     * @param data 回调参数对象
     * @return 签名是否正确
     */
    public static boolean checkBatchPayNotifySign(Map<String, String> data, String partnerKey) throws Exception {
        try {
            if (data == null) {
                throw new Exception("回调参数data对象不能为空");
            }
            String sign = data.get("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("回调参数data对象中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = data.get("code");
            String batch_no = data.get("batch_no");
            String out_trade_no = data.get("out_trade_no");
            String mch_id = data.get("mch_id");
            String money = data.get("money");
            String rate = data.get("rate");
            String count = data.get("count");
            String pay_type = data.get("pay_type");
            String channel = data.get("channel");
            String success_count = data.get("success_count");
            String success_money = data.get("success_money");
            String fail_count = data.get("fail_count");
            String fail_money = data.get("fail_money");
            String add_time = data.get("add_time");
            String success_list = data.get("success_list");
            String fail_list = data.get("fail_list");
            params.put("code", code);
            params.put("batch_no", batch_no);
            params.put("out_trade_no", out_trade_no);
            params.put("mch_id", mch_id);
            params.put("money", money);
            params.put("rate", rate);
            params.put("count", count);
            params.put("pay_type", pay_type);
            params.put("channel", channel);
            params.put("success_count", success_count);
            params.put("success_money", success_money);
            params.put("fail_count", fail_count);
            params.put("fail_money", fail_money);
            params.put("add_time", add_time);
            if (!StrUtil.isBlank(success_list)) {
                params.put("success_list", success_list);
            }
            if (!StrUtil.isBlank(fail_list)) {
                params.put("fail_list", fail_list);
            }
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }


    /**
     * 验证分账回退回调签名是否正确
     *
     * @param request 回调的request对象
     * @return 签名是否正确
     */
    public static boolean checkShareReturnNotifySign(HttpServletRequest request, String partnerKey) throws Exception {
        try {
            if (request == null) {
                throw new Exception("request对象不能为空");
            }
            String sign = request.getParameter("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("request中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = request.getParameter("code");
            String return_no = request.getParameter("return_no");
            String out_return_no = request.getParameter("out_return_no");
            String order_no = request.getParameter("order_no");
            String out_trade_no = request.getParameter("out_trade_no");
            String pay_no = request.getParameter("pay_no");
            String ps_no = request.getParameter("ps_no");
            String mch_id = request.getParameter("mch_id");
            String money = request.getParameter("money");
            String channel = request.getParameter("channel");
            String desc = request.getParameter("desc");
            params.put("code", code);
            params.put("return_no", return_no);
            params.put("out_return_no", out_return_no);
            params.put("order_no", order_no);
            params.put("out_trade_no", out_trade_no);
            params.put("pay_no", pay_no);
            params.put("ps_no", ps_no);
            params.put("mch_id", mch_id);
            params.put("money", money);
            params.put("channel", channel);
            params.put("desc", desc);
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }

    /**
     * 验证分账回退回调签名是否正确
     *
     * @param data 回调参数对象
     * @return 签名是否正确
     */
    public static boolean checkShareReturnNotifySign(Map<String, String> data, String partnerKey) throws Exception {
        try {
            if (data == null) {
                throw new Exception("回调参数data对象不能为空");
            }
            String sign = data.get("sign");
            if (StrUtil.isBlank(sign)) {
                throw new Exception("回调参数data对象中未获取到sign");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            String code = data.get("code");
            String return_no = data.get("return_no");
            String out_return_no = data.get("out_return_no");
            String order_no = data.get("order_no");
            String out_trade_no = data.get("out_trade_no");
            String pay_no = data.get("pay_no");
            String ps_no = data.get("ps_no");
            String mch_id = data.get("mch_id");
            String money = data.get("money");
            String channel = data.get("channel");
            String desc = data.get("desc");
            params.put("code", code);
            params.put("return_no", return_no);
            params.put("out_return_no", out_return_no);
            params.put("order_no", order_no);
            params.put("out_trade_no", out_trade_no);
            params.put("pay_no", pay_no);
            params.put("ps_no", ps_no);
            params.put("mch_id", mch_id);
            params.put("money", money);
            params.put("channel", channel);
            params.put("desc", desc);
            String reSign = PaySignUtil.createSign(params, partnerKey);
            if (sign.equals(reSign)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
        return false;
    }
}
