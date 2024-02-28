package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 付款码支付返回对象
 *
 * @author YunGouOS技术部-029
 */
public class CodePayBiz implements Serializable {

    private static final long serialVersionUID = -2331633089278295809L;

    // 系统单号
    private String orderNo;

    // 商户单号
    private String outTradeNo;

    // 【none、paying、success】 除了success外，其他状态则还需调用【查询刷卡支付结果】进行查询订单状态
    private String status;

    //收款渠道，一码收接口返回
    private String channel;

    //收款金额，一码收接口返回
    private String money;

    //支付单号，一码收接口条件返回
    private String payNo;

    //支付时间，一码收接口条件返回
    private String payTime;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getPayNo() {
        return payNo;
    }

    public void setPayNo(String payNo) {
        this.payNo = payNo;
    }

    public String getPayTime() {
        return payTime;
    }

    public void setPayTime(String payTime) {
        this.payTime = payTime;
    }

    @Override
    public String toString() {
        return "CodePayBiz{" +
                "orderNo='" + orderNo + '\'' +
                ", outTradeNo='" + outTradeNo + '\'' +
                ", status='" + status + '\'' +
                ", channel='" + channel + '\'' +
                ", money='" + money + '\'' +
                ", payNo='" + payNo + '\'' +
                ", payTime='" + payTime + '\'' +
                '}';
    }
}
