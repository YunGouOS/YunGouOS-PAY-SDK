package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 分账收款方查询结果对象
 * 
 * @author YunGouOS技术部-029
 *
 */
public class AllocateResultAccountBiz implements Serializable {

	private static final long serialVersionUID = 9026824920793153898L;

	private String account;

	private String amount;

	private String description;

	private String result;

	private String finishTime;
	
	private String failReason;


	public String getFailReason() {
		return failReason;
	}

	public void setFailReason(String failReason) {
		this.failReason = failReason;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getFinishTime() {
		return finishTime;
	}

	public void setFinishTime(String finishTime) {
		this.finishTime = finishTime;
	}

	@Override
	public String toString() {
		return "AllocateResultAccountBiz [account=" + account + ", amount=" + amount + ", description=" + description + ", result=" + result + ", finishTime=" + finishTime + ", failReason="
				+ failReason + "]";
	}

	
}
