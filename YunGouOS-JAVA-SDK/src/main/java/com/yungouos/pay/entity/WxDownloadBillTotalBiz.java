package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 对账单统计数据对象
 * 
 * @author YunGouOS技术部-029
 */
public class WxDownloadBillTotalBiz implements Serializable{

	private static final long serialVersionUID = -3891390243489416549L;

	private String orderMoney;
	
	private String billMoney;
	
	private String poundage;
	
	private String refundMoney;

	public String getOrderMoney() {
		return orderMoney;
	}

	public void setOrderMoney(String orderMoney) {
		this.orderMoney = orderMoney;
	}

	public String getBillMoney() {
		return billMoney;
	}

	public void setBillMoney(String billMoney) {
		this.billMoney = billMoney;
	}

	public String getPoundage() {
		return poundage;
	}

	public void setPoundage(String poundage) {
		this.poundage = poundage;
	}

	public String getRefundMoney() {
		return refundMoney;
	}

	public void setRefundMoney(String refundMoney) {
		this.refundMoney = refundMoney;
	}

	@Override
	public String toString() {
		return "WxDownloadBillTotalBiz [orderMoney=" + orderMoney + ", billMoney=" + billMoney + ", poundage=" + poundage + ", refundMoney=" + refundMoney + "]";
	}
	
	
	
}
