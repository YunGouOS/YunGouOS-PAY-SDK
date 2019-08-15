package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 查询订单对象
 * 
 * @author YunGouOS技术部-029
 *
 */
public class PayOrder implements Serializable {

	private static final long serialVersionUID = -4279424921060096128L;

	// 系统订单号
	private String orderNo;

	// 商户订单号
	private String outTradeNo;

	// 支付订单号
	private String payNo;

	// 支付金额
	private String money;

	// 商品简称
	private String body;

	// 支付商户号
	private String mchid;

	// 支付渠道
	private String payChannel;

	// 支付方式
	private String payType;

	// 附加数据
	private String attach;

	// 支付状态 0：未支付 1：已支付
	private int payStatus;

	// 下单时间
	private String addTime;

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOutTradeNo(String outTradeNo) {
		this.outTradeNo = outTradeNo;
	}

	public String getOutTradeNo() {
		return this.outTradeNo;
	}

	public String getPayNo() {
		return payNo;
	}

	public void setPayNo(String payNo) {
		this.payNo = payNo;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	public String getMoney() {
		return this.money;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getBody() {
		return this.body;
	}

	public void setMchid(String mchid) {
		this.mchid = mchid;
	}

	public String getMchid() {
		return this.mchid;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getPayType() {
		return this.payType;
	}

	public void setAttach(String attach) {
		this.attach = attach;
	}

	public String getAttach() {
		return this.attach;
	}

	public void setPayStatus(int payStatus) {
		this.payStatus = payStatus;
	}

	public int getPayStatus() {
		return this.payStatus;
	}

	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}

	public String getAddTime() {
		return this.addTime;
	}

	public String getPayChannel() {
		return payChannel;
	}

	public void setPayChannel(String payChannel) {
		this.payChannel = payChannel;
	}

	@Override
	public String toString() {
		return "PayOrder [orderNo=" + orderNo + ", outTradeNo=" + outTradeNo + ", payNo=" + payNo + ", money=" + money + ", body=" + body + ", mchid=" + mchid + ", payChannel=" + payChannel
				+ ", payType=" + payType + ", attach=" + attach + ", payStatus=" + payStatus + ", addTime=" + addTime + "]";
	}

}
