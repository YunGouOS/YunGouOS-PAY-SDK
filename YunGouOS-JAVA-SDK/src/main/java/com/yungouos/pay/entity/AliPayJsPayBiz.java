package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 支付宝JS支付返回对象
 * 
 * @author YunGouOS技术部-029
 *
 */
public class AliPayJsPayBiz implements Serializable {

	private static final long serialVersionUID = 6531315810366410868L;

	private String orderNo;

	private String outTradeNo;

	private String payNo;

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

	public String getPayNo() {
		return payNo;
	}

	public void setPayNo(String payNo) {
		this.payNo = payNo;
	}

	@Override
	public String toString() {
		return "AliPayJsPayBiz [orderNo=" + orderNo + ", outTradeNo=" + outTradeNo + ", payNo=" + payNo + "]";
	}
}
