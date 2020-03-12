package com.yungouos.pay.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 
 * 查询分账结果对象
 * 
 * @author YunGouOS技术部-029
 *
 */
public class AllocateResultBiz implements Serializable {

	private static final long serialVersionUID = -441920037744247188L;

	private String psNo;

	private String orderNo;

	private String outTradeNo;

	private String payNo;

	private String apiPsNo;

	private Integer status;

	private String closeReason;

	private List<AllocateResultAccountBiz> accountResult;

	public String getPsNo() {
		return psNo;
	}

	public void setPsNo(String psNo) {
		this.psNo = psNo;
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

	public String getPayNo() {
		return payNo;
	}

	public void setPayNo(String payNo) {
		this.payNo = payNo;
	}

	public String getApiPsNo() {
		return apiPsNo;
	}

	public void setApiPsNo(String apiPsNo) {
		this.apiPsNo = apiPsNo;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getCloseReason() {
		return closeReason;
	}

	public void setCloseReason(String closeReason) {
		this.closeReason = closeReason;
	}

	public List<AllocateResultAccountBiz> getAccountResult() {
		return accountResult;
	}

	public void setAccountResult(List<AllocateResultAccountBiz> accountResult) {
		this.accountResult = accountResult;
	}

	@Override
	public String toString() {
		return "AllocateResultBiz [psNo=" + psNo + ", orderNo=" + orderNo + ", outTradeNo=" + outTradeNo + ", payNo=" + payNo + ", apiPsNo=" + apiPsNo + ", status=" + status + ", closeReason="
				+ closeReason + ", accountResult=" + accountResult + "]";
	}
	
	
}
