package com.yungouos.pay.entity.qqpay;

import java.io.Serializable;

/**
 * QQ小程序支付对象
 * @author YunGouOS技术部-029
 */
public class QqPayBiz implements Serializable {

    /**
     * 系统单号
     */
    private String orderNo;

    /**
     * 商户单号
     */
    private String outTradeNo;

    /**
     * qq.requestWxPayment发起小程序支付所需的参数
     */
    private QqMinPayParam minPayParam;

    /**
     * 收银台显示参数
     */
    private QqCashierParam cashierParam;

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

    public QqMinPayParam getMinPayParam() {
        return minPayParam;
    }

    public void setMinPayParam(QqMinPayParam minPayParam) {
        this.minPayParam = minPayParam;
    }

    public QqCashierParam getCashierParam() {
        return cashierParam;
    }

    public void setCashierParam(QqCashierParam cashierParam) {
        this.cashierParam = cashierParam;
    }

    @Override
    public String toString() {
        return "QqPayBiz{" +
                "orderNo='" + orderNo + '\'' +
                ", outTradeNo='" + outTradeNo + '\'' +
                ", minPayParam=" + minPayParam +
                ", cashierParam=" + cashierParam +
                '}';
    }
}
