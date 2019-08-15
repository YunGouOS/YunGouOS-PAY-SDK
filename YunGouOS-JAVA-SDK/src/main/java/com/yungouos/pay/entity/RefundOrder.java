package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 退款对象
 * 
 * 
 * @author YunGouOS技术部-029
 *
 *
 */
public class RefundOrder implements Serializable {

	private static final long serialVersionUID = -6651518662945260698L;

	// 退款编号
	private String refundNo;

	// 业务订单号
	private String serviceNo;

	// 用户ID
	private int userId;

	// 退款商户
	private String refundMchId;

	// 退款商户收款名称
	private String refundPayName;

	// 退款金额
	private String refundMoney;

	// 退款描述
	private String refundDesc;

	// 退款类型 0 微信退款 1 支付宝退款
	private int refundType;

	// 退款状态 0：待处理 1：已处理
	private int refundStatus;

	public void setRefundNo(String refundNo) {
		this.refundNo = refundNo;
	}

	public String getRefundNo() {
		return this.refundNo;
	}

	public void setServiceNo(String serviceNo) {
		this.serviceNo = serviceNo;
	}

	public String getServiceNo() {
		return this.serviceNo;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getUserId() {
		return this.userId;
	}

	public void setRefundMchId(String refundMchId) {
		this.refundMchId = refundMchId;
	}

	public String getRefundMchId() {
		return this.refundMchId;
	}

	public void setRefundPayName(String refundPayName) {
		this.refundPayName = refundPayName;
	}

	public String getRefundPayName() {
		return this.refundPayName;
	}

	public void setRefundMoney(String refundMoney) {
		this.refundMoney = refundMoney;
	}

	public String getRefundMoney() {
		return this.refundMoney;
	}

	public void setRefundDesc(String refundDesc) {
		this.refundDesc = refundDesc;
	}

	public String getRefundDesc() {
		return this.refundDesc;
	}

	public void setRefundType(int refundType) {
		this.refundType = refundType;
	}

	public int getRefundType() {
		return this.refundType;
	}

	public void setRefundStatus(int refundStatus) {
		this.refundStatus = refundStatus;
	}

	public int getRefundStatus() {
		return this.refundStatus;
	}

	@Override
	public String toString() {
		return "RefundOrder [refundNo=" + refundNo + ", serviceNo=" + serviceNo + ", userId=" + userId + ", refundMchId=" + refundMchId + ", refundPayName=" + refundPayName + ", refundMoney="
				+ refundMoney + ", refundDesc=" + refundDesc + ", refundType=" + refundType + ", refundStatus=" + refundStatus + "]";
	}

}
