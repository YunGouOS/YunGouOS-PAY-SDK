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
	 * 付款码支付
	 */
	public static String codePayUrl=apiUrl+"/api/pay/wxpay/codePay";
	
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
	 * 微信刷脸支付
	 */
	public static String facePayUrl=apiUrl+"/api/pay/wxpay/facePay";
	
	/**
	 * 微信h5支付
	 */
	public static String wapPayUrl=apiUrl+"/api/pay/wxpay/wapPay";
	
	/**
	 * 微信app支付
	 */
	public static String appPayUrl=apiUrl+"/api/pay/wxpay/appPay";
	
	/**
	 * 查询刷卡支付结果
	 */
	public static String getCodePayResultUrl=apiUrl+"/api/pay/wxpay/getCodePayResult";
	
	/**
	 * 订单退款
	 */
	public static String refundOrderUrl=apiUrl+"/api/pay/wxpay/refundOrder";
	
	
	/**
	 * 查询退款结果
	 */
	public static String getRefundResultUrl=apiUrl+"/api/pay/wxpay/getRefundResult";
	
	/**
	 * 查询结算信息
	 */
	public static String getWxBillInfoUrl=apiUrl+"/api/pay/wxpay/getWxBillInfo";
	
	/**
	 * 发起微信结算
	 */
	public static String getWxSendWxCashUrl=apiUrl+"/api/pay/wxpay/sendWxCash";
	
	/**
	 * 下载对账单
	 */
	public static String getDownloadBillUrl=apiUrl+"/api/pay/wxpay/downloadBill";
	
	/**
	 * 获取微信授权URL
	 */
	public static String getWxOauthUrl=apiUrl+"/api/wxlogin/getOauthUrl";
	
	
	/**
	 * 获取微信授权信息
	 */
	public static String getWxOauthInfo=apiUrl+"/api/wxlogin/getBaseOauthInfo";
	

}
