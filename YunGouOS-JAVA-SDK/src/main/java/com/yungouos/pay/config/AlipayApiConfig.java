package com.yungouos.pay.config;

/**
 * 
 * 支付宝API接口配置
 * 
 *
 * @author YunGouOS技术部-029
 *
 */
public class AlipayApiConfig {

	public static String apiUrl = "https://api.pay.yungouos.com";

	/**
	 * 扫码支付
	 */
	public static String nativeApiUrl = apiUrl + "/api/pay/alipay/nativePay";

	/**
	 * WAP支付
	 */
	public static String wapPayUrl = apiUrl + "/api/pay/alipay/wapPay";
	
	
	/**
	 * JS支付
	 */
	public static String jsPayUrl = apiUrl + "/api/pay/alipay/jsPay";

	/**
	 * 订单退款
	 */
	public static String refundOrderUrl = apiUrl + "/api/pay/alipay/refundOrder";

	/**
	 * 查询退款结果
	 */
	public static String getRefundResultUrl = apiUrl + "/api/pay/alipay/getRefundResult";

}
