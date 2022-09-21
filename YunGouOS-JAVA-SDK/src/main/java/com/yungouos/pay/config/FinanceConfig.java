package com.yungouos.pay.config;

/**
 * YunGouOS资金管理配置
 *
 * @author YunGouOS技术部-029
 */
public class FinanceConfig {

    public static String apiUrl = "https://api.pay.yungouos.com";

    /**
     * 分账配置
     */
    public static String getConfigUrl = apiUrl + "/api/finance/profitsharing/config";

    /**
     * 生成分账账单
     */
    public static String getCreateBillUrl = apiUrl + "/api/finance/profitsharing/createBill";

    /**
     * 分账支付
     */
    public static String getSendPayUrl = apiUrl + "/api/finance/profitsharing/sendPay";

    /**
     * 查询分账支付结果
     */
    public static String getPayResultUrl = apiUrl + "/api/finance/profitsharing/getInfo";

    /**
     * 停止分账
     */
    public static String getFinishUrl = apiUrl + "/api/finance/profitsharing/finish";

    /**
     * 微信转账
     */
    public static String getRePayWxPayUrl = apiUrl + "/api/finance/repay/wxpay";

    /**
     * 支付宝转账
     */
    public static String getRePayAliPayUrl = apiUrl + "/api/finance/repay/alipay";

    /**
     * 银行卡转账
     */
    public static String getRePayBankUrl = apiUrl + "/api/finance/repay/bank";

    /**
     * 查询转账结果
     */
    public static String getRePayInfoUrl = apiUrl + "/api/finance/repay/getRePayInfo";

    /**
     * 批量转账
     */
    public static String getBatchPayCreateUrl = apiUrl + "/api/finance/repay/batch/create";

    /**
     * 发起批量转账
     */
    public static String getBatchPaySendPayUrl = apiUrl + "/api/finance/repay/batch/sendPay";

    /**
     * 查询批量转账
     */
    public static String getBatchPayInfoUrl = apiUrl + "/api/finance/repay/batch/getBatchPayInfo";

    /**
     * 关闭批量转账
     */
    public static String getCloseBatchPayUrl = apiUrl + "/api/finance/repay/batch/close";
}
