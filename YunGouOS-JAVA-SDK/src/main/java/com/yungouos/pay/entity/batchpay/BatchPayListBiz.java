package com.yungouos.pay.entity.batchpay;

import java.io.Serializable;

/**
 * 付款单列表返回对象
 *
 * @author YunGouOS技术部-029
 */
public class BatchPayListBiz implements Serializable {

    /**
     * 批次单号
     */
    private String batchNo;

    /**
     * 批量代付明细号
     */
    private String orderNo;

    /**
     * 付款金额
     */
    private String money;

    /**
     * 收款账户
     */
    private String account;

    /**
     * 收款账户实名名称
     */
    private String accountName;

    /**
     * 银行名称
     */
    private String bankName;

    /**
     * 开户支行
     */
    private String bankOpenName;

    /**
     * 客户编号
     */
    private String userNo;

    /**
     * 账单标题
     */
    private String orderTitle;

    /**
     * 付款描述
     */
    private String description;

    /**
     * 数据生成时间
     */
    private String addTime;

    /**
     * 备注
     */
    private String remark;

    public String getBatchNo() {
        return batchNo;
    }

    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankOpenName() {
        return bankOpenName;
    }

    public void setBankOpenName(String bankOpenName) {
        this.bankOpenName = bankOpenName;
    }

    public String getUserNo() {
        return userNo;
    }

    public void setUserNo(String userNo) {
        this.userNo = userNo;
    }

    public String getOrderTitle() {
        return orderTitle;
    }

    public void setOrderTitle(String orderTitle) {
        this.orderTitle = orderTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "BatchPayListBiz{" +
                "batchNo='" + batchNo + '\'' +
                ", orderNo='" + orderNo + '\'' +
                ", money='" + money + '\'' +
                ", account='" + account + '\'' +
                ", accountName='" + accountName + '\'' +
                ", bankName='" + bankName + '\'' +
                ", bankOpenName='" + bankOpenName + '\'' +
                ", userNo='" + userNo + '\'' +
                ", orderTitle='" + orderTitle + '\'' +
                ", description='" + description + '\'' +
                ", addTime='" + addTime + '\'' +
                ", remark='" + remark + '\'' +
                '}';
    }
}
