package com.yungouos.pay.wxapi;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.common.PayException;
import com.yungouos.pay.config.WxPayApiConfig;
import com.yungouos.pay.entity.WxOauthInfo;
import com.yungouos.pay.entity.WxWebLoginBiz;
import com.yungouos.pay.util.PaySignUtil;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;

/**
 * 
 * 微信API相关接口
 *
 * @author YunGouOS技术部-029
 * 
 */
public class WxApi implements Serializable {

	private static final long serialVersionUID = 4194554279509068743L;

	/**
	 * 获取微信授权链接
	 * 
	 * @param mch_id
	 *            微信支付商户号或YunGouOS商户ID
	 * @param callback_url
	 *            授权完毕后回调地址
	 * @param type
	 *            授权类型【mp-base：基础授权，不会有授权页面，用户无感知，可获取openid；mp-info：详细授权，首次授权会弹出授权页面，可获取用户昵称、头像等信息；open-url：微信PC端扫码登录url】
	 * @param params
	 *            额外参数，授权成功后可通过查询接口原路返回
	 * @param key
	 *            商户号对应的密钥
	 * 
	 * @return String 微信授权url，直接重定向到该地址
	 */
	public static String getWxOauthUrl(String mch_id, String callback_url, String type, JSONObject params, String key) throws PayException {
		Map<String, Object> map = new HashMap<String, Object>();
		String resultUrl = null;
		try {
			if (StrUtil.isBlank(mch_id)) {
				throw new PayException("mch_id不能为空！");
			}
			if (StrUtil.isBlank(callback_url)) {
				throw new PayException("callback_url不能为空！");
			}
			if (StrUtil.isBlank(key)) {
				throw new PayException("key不能为空！");
			}
			map.put("mch_id", mch_id);
			map.put("callback_url", callback_url);

			// 上述必传参数签名
			String sign = PaySignUtil.createSign(map, key);
			map.put("sign", sign);
			if (!StrUtil.isBlank(type)) {
				map.put("type", type);
			}
			if (params != null) {
				map.put("params", params.toJSONString());
			}
			String result = HttpRequest.post(WxPayApiConfig.getWxOauthV2Url).form(map).execute().body();
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
	 * 微信PC端扫码登录
	 * 
	 * @param mch_id
	 *            微信支付商户号或YunGouOS商户ID
	 * @param callback_url
	 *            授权完毕后回调地址
	 * @param params
	 *            额外参数，授权成功后可通过查询接口原路返回
	 * @param key
	 *            商户号对应的密钥
	 * 
	 * @return WxWebLoginBiz 微信扫码登录所需的参数对象 参考文档：https://open.pay.yungouos.com/#/api/api/wx/getWebLogin
	 */
	public static WxWebLoginBiz getWebLogin(String mch_id, String callback_url, JSONObject params, String key) throws PayException {
		Map<String, Object> map = new HashMap<String, Object>();
		WxWebLoginBiz wxWebLoginBiz = null;
		try {
			if (StrUtil.isBlank(mch_id)) {
				throw new PayException("mch_id不能为空！");
			}
			if (StrUtil.isBlank(callback_url)) {
				throw new PayException("callback_url不能为空！");
			}
			if (StrUtil.isBlank(key)) {
				throw new PayException("key不能为空！");
			}
			map.put("mch_id", mch_id);
			map.put("callback_url", callback_url);

			// 上述必传参数签名
			String sign = PaySignUtil.createSign(map, key);
			map.put("sign", sign);
			if (params != null) {
				map.put("params", params.toJSONString());
			}
			String result = HttpRequest.post(WxPayApiConfig.getWebLoginUrl).form(map).execute().body();
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
			wxWebLoginBiz = JSON.toJavaObject(data, WxWebLoginBiz.class);
		} catch (PayException e) {
			e.printStackTrace();
			throw new PayException(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			throw new PayException(e.getMessage());
		}
		return wxWebLoginBiz;
	}

	/**
	 * 根据授权返回的code，查询授权信息
	 * 
	 * @param mch_id
	 *            微信支付商户号或YunGouOS商户ID
	 * @param code
	 *            授权结束后返回的code
	 * @param key
	 *            商户号对应的密钥
	 * 
	 * @return WxOauthInfo 授权信息返回对象 参考文档：https://open.pay.yungouos.com/#/api/api/wx/getOauthInfo
	 */
	public static WxOauthInfo getWxOauthInfo(String mch_id, String code, String key) throws PayException {
		Map<String, Object> params = new HashMap<String, Object>();
		WxOauthInfo wxOauthInfo = null;
		try {
			if (StrUtil.isBlank(mch_id)) {
				throw new PayException("mch_id不能为空！");
			}
			if (StrUtil.isBlank(code)) {
				throw new PayException("code为空！");
			}
			params.put("mch_id", mch_id);
			params.put("code", code);
			// 上述必传参数签名
			String sign = PaySignUtil.createSign(params, key);
			params.put("sign", sign);
			String result = HttpRequest.get(WxPayApiConfig.getWxOauthInfoV2Url).form(params).execute().body();
			if (StrUtil.isBlank(result)) {
				throw new PayException("API接口返回为空，请联系客服");
			}
			JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
			if (jsonObject == null) {
				throw new PayException("API结果转换错误");
			}
			Integer resultCode = jsonObject.getInteger("code");
			if (0 != resultCode.intValue()) {
				throw new PayException(jsonObject.getString("msg"));
			}
			JSONObject json = jsonObject.getJSONObject("data");
			if (json == null) {
				throw new PayException("API结果数据转换错误");
			}
			wxOauthInfo = JSONObject.toJavaObject(json, WxOauthInfo.class);
		} catch (PayException e) {
			e.printStackTrace();
			throw new PayException(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			throw new PayException(e.getMessage());
		}
		return wxOauthInfo;
	}
}
