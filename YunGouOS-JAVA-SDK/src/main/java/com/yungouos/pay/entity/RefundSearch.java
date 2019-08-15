package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 退款查询
 * 
 * 
 * @author YunGouOS技术部-029
 *
 */
public class RefundSearch implements Serializable {
	


	private static final long serialVersionUID = -7274078882883090441L;

	// 退款单号
	private String refundNo;
	
	//系统单号
	private String orderNo;

	// 商户订单号
	private String outTradeNo;

	// 微信支付单号
	private String payNo;

	// 微信退款单号
	private String payRefundNo;

	// 申请退款金额
	private String refundMoney;

	// 订单金额
	private String orderMoney;

	// 退款商户
	private String refundMchId;

	// 退款商户收款名称
	private String refundPayName;

	// 退款描述
	private String refundDesc;

	// 退款状态 0：待处理 1：已处理
	private int refundStatus;

	// API退款时间
	private String apiRefundTime;

	// 退款发起时间
	private String refundTime;

	public String getRefundNo() {
		return refundNo;
	}

	public void setRefundNo(String refundNo) {
		this.refundNo = refundNo;
	}

	public String getOutTradeNo() {
		return outTradeNo;
	}

	public void setOutTradeNo(String outTradeNo) {
		this.outTradeNo = outTradeNo;
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

	public String getApiRefundTime() {
		return apiRefundTime;
	}

	public void setApiRefundTime(String apiRefundTime) {
		this.apiRefundTime = apiRefundTime;
	}

	public String getRefundTime() {
		return refundTime;
	}

	public void setRefundTime(String refundTime) {
		this.refundTime = refundTime;
	}
	
	
	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
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

	@Override
	public String toString() {
		return "RefundSearch [refundNo=" + refundNo + ", orderNo=" + orderNo + ", outTradeNo=" + outTradeNo + ", payNo=" + payNo + ", payRefundNo=" + payRefundNo + ", refundMoney=" + refundMoney
				+ ", orderMoney=" + orderMoney + ", refundMchId=" + refundMchId + ", refundPayName=" + refundPayName + ", refundDesc=" + refundDesc + ", refundStatus=" + refundStatus
				+ ", apiRefundTime=" + apiRefundTime + ", refundTime=" + refundTime + "]";
	}

	
	

	
	

}
