package com.yungouos.pay.alipay;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.common.PayException;
import com.yungouos.pay.config.AlipayApiConfig;
import com.yungouos.pay.entity.AliPayJsPayBiz;
import com.yungouos.pay.entity.PayOrder;
import com.yungouos.pay.entity.RefundOrder;
import com.yungouos.pay.entity.RefundSearch;
import com.yungouos.pay.util.PaySignUtil;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpRequest;

/**
 * 
 * YunGouOS支付宝支付API接口对接
 * 
 * @author YunGouOS技术部-029
 *
 */
public class AliPay {

	/**
	 * 支付宝扫码支付
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
	 * @param body
	 *            商品描述
	 * @param type
	 *            返回类型（1、返回支付宝原生的支付连接需要自行生成二维码；2、直接返回付款二维码地址，页面上展示即可。不填默认1 ）
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
	 *            支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
	 * @return 支付二维码连接
	 */
	public static String nativePay(String out_trade_no, String total_fee, String mch_id, String body, String type, String attach, String notify_url,String config_no,
			String auto, String auto_node, String key) throws PayException {
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
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
			params.put("sign", sign);
			String result = HttpRequest.post(AlipayApiConfig.nativeApiUrl).form(params).execute().body();
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
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
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
	 *            支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
	 * @return wap支付连接，重定向到该地址自动打开支付APP付款
	 */
	public static String wapPay(String out_trade_no, String total_fee, String mch_id, String body, String attach, String notify_url,String config_no,
			String auto, String auto_node, String key) throws PayException {
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
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
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
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
	 * @param buyer_id
	 *            买家的支付宝唯一用户号（2088开头的16位纯数字）
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
	 *            支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
	 * @return 支付宝JSSDK所需的对象数据 参考：https://open.pay.yungouos.com/#/api/api/pay/alipay/jsPay
	 */
	public static AliPayJsPayBiz jsPay(String out_trade_no, String total_fee, String mch_id, String buyer_id, String body, String attach, String notify_url,String config_no,
			String auto, String auto_node, String key) throws PayException {
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
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
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
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
	 * @param body
	 *            商品描述
	 * @param attach
	 *            附加数据 回调时原路返回 可不传
	 * @param notify_url
	 *            异步回调地址，不传无回调
	 * @param return_url
	 *            同步回调地址，用户支付成功后或取消支付都会跳转回到该地址
	 * @param config_no
	 *            分账配置单号。支持多个分账，使用,号分割
	 * @param auto
	 *            自动分账（0：关闭 1：开启。不填默认0）开启后系统将依据分账节点自动进行分账任务，反之则需商户自行调用【请求分账】执行
	 * @param auto_node
	 *            执行分账动作的节点，枚举值【pay、callback】分别表示 【付款成功后分账、回调成功后分账】           
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
	 * @return 拉起H5页面的form表单
	 */
	public static String h5Pay(String out_trade_no, String total_fee, String mch_id, String body, String attach, String notify_url, String return_url,String config_no,
			String auto, String auto_node, String key) throws PayException {
		Map<String, Object> params = new HashMap<String, Object>();
		String form = null;
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
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("return_url", return_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
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
			form = data.getString("form");
			if (StrUtil.isBlank(form)) {
				throw new PayException("H5下单失败");
			}
		} catch (PayException e) {
			e.printStackTrace();
			throw new PayException(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			throw new PayException(e.getMessage());
		}
		return form;
	}

	/**
	 * APP支付
	 * 
	 * @param out_trade_no
	 *            订单号 不可重复
	 * @param total_fee
	 *            支付金额 单位：元 范围：0.01-99999
	 * @param mch_id
	 *            支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
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
	 *            支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
	 * @return APP支付所需的参数
	 */
	public static String appPay(String out_trade_no, String total_fee, String mch_id, String body, String attach, String notify_url,String config_no,
			String auto, String auto_node, String key) throws PayException {
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
			params.put("attach", attach);
			params.put("notify_url", notify_url);
			params.put("config_no", config_no);
			params.put("auto", auto);
			params.put("auto_node", auto_node);
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
	 * 订单退款
	 * 
	 * @param out_trade_no
	 *            订单号
	 * @param mch_id
	 *            支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
	 * @param money
	 *            退款金额
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
	 * @return refundOrder 退款订单对象 参考文档：http://open.pay.yungouos.com/#/api/api/pay/alipay/refundOrder
	 */
	public static RefundOrder orderRefund(String out_trade_no, String mch_id, String money, String refund_desc, String key) throws PayException {
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
			params.put("refund_desc", refund_desc);
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
	 * @param refund_no
	 *            退款单号，（由调用退款接口返回）
	 * @param mch_id
	 *            支付宝商户号 登录YunGouOS.com-》支付宝-》商户管理 查看商户号
	 * @param key
	 *            支付密钥 登录YunGouOS.com-》支付宝-》商户管理-》支付密钥 查看密钥
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
