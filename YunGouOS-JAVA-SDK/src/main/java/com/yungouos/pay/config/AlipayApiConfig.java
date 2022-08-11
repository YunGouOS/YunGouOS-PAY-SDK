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
	 * 付款码支付
	 */
	public static String codePayUrl = apiUrl + "/api/pay/alipay/codePay";


	/**
	 * 扫码支付
	 */
	public static String nativePayUrl = apiUrl + "/api/pay/alipay/nativePay";

	/**
	 * WAP支付
	 */
	public static String wapPayUrl = apiUrl + "/api/pay/alipay/wapPay";
	
	
	/**
	 * JS支付
	 */
	public static String jsPayUrl = apiUrl + "/api/pay/alipay/jsPay";
	
	/**
	 * H5支付
	 */
	public static String h5PayUrl = apiUrl + "/api/pay/alipay/mobilePay";
	
	
	/**
	 * APP支付
	 */
	public static String appPayUrl = apiUrl + "/api/pay/alipay/appPay";


	/**
	 * 电脑网站支付
	 */
	public static String webPayUrl = apiUrl + "/api/pay/alipay/webPay";


	/**
	 * 关闭订单
	 */
	public static String closeOrderUrl = apiUrl + "/api/pay/alipay/closeOrder";

	/**
	 * 撤销订单
	 */
	public static String reverseOrderUrl = apiUrl + "/api/pay/alipay/reverseOrder";

	/**
	 * 订单退款
	 */
	public static String refundOrderUrl = apiUrl + "/api/pay/alipay/refundOrder";

	/**
	 * 查询退款结果
	 */
	public static String getRefundResultUrl = apiUrl + "/api/pay/alipay/getRefundResult";

}
