package com.yungouos.pay.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;

public class WxPaySignUtil {
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
}
