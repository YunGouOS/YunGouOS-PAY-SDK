package com.yungouos.pay.black;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.common.PayException;
import com.yungouos.pay.config.PayBlackApiConfig;
import com.yungouos.pay.util.PaySignUtil;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;

/**
 * 
 * 黑名单系统
 *
 * @author YunGouOS技术部-029
 *
 *
 */
public class PayBlack {

	/**
	 * 添加黑名单
	 * 
	 * @param mch_id
	 *            微信支付商户号/支付宝商户号
	 * @param account
	 *            用户的openid或支付宝唯一身份id（2088开头）
	 * @param reason
	 *            原因
	 * @param end_time
	 *            黑名单有效期截至时间，不传则永久。示例值：2021-06-24 23:59:59
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付/支付宝-》商户管理-》 支付密钥 查看密钥
	 */
	public static void create(String mch_id, String account, String reason, String end_time, String key) throws PayException {
		Map<String, Object> params = new HashMap<String, Object>();
		try {
			if (StrUtil.isBlank(mch_id)) {
				throw new PayException("商户号不能为空！");
			}
			if (StrUtil.isBlank(account)) {
				throw new PayException("用户账户不能为空！");
			}
			if (StrUtil.isBlank(key)) {
				throw new PayException("支付密钥不能为空！");
			}
			params.put("mch_id", mch_id);
			params.put("account", account);
			// 上述必传参数签名
			String sign = PaySignUtil.createSign(params, key);
			params.put("sign", sign);
			if (!StrUtil.isBlank(reason)) {
				params.put("reason", reason);
			}
			if (!StrUtil.isBlank(end_time)) {
				params.put("end_time", end_time);
			}
			String result = HttpRequest.post(PayBlackApiConfig.getCreateUrl).form(params).execute().body();
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
		} catch (PayException e) {
			e.printStackTrace();
			throw new PayException(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			throw new PayException(e.getMessage());
		}
	}

	/**
	 * 验证黑名单
	 * 
	 * @param mch_id
	 *            微信支付商户号/支付宝商户号
	 * @param account
	 *            用户的openid或支付宝唯一身份id（2088开头）
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付/支付宝-》商户管理-》 支付密钥 查看密钥
	 * @return Boolean
	 */
	public static boolean check(String mch_id, String account, String key) throws PayException {
		Map<String, Object> params = new HashMap<String, Object>();
		boolean flag=false;
		try {
			if (StrUtil.isBlank(mch_id)) {
				throw new PayException("商户号不能为空！");
			}
			if (StrUtil.isBlank(account)) {
				throw new PayException("用户账户不能为空！");
			}
			if (StrUtil.isBlank(key)) {
				throw new PayException("支付密钥不能为空！");
			}
			params.put("mch_id", mch_id);
			params.put("account", account);
			// 上述必传参数签名
			String sign = PaySignUtil.createSign(params, key);
			params.put("sign", sign);
			String result = HttpRequest.get(PayBlackApiConfig.getCheckUrl).form(params).execute().body();
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
			flag=jsonObject.getBoolean("data");
		} catch (PayException e) {
			e.printStackTrace();
			throw new PayException(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			throw new PayException(e.getMessage());
		}
		return flag;
	}
}
