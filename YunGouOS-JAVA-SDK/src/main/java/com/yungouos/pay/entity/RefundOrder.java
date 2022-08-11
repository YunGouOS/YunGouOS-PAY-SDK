package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 退款对象
 *
 * @author YunGouOS技术部-029
 */
public class RefundOrder implements Serializable {

    private static final long serialVersionUID = -6651518662945260698L;

    // 系统退款单号
    private String refundNo;

    //系统单号
    private String orderNo;

    //商户订单号
    private String outTradeNo;

    // 商户自己传递的退款单号
    private String outTradeRefundNo;

    //支付单号
    private String payNo;

    //支付平台退款单号
    private String payRefundNo;

    // 退款金额
    private String refundMoney;

    //订单金额
    private String orderMoney;

    // 退款商户
    private String refundMchId;

    // 退款商户收款名称
    private String refundPayName;

    // 退款描述
    private String refundDesc;

    // 退款状态 0：待处理 1：已退款
    private int refundStatus;

    // 退款发起时间
    private String refundTime;

    //三方平台退款成功时间
    private String apiRefundTime;


    public String getRefundNo() {
        return refundNo;
    }

    public void setRefundNo(String refundNo) {
        this.refundNo = refundNo;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getOutTradeNo() {
        return outTradeNo;
    }

    public void setOutTradeNo(String outTradeNo) {
        this.outTradeNo = outTradeNo;
    }

    public String getOutTradeRefundNo() {
        return outTradeRefundNo;
    }

    public void setOutTradeRefundNo(String outTradeRefundNo) {
        this.outTradeRefundNo = outTradeRefundNo;
    }

    public String getPayNo() {
        return payNo;
    }

    public void setPayNo(String payNo) {
        this.payNo = payNo;
    }

    public String getPayRefundNo() {
        return payRefundNo;
    }

    public void setPayRefundNo(String payRefundNo) {
        this.payRefundNo = payRefundNo;
    }

    public String getRefundMoney() {
        return refundMoney;
    }

    public void setRefundMoney(String refundMoney) {
        this.refundMoney = refundMoney;
    }

    public String getOrderMoney() {
        return orderMoney;
    }

    public void setOrderMoney(String orderMoney) {
        this.orderMoney = orderMoney;
    }

    public String getRefundMchId() {
        return refundMchId;
    }

    public void setRefundMchId(String refundMchId) {
        this.refundMchId = refundMchId;
    }

    public String getRefundPayName() {
        return refundPayName;
    }

    public void setRefundPayName(String refundPayName) {
        this.refundPayName = refundPayName;
    }

    public String getRefundDesc() {
        return refundDesc;
    }

    public void setRefundDesc(String refundDesc) {
        this.refundDesc = refundDesc;
    }

    public int getRefundStatus() {
        return refundStatus;
    }

    public void setRefundStatus(int refundStatus) {
        this.refundStatus = refundStatus;
    }

    public String getRefundTime() {
        return refundTime;
    }

    public void setRefundTime(String refundTime) {
        this.refundTime = refundTime;
    }

    public String getApiRefundTime() {
        return apiRefundTime;
    }

    public void setApiRefundTime(String apiRefundTime) {
        this.apiRefundTime = apiRefundTime;
    }
}
