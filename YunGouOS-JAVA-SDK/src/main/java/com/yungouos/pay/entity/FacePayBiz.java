package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 刷脸支付返回结果对象
 * 
 * @author YunGouOS技术部-029
 *
 */
public class FacePayBiz implements Serializable{

	private static final long serialVersionUID = -1127069409458991423L;
	
	//系统单号
	private String orderNo;
	
	//商户单号
	private String outTradeNo;
	
	//支付金额
	private String money;

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

	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	@Override
	public String toString() {
		return "FacePayBiz [orderNo=" + orderNo + ", outTradeNo=" + outTradeNo + ", money=" + money + "]";
	}
	
	
	

}
