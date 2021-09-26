package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 支付宝付款码支付业务对象
 * 
 *
 * @author YunGouOS技术部-029
 *
 */
public class AliPayCodePayBiz implements Serializable {

	private static final long serialVersionUID = 1793913344882190204L;

	/**
	 * 系统单号
	 */
	private String orderNo;

	/**
	 * 商户单号
	 */
	private String outTradeNo;

	/**
	 * 支付单号
	 */
	private String payNo;

	/**
	 * 实收金额
	 */
	private String money;

	/**
	 * 支付时间
	 */
	private String payTime;

	public String getPayNo() {
		return payNo;
	}

	public void setPayNo(String payNo) {
		this.payNo = payNo;
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

	public String getPayTime() {
		return payTime;
	}

	public void setPayTime(String payTime) {
		this.payTime = payTime;
	}

	public String getOutTradeNo() {
		return outTradeNo;
	}

	public void setOutTradeNo(String outTradeNo) {
		this.outTradeNo = outTradeNo;
	}

	@Override
	public String toString() {
		return "AliPayCodePayBiz [orderNo=" + orderNo + ", outTradeNo=" + outTradeNo + ", payNo=" + payNo + ", money=" + money + ", payTime=" + payTime + "]";
	}

	
}
