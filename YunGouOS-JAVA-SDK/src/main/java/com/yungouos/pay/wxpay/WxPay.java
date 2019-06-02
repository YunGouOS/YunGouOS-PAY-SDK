package com.yungouos.pay.wxpay;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.config.WxPayApiConfig;
import com.yungouos.pay.entity.RefundOrder;
import com.yungouos.pay.entity.RefundSearch;
import com.yungouos.pay.entity.WxOauthInfo;
import com.yungouos.pay.entity.WxPayOrder;
import com.yungouos.pay.util.WxPaySignUtil;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;

/**
 * 
 * 微信支付
 * 
 * @author YunGouOS技术部-029
 *
 */
public class WxPay {

	/**
	 * 微信扫码支付
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
	 * @param body
	 *            商品描述
	 * @param type
	 *            返回类型（1、返回微信原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param return_url
	 *            同步回调地址，暂时没什么卵用
	 * @param key
	 *            商户密钥 登录YunGouOS.com-》我的账户-》账户中心 查看密钥
	 * @return 支付二维码连接
	 */
	public static String nativePay(String out_trade_no, String total_fee, String mch_id, String body, String type, String attach, String notify_url, String return_url, String key) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		String resultUrl = null;
		try {
			if (StrUtil.isBlank(out_trade_no)) {
				throw new Exception("订单号不能为空！");
			}
			if (StrUtil.isBlank(total_fee)) {
				throw new Exception("付款金额不能为空！");
			}
			if (StrUtil.isBlank(mch_id)) {
				throw new Exception("商户号不能为空！");
			}
			if (StrUtil.isBlank(body)) {
				throw new Exception("商品描述不能为空！");
			}
			if (StrUtil.isBlank(key)) {
				throw new Exception("商户密钥不能为空！");
			}
			params.put("out_trade_no", out_trade_no);
			params.put("total_fee", total_fee);
			params.put("mch_id", mch_id);
			params.put("body", body);
			// 上述必传参数签名
			String sign = WxPaySignUtil.createSign(params, key);
			if (StrUtil.isBlank(type)) {
				type = "2";
			}
			params.put("type", type);
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("return_url", return_url);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.nativeApiUrl).form(params).execute().body();
			System.out.println(result);
			if (StrUtil.isBlank(result)) {
				throw new Exception("API接口返回为空，请联系客服");
			}
			JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
			if (jsonObject == null) {
				throw new Exception("API结果转换错误");
			}
			Integer code = jsonObject.getInteger("code");
			if (0 != code) {
				throw new Exception(jsonObject.getString("msg"));
			}
			resultUrl = jsonObject.getString("data");
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
		return resultUrl;
	}

	/**
	 * 公众号支付
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
	 * @param body
	 *            商品描述
	 * @param openId
	 *            用户openId 通过授权接口获得
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param return_url
	 *            同步回调地址，暂时没什么卵用
	 * @param key
	 *            商户密钥 登录YunGouOS.com-》我的账户-》账户中心 查看密钥
	 * @return JSSDK支付需要的jspackage
	 */
	public static String jsapiPay(String out_trade_no, String total_fee, String mch_id, String body, String openId, String attach, String notify_url, String return_url, String key) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		String resultUrl = null;
		try {
			if (StrUtil.isBlank(out_trade_no)) {
				throw new Exception("订单号不能为空！");
			}
			if (StrUtil.isBlank(total_fee)) {
				throw new Exception("付款金额不能为空！");
			}
			if (StrUtil.isBlank(mch_id)) {
				throw new Exception("商户号不能为空！");
			}
			if (StrUtil.isBlank(body)) {
				throw new Exception("商品描述不能为空！");
			}
			if (StrUtil.isBlank(openId)) {
				throw new Exception("openId不能为空！");
			}
			if (StrUtil.isBlank(key)) {
				throw new Exception("商户密钥不能为空！");
			}
			params.put("out_trade_no", out_trade_no);
			params.put("total_fee", total_fee);
			params.put("mch_id", mch_id);
			params.put("body", body);
			params.put("openId", openId);
			// 上述必传参数签名
			String sign = WxPaySignUtil.createSign(params, key);
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("return_url", return_url);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.jsapiUrl).form(params).execute().body();
			System.out.println(result);
			if (StrUtil.isBlank(result)) {
				throw new Exception("API接口返回为空，请联系客服");
			}
			JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
			if (jsonObject == null) {
				throw new Exception("API结果转换错误");
			}
			Integer code = jsonObject.getInteger("code");
			if (0 != code) {
				throw new Exception(jsonObject.getString("msg"));
			}
			resultUrl = jsonObject.getString("data");
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
		return resultUrl;
	}

	/**
	 * 收银台支付
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
	 * @param body
	 *            商品描述
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param return_url
	 *            同步回调地址，不 传支付后关闭页面
	 * @param key
	 *            商户密钥 登录YunGouOS.com-》我的账户-》账户中心 查看密钥
	 * @return 返回收银台地址，重定向到该地址即可
	 */
	public static String cashierPay(String out_trade_no, String total_fee, String mch_id, String body, String attach, String notify_url, String return_url, String key) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		String resultUrl = null;
		try {
			if (StrUtil.isBlank(out_trade_no)) {
				throw new Exception("订单号不能为空！");
			}
			if (StrUtil.isBlank(total_fee)) {
				throw new Exception("付款金额不能为空！");
			}
			if (StrUtil.isBlank(mch_id)) {
				throw new Exception("商户号不能为空！");
			}
			if (StrUtil.isBlank(body)) {
				throw new Exception("商品描述不能为空！");
			}
			if (StrUtil.isBlank(key)) {
				throw new Exception("商户密钥不能为空！");
			}
			params.put("out_trade_no", out_trade_no);
			params.put("total_fee", total_fee);
			params.put("mch_id", mch_id);
			params.put("body", body);
			// 上述必传参数签名
			String sign = WxPaySignUtil.createSign(params, key);
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("return_url", return_url);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.cashierUrl).form(params).execute().body();
			System.out.println(result);
			if (StrUtil.isBlank(result)) {
				throw new Exception("API接口返回为空，请联系客服");
			}
			JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
			if (jsonObject == null) {
				throw new Exception("API结果转换错误");
			}
			Integer code = jsonObject.getInteger("code");
			if (0 != code) {
				throw new Exception(jsonObject.getString("msg"));
			}
			resultUrl = jsonObject.getString("data");
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
		return resultUrl;
	}

	/**
	 * 查询订单
	 * 
	 * @param out_trade_no
	 *            订单号
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
	 * @param key
	 *            商户密钥 登录YunGouOS.com-》我的账户-》账户中心 查看密钥
	 * 
	 * @return WxPayOrder 订单对象
	 *         参考文档：http://open.pay.yungouos.com/#/api/api/pay/wxpay/getWxPayOrderInfo
	 * @throws Exception
	 */
	public static WxPayOrder getOrderInfoByOutTradeNo(String out_trade_no, String mch_id, String key) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		WxPayOrder wxPayOrder = null;
		try {
			if (StrUtil.isBlank(out_trade_no)) {
				throw new Exception("订单号不能为空！");
			}
			if (StrUtil.isBlank(mch_id)) {
				throw new Exception("商户号不能为空！");
			}
			if (StrUtil.isBlank(key)) {
				throw new Exception("商户密钥不能为空！");
			}
			params.put("out_trade_no", out_trade_no);
			params.put("mch_id", mch_id);
			// 上述必传参数签名
			String sign = WxPaySignUtil.createSign(params, key);
			params.put("sign", sign);
			String result = HttpRequest.get(WxPayApiConfig.getOrderUrl).form(params).execute().body();
			if (StrUtil.isBlank(result)) {
				throw new Exception("API接口返回为空，请联系客服");
			}
			JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
			if (jsonObject == null) {
				throw new Exception("API结果转换错误");
			}
			Integer code = jsonObject.getInteger("code");
			if (0 != code) {
				throw new Exception(jsonObject.getString("msg"));
			}
			JSONObject json = jsonObject.getJSONObject("data");
			if (json == null) {
				throw new Exception("API结果数据转换错误");
			}
			wxPayOrder = JSONObject.toJavaObject(json, WxPayOrder.class);

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
		return wxPayOrder;
	}

	/**
	 * 订单退款
	 * 
	 * @param out_trade_no
	 *            订单号
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
	 * @param money
	 *            退款金额
	 * @param key
	 *            商户密钥 登录YunGouOS.com-》我的账户-》账户中心 查看密钥
	 * 
	 * @return refundOrder 退款订单对象
	 *         参考文档：http://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder
	 * @throws Exception
	 */
	public static RefundOrder orderRefund(String out_trade_no, String mch_id, String money, String key) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		RefundOrder refundOrder = null;
		try {
			if (StrUtil.isBlank(out_trade_no)) {
				throw new Exception("订单号不能为空！");
			}
			if (StrUtil.isBlank(mch_id)) {
				throw new Exception("商户号不能为空！");
			}
			if (StrUtil.isBlank(money)) {
				throw new Exception("退款金额不能为空！");
			}
			if (StrUtil.isBlank(key)) {
				throw new Exception("商户密钥不能为空！");
			}
			params.put("out_trade_no", out_trade_no);
			params.put("mch_id", mch_id);
			params.put("money", money);
			// 上述必传参数签名
			String sign = WxPaySignUtil.createSign(params, key);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.refundOrderUrl).form(params).execute().body();
			System.out.println(result);
			if (StrUtil.isBlank(result)) {
				throw new Exception("API接口返回为空，请联系客服");
			}
			JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
			if (jsonObject == null) {
				throw new Exception("API结果转换错误");
			}
			Integer code = jsonObject.getInteger("code");
			if (0 != code) {
				throw new Exception(jsonObject.getString("msg"));
			}
			JSONObject json = jsonObject.getJSONObject("data");
			if (json == null) {
				throw new Exception("API结果数据转换错误");
			}
			refundOrder = JSONObject.toJavaObject(json, RefundOrder.class);

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
		return refundOrder;
	}

	/**
	 * 查询退款结果
	 * 
	 * @param refund_no
	 *            退款单号，（由调用退款接口返回）
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》我的支付 查看商户号
	 * @param key
	 *            商户密钥 登录YunGouOS.com-》我的账户-》账户中心 查看密钥
	 * 
	 * @return RefundSearch 退款结果对象
	 *         参考文档：http://open.pay.yungouos.com/#/api/api/pay/wxpay/getRefundResult
	 * @throws Exception
	 */
	public static RefundSearch getRefundResult(String refund_no, String mch_id, String key) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		RefundSearch refundSearch = null;
		try {
			if (StrUtil.isBlank(refund_no)) {
				throw new Exception("退款单号不能为空！");
			}
			if (StrUtil.isBlank(mch_id)) {
				throw new Exception("商户号不能为空！");
			}
			if (StrUtil.isBlank(key)) {
				throw new Exception("商户密钥不能为空！");
			}
			params.put("refund_no", refund_no);
			params.put("mch_id", mch_id);
			// 上述必传参数签名
			String sign = WxPaySignUtil.createSign(params, key);
			params.put("sign", sign);
			String result = HttpRequest.get(WxPayApiConfig.getRefundResultUrl).form(params).execute().body();
			System.out.println(result);
			if (StrUtil.isBlank(result)) {
				throw new Exception("API接口返回为空，请联系客服");
			}
			JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
			if (jsonObject == null) {
				throw new Exception("API结果转换错误");
			}
			Integer code = jsonObject.getInteger("code");
			if (0 != code) {
				throw new Exception(jsonObject.getString("msg"));
			}
			JSONObject json = jsonObject.getJSONObject("data");
			if (json == null) {
				throw new Exception("API结果数据转换错误");
			}
			refundSearch = JSONObject.toJavaObject(json, RefundSearch.class);

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
		return refundSearch;
	}

	/**
	 * 获取微信授权URL 为了获取openid
	 * 
	 * @param params
	 *            额外参数，原路返回 需要json字符串
	 * @param url
	 *            授权结束后携带code返回的地址 （需要包含 http://
	 *            以及携带一个参数）示例值：http://www.baidu.com?a=1
	 * 
	 * @return 微信授权url，直接重定向到该地址
	 * @throws Exception
	 */
	public static String getWxOauthUrl(String param, String url) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		String resultUrl = null;
		try {
			if (StrUtil.isBlank(url)) {
				throw new Exception("url不能为空！");
			}
			params.put("url", url);
			params.put("params", param);
			String result = HttpRequest.post(WxPayApiConfig.getWxOauthUrl).form(params).execute().body();
			System.out.println(result);
			if (StrUtil.isBlank(result)) {
				throw new Exception("API接口返回为空，请联系客服");
			}
			JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
			if (jsonObject == null) {
				throw new Exception("API结果转换错误");
			}
			Integer code = jsonObject.getInteger("code");
			if (0 != code) {
				throw new Exception(jsonObject.getString("msg"));
			}
			resultUrl = jsonObject.getString("data");
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
		return resultUrl;
	}

	/**
	 * 根据授权返回的code，查询授权信息
	 * 
	 * @param code
	 *            授权结束后返回
	 * @return WxOauthInfo 授权信息返回对象
	 *         参考文档：http://open.pay.yungouos.com/#/api/api/wxlogin/getBaseOauthInfo
	 * @throws Exception
	 */
	public static WxOauthInfo getWxOauthInfo(String code) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		WxOauthInfo wxOauthInfo = null;
		try {
			if (StrUtil.isBlank(code)) {
				throw new Exception("code为空！");
			}
			params.put("code", code);
			String result = HttpRequest.get(WxPayApiConfig.getWxOauthInfo).form(params).execute().body();
			System.out.println(result);
			if (StrUtil.isBlank(result)) {
				throw new Exception("API接口返回为空，请联系客服");
			}
			JSONObject jsonObject = (JSONObject) JSONObject.parse(result);
			if (jsonObject == null) {
				throw new Exception("API结果转换错误");
			}
			Integer resultCode = jsonObject.getInteger("code");
			if (0 != resultCode) {
				throw new Exception(jsonObject.getString("msg"));
			}
			JSONObject json = jsonObject.getJSONObject("data");
			if (json == null) {
				throw new Exception("API结果数据转换错误");
			}
			wxOauthInfo = JSONObject.toJavaObject(json, WxOauthInfo.class);

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}
		return wxOauthInfo;
	}

}
