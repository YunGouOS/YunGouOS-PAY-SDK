package com.yungouos.pay.config;

/**
 *
 * YunGouOS黑名单API
 * 
 * @author YunGouOS技术部-029
 *
 */
public class PayBlackApiConfig {

	public static String apiUrl = "https://api.pay.yungouos.com";

	/**
	 * 添加黑名单
	 */
	public static String getCreateUrl = apiUrl + "/api/pay/black/create";

	/**
	 * 黑名单验证
	 */
	public static String getCheckUrl = apiUrl + "/api/pay/black/check";

}
