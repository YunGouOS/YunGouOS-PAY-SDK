package com.yungouos.pay.config;

/**
 * 聚合支付接口配置
 *
 * @author YunGouOS技术部-029
 */
public class MergePayApiConfig {

    public static String apiUrl = "https://api.pay.yungouos.com";


    /**
     * 一码付
     */
    public static String nativePayUrl = apiUrl + "/api/pay/merge/nativePay";

    /**
     * 一码收
     */
    public static String codePayUrl = apiUrl + "/api/pay/merge/codePay";

}
