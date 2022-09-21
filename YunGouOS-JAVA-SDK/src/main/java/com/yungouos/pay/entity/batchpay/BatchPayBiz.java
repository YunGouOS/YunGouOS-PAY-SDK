package com.yungouos.pay.entity.batchpay;

import java.io.Serializable;
import java.util.List;

/**
 * 批量转账付款对象
 *
 * @author YunGouOS技术部-029
 */
public class BatchPayBiz implements Serializable {

    /**
     * 批次单号
     */
    private String batchNo;

    /**
     * 商户订单号
     */
    private String outTradeNo;

    /**
     * 收银台订单标题
     */
    private String orderTitle;

    /**
     * 出资商户号
     */
    private String mchId;

    /**
     * 商户号实名名称
     */
    private String mchName;

    /**
     * 总金额
     */
    private String money;

    /**
     * 手续费总额
     */
    private String rate;

    /**
     * 总笔数
     */
    private Integer count;

    /**
     * 超时时间
     */
    private String timeExpire;

    /**
     * 转账备注
     */
    private String description;

    /**
     * 付款方式【wxpay、alipay、bank】
     */
    private String payType;

    /**
     * 付款渠道【wxpay、alipay】
     */
    private String channel;

    /**
     * 数据生成时间
     */
    private String addTime;

    /**
     * 关联转账单号
     */
    private List<BatchPayListBiz> batchPayList;

    public String getBatchNo() {
        return batchNo;
    }

    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }

    public String getOutTradeNo() {
        return outTradeNo;
    }

    public void setOutTradeNo(String outTradeNo) {
        this.outTradeNo = outTradeNo;
    }

    public String getOrderTitle() {
        return orderTitle;
    }

    public void setOrderTitle(String orderTitle) {
        this.orderTitle = orderTitle;
    }

    public String getMchId() {
        return mchId;
    }

    public void setMchId(String mchId) {
        this.mchId = mchId;
    }

    public String getMchName() {
        return mchName;
    }

    public void setMchName(String mchName) {
        this.mchName = mchName;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getTimeExpire() {
        return timeExpire;
    }

    public void setTimeExpire(String timeExpire) {
        this.timeExpire = timeExpire;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }

    public List<BatchPayListBiz> getBatchPayList() {
        return batchPayList;
    }

    public void setBatchPayList(List<BatchPayListBiz> batchPayList) {
        this.batchPayList = batchPayList;
    }

    @Override
    public String toString() {
        return "BatchPayBiz{" +
                "batchNo='" + batchNo + '\'' +
                ", outTradeNo='" + outTradeNo + '\'' +
                ", orderTitle='" + orderTitle + '\'' +
                ", mchId='" + mchId + '\'' +
                ", mchName='" + mchName + '\'' +
                ", money='" + money + '\'' +
                ", rate='" + rate + '\'' +
                ", count=" + count +
                ", timeExpire='" + timeExpire + '\'' +
                ", description='" + description + '\'' +
                ", payType='" + payType + '\'' +
                ", channel='" + channel + '\'' +
                ", addTime='" + addTime + '\'' +
                ", batchPayList=" + batchPayList +
                '}';
    }
}
