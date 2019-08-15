package com.yungouos.pay.config;

/**
 *
 * YunGouOS订单接口配置
 * 
 * @author YunGouOS技术部-029
 *
 */
public class OrderApiConfig {

	public static String apiUrl = "https://api.pay.yungouos.com";

	/**
	 * 订单查询
	 */
	public static String getOrderUrl = apiUrl + "/api/system/order/getPayOrderInfo";

}
