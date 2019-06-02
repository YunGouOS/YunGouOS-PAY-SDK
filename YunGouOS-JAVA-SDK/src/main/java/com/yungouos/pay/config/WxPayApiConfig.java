package com.yungouos.pay.config;

/**
 * 
 * 微信支付接口配置
 * 
 *
 * @author YunGouOS技术部-029
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
	 * 收银台支付
	 */
	public static String cashierUrl=apiUrl+"/api/pay/wxpay/cashierPay";
	
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
