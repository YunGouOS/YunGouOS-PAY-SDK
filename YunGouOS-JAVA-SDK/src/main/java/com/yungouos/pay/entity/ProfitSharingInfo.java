package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 分账信息对象
 * 
 * @author YunGouOS技术部-029
 *
 */
public class ProfitSharingInfo implements Serializable {

	private static final long serialVersionUID = -34026976523068320L;

	/**
	 * 分账支付状态【-1：支付失败、0：待支付、1：支付成功】
	 */
	private Integer status;

	/**
	 * 分账单号
	 */
	private String ps_no;

	/**
	 * 系统单号
	 */
	private String order_no;

	/**
	 * 商户单号
	 */
	private String out_trade_no;

	/**
	 * 支付单号（第三方支付单号）
	 */
	private String pay_no;

	/**
	 * 分账方商户号
	 */
	private String mch_id;

	/**
	 * 订单金额 单位：元
	 */
	private String order_money;

	/**
	 * 分账金额 单位：元
	 */
	private String money;

	/**
	 * 支付渠道（枚举值 wxpay、alipay）
	 */
	private String channel;

	/**
	 * 收款账户
	 */
	private String account;

	/**
	 * 分账描述
	 */
	private String desc;

	/**
	 * 分账支付时间
	 */
	private String pay_time;

	/**
	 * 分账失败原因，当分账失败时候才有值
	 */
	private String reason;

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getPs_no() {
		return ps_no;
	}

	public void setPs_no(String ps_no) {
		this.ps_no = ps_no;
	}

	public String getOrder_no() {
		return order_no;
	}

	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}

	public String getOut_trade_no() {
		return out_trade_no;
	}

	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}

	public String getPay_no() {
		return pay_no;
	}

	public void setPay_no(String pay_no) {
		this.pay_no = pay_no;
	}

	public String getMch_id() {
		return mch_id;
	}

	public void setMch_id(String mch_id) {
		this.mch_id = mch_id;
	}

	public String getOrder_money() {
		return order_money;
	}

	public void setOrder_money(String order_money) {
		this.order_money = order_money;
	}

	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getPay_time() {
		return pay_time;
	}

	public void setPay_time(String pay_time) {
		this.pay_time = pay_time;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	@Override
	public String toString() {
		return "ProfitSharingInfo [status=" + status + ", ps_no=" + ps_no + ", order_no=" + order_no + ", out_trade_no=" + out_trade_no + ", pay_no=" + pay_no + ", mch_id=" + mch_id + ", order_money="
				+ order_money + ", money=" + money + ", channel=" + channel + ", account=" + account + ", desc=" + desc + ", pay_time=" + pay_time + ", reason=" + reason + "]";
	}

	
}
