package com.yungouos.pay.config;

/**
 * 
 * 微信支付接口配置
 * 
 * @action
 *
 * @author YunGouOS技术部-029
 *
 * @time 2019年4月28日 下午2:01:34
 *
 *
 */
public class WxPayApiConfig {

	public static String apiUrl = "https://api.pay.yungouos.com";

	/**
	 * 扫码支付
	 */
	public static String nativeApiUrl = apiUrl + "/api/pay/wxpay/nativeApi";

	/**
	 * 公众号支付
	 */
	public static String jsapiUrl = apiUrl + "/api/pay/wxpay/jsapi";
	
	
	/**
	 * 订单查询
	 */
	public static String getOrderUrl=apiUrl+"/api/pay/wxpay/getWxPayOrderInfo";
	
	
	/**
	 * 订单退款
	 */
	public static String refundOrderUrl=apiUrl+"/api/pay/wxpay/refundOrder";
	
	
	/**
	 * 查询退款结果
	 */
	public static String getRefundResultUrl=apiUrl+"/api/pay/wxpay/getRefundResult";
	

}
