package com.yungouos.pay.entity;

import java.io.Serializable;

public class RePayBiz implements Serializable {

	private static final long serialVersionUID = -7494800047999932198L;

	/**
	 * 用户昵称
	 */
	private String nickName;

	/**
	 * 付款单号
	 */
	private String orderNo;

	/**
	 * 商户单号
	 */
	private String outTradeNo;

	/**
	 * 收款方账户
	 */
	private String account;

	/**
	 * 收款方姓名
	 */
	private String accountName;

	/**
	 * 付款金额
	 */
	private String money;

	/**
	 * 手续费
	 */
	private String rate;

	/**
	 * 付款说明
	 */
	private String description;

	/**
	 * 付款方式【wxpay、alipay、bank】
	 */
	private String payType;

	/**
	 * 付款状态【-1：支付失败、0：待支付、1：支付成功】
	 */
	private Integer status;

	/**
	 * 失败原因
	 */
	private String reason;

	/**
	 * 第三方付款单号
	 */
	private String payNo;

	/**
	 * 支付时间
	 */
	private String payTime;

	/**
	 * 数据生成时间
	 */
	private String addTime;

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
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

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
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

	public String getAddTime() {
		return addTime;
	}

	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}

	@Override
	public String toString() {
		return "RePayBiz [nickName=" + nickName + ", orderNo=" + orderNo + ", outTradeNo=" + outTradeNo + ", account=" + account + ", accountName=" + accountName + ", money=" + money + ", rate="
				+ rate + ", description=" + description + ", payType=" + payType + ", status=" + status + ", reason=" + reason + ", payNo=" + payNo + ", payTime=" + payTime + ", addTime=" + addTime
				+ "]";
	}

	
}
