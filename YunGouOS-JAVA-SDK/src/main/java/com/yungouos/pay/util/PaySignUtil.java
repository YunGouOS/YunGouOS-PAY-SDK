package com.yungouos.pay.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;

/**
 * 
 * YunGouOS支付签名工具类
 * 
 * @author YunGouOS技术部-029
 *
 */
public class PaySignUtil {

	/**
	 * 支付参数签名
	 * 
	 * @param params
	 *            需要参与签名的参数
	 * @param partnerKey
	 *            商户密钥
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
	 * @param params
	 *            参数
	 * @param urlEncoder
	 *            是否urlEncoder
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
	 * 验证回调签名是否正确
	 * 
	 * @param request
	 *            回调的request对象
	 * @return 签名是否正确
	 * @throws Exception
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
}
