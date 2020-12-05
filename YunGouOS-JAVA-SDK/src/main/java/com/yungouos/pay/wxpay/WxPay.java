package com.yungouos.pay.wxpay;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.common.PayException;
import com.yungouos.pay.config.WxPayApiConfig;
import com.yungouos.pay.entity.CodePayBiz;
import com.yungouos.pay.entity.FacePayBiz;
import com.yungouos.pay.entity.RefundOrder;
import com.yungouos.pay.entity.RefundSearch;
import com.yungouos.pay.entity.WxBillInfoBiz;
import com.yungouos.pay.entity.WxDownloadBillBiz;
import com.yungouos.pay.entity.WxOauthInfo;
import com.yungouos.pay.util.PaySignUtil;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;

/**
 * 
 * 微信支付API对接
 * 
 * @author YunGouOS技术部-029
 *
 */
public class WxPay {

	/**
	 * 微信付款码支付（原刷卡支付） 被扫
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param body
	 *            商品描述
	 * @param auth_code
	 *            扫码支付授权码，设备读取用户微信中的条码或者二维码信息（注：用户付款码条形码规则：18位纯数字，以10、11、12、13、14、15开头）
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param receipt
	 *            是否开具电子发票 0：否 1：是 默认0
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param config_no
	 *            分账配置单号。支持多个分账，使用,号分割
	 * @param auto
	 *            自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
	 * @param auto_node
	 *            执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
	 * 
	 * @return CodePayBiz 付款码支付结果对象 参考文档地址：https://open.pay.yungouos.com/#/api/api/pay/wxpay/codePay
	 */
	public static CodePayBiz codePay(String out_trade_no, String total_fee, String mch_id, String body, String auth_code, String attach, String receipt, String notify_url, String config_no,
			String auto, String auto_node, String key) throws PayException {
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
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.codePayUrl).form(params).execute().body();
			System.out.println(result);
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
	 * 微信扫码支付
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
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
	 * @param config_no
	 *            分账配置单号。支持多个分账，使用,号分割
	 * @param auto
	 *            自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
	 * @param auto_node
	 *            执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
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
			String result = HttpRequest.post(WxPayApiConfig.nativePayUrl).form(params).execute().body();
			System.out.println(result);
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
	 * 公众号支付
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
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
	 * @param config_no
	 *            分账配置单号。支持多个分账，使用,号分割
	 * @param auto
	 *            自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
	 * @param auto_node
	 *            执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
	 * @return JSSDK支付需要的jspackage
	 */
	public static String jsapiPay(String out_trade_no, String total_fee, String mch_id, String body, String openId, String attach, String notify_url, String return_url, String config_no, String auto,
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
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("return_url", return_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.jsapiUrl).form(params).execute().body();
			System.out.println(result);
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
	 * 收银台支付
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param body
	 *            商品描述
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param return_url
	 *            同步回调地址，不传支付后关闭页面
	 * @param config_no
	 *            分账配置单号。支持多个分账，使用,号分割
	 * @param auto
	 *            自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
	 * @param auto_node
	 *            执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
	 * @return 返回收银台地址，重定向到该地址即可
	 */
	public static String cashierPay(String out_trade_no, String total_fee, String mch_id, String body, String attach, String notify_url, String return_url, String config_no, String auto,
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
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("return_url", return_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.cashierUrl).form(params).execute().body();
			System.out.println(result);
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
	 * 小程序支付
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param body
	 *            商品描述
	 * @param title
	 *            支付收银小程序显示的标题
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param config_no
	 *            分账配置单号。支持多个分账，使用,号分割
	 * @param auto
	 *            自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
	 * @param auto_node
	 *            执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
	 * @return 返回小程序支付所需的参数，拿到参数后由小程序端将参数携带跳转到“支付收银”小程序
	 */
	public static JSONObject minAppPay(String out_trade_no, String total_fee, String mch_id, String body, String title, String attach, String notify_url, String config_no, String auto,
			String auto_node, String key) throws PayException {
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
			params.put("title", title);
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
			params.put("sign", sign);
			json = (JSONObject) JSONObject.toJSON(params);
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
	 * 小程序支付
	 * 
	 * @param openId
	 *            小程序openId
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param body
	 *            商品描述
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param config_no
	 *            分账配置单号。支持多个分账，使用,号分割
	 * @param auto
	 *            自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
	 * @param auto_node
	 *            执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
	 * @return 返回原生小程序支付所需的参数，拿到参数后由小程序端调用微信小程序API发起支付
	 */
	public static JSONObject minAppPaySend(String openId, String out_trade_no, String total_fee, String mch_id, String body,String attach, String notify_url, String config_no, String auto,
			String auto_node, String key) throws PayException {
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
			params.put("openId", openId);
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.minAppPayUrl).form(params).execute().body();
			System.out.println(result);
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
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param body
	 *            商品描述
	 * @param openId
	 *            用户openId（调用授权接口获取）
	 * @param face_code
	 *            人脸凭证，通过摄像头配合微信刷脸SDK获得
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param config_no
	 *            分账配置单号。支持多个分账，使用,号分割
	 * @param auto
	 *            自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
	 * @param auto_node
	 *            执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
	 * @return FacePayBiz 人脸支付结果对象 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/facePay
	 */
	public static FacePayBiz facePay(String out_trade_no, String total_fee, String mch_id, String body, String openId, String face_code, String attach, String notify_url, String config_no,
			String auto, String auto_node, String key) throws PayException {
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
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.facePayUrl).form(params).execute().body();
			System.out.println(result);
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
	 * 微信H5支付
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param body
	 *            商品描述
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param return_url
	 *            同步回调地址，用户支付成功后从微信APP跳转回该地址。调转不会携带任何参数，如需携带参数请自行拼接
	 * @param config_no
	 *            分账配置单号。支持多个分账，使用,号分割
	 * @param auto
	 *            自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
	 * @param auto_node
	 *            执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
	 * @return 返回微信H5支付链接，重定向到该地址可打开微信H5进行支付
	 */
	public static String H5Pay(String out_trade_no, String total_fee, String mch_id, String body, String attach, String notify_url, String return_url, String config_no, String auto, String auto_node,
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
				throw new PayException("支付密钥不能为空！");
			}
			params.put("out_trade_no", out_trade_no);
			params.put("total_fee", total_fee);
			params.put("mch_id", mch_id);
			params.put("body", body);
			// 上述必传参数签名
			String sign = PaySignUtil.createSign(params, key);
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("return_url", return_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.wapPayUrl).form(params).execute().body();
			System.out.println(result);
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
	 * 微信APP支付
	 * 
	 * @param app_id
	 *            微信开放平台申请的APPID
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param body
	 *            商品描述
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param config_no
	 *            分账配置单号。支持多个分账，使用,号分割
	 * @param auto
	 *            自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
	 * @param auto_node
	 *            执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
	 * @return JSONObject 返回微信APP支付所需的参数 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/appPay
	 */
	public static JSONObject appPay(String app_id, String out_trade_no, String total_fee, String mch_id, String body, String attach, String notify_url, String config_no, String auto, String auto_node,
			String key) throws PayException {
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
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.appPayUrl).form(params).execute().body();
			System.out.println(result);
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
	 * 查询微信刷卡支付结果
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
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
			System.out.println(result);
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
	 * @param out_trade_no
	 *            订单号
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param money
	 *            退款金额
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
	 * @return refundOrder 退款订单对象 参考文档：http://open.pay.yungouos.com/#/api/api/pay/wxpay/refundOrder
	 */
	public static RefundOrder orderRefund(String out_trade_no, String mch_id, String money, String key) throws PayException {
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
			params.put("sign", sign);
			String result = HttpRequest.post(WxPayApiConfig.refundOrderUrl).form(params).execute().body();
			System.out.println(result);
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
	 * @param refund_no
	 *            退款单号，（由调用退款接口返回）
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》 支付密钥 查看密钥
	 * 
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
			System.out.println(result);
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
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param date
	 *            需要查询的结算日期，如：2020-01-23
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
	 * 
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
			System.out.println(result);
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
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param date
	 *            对账单日期，如：2020-01-23
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
	 * 
	 * @return WxDownloadBillBiz 对账单对象 参考文档：https://open.pay.yungouos.com/#/api/api/pay/wxpay/downloadBill
	 * 
	 */
	public static WxDownloadBillBiz downloadBill(String mch_id, String date, String key) throws PayException {
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
			params.put("sign", sign);
			String result = HttpRequest.get(WxPayApiConfig.getDownloadBillUrl).form(params).execute().body();
			// 对账单数据比较大 此处就不打印了
			// System.out.println(result);
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
	 * @param mch_id
	 *            微信支付商户号 登录YunGouOS.com-》微信支付-》商户管理 查看商户号
	 * @param status
	 *            状态 0：待处理 1：已处理
	 * @param order_no
	 *            系统单号
	 * @param out_trade_no
	 *            商户单号
	 * @param pay_no
	 *            支付单号
	 * @param start_time
	 *            起始时间
	 * @param end_time
	 *            结束时间
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》微信支付-》商户管理-》支付密钥 查看密钥
	 * 
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
			System.out.println(result);
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
	 * 获取微信授权URL 为了获取openid
	 * 
	 * @param param
	 *            额外参数，原路返回 需要json字符串
	 * @param url
	 *            授权结束后携带code返回的地址
	 * 
	 * @return 微信授权url，直接重定向到该地址
	 */
	public static String getWxOauthUrl(String param, String url) throws PayException {
		Map<String, Object> params = new HashMap<String, Object>();
		String resultUrl = null;
		try {
			if (StrUtil.isBlank(url)) {
				throw new PayException("url不能为空！");
			}
			params.put("url", url);
			params.put("params", param);
			String result = HttpRequest.post(WxPayApiConfig.getWxOauthUrl).form(params).execute().body();
			System.out.println(result);
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
	 * 根据授权返回的code，查询授权信息
	 * 
	 * @param code
	 *            授权结束后返回
	 * 
	 * @return WxOauthInfo 授权信息返回对象 参考文档：http://open.pay.yungouos.com/#/api/api/wxlogin/getBaseOauthInfo
	 */
	public static WxOauthInfo getWxOauthInfo(String code) throws PayException {
		Map<String, Object> params = new HashMap<String, Object>();
		WxOauthInfo wxOauthInfo = null;
		try {
			if (StrUtil.isBlank(code)) {
				throw new PayException("code为空！");
			}
			params.put("code", code);
			String result = HttpRequest.get(WxPayApiConfig.getWxOauthInfo).form(params).execute().body();
			System.out.println(result);
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
