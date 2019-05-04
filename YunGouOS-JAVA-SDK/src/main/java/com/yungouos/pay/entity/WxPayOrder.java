package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 查询订单对象
 * 
 * 
 * 
 * @action
 *
 * @author YunGouOS技术部-029
 *
 * @time 2019年4月29日 下午2:35:30
 *
 *
 */
public class WxPayOrder implements Serializable {

	private static final long serialVersionUID = -4279424921060096128L;

	// 系统订单号
	private String orderNo;

	// 商户订单号
	private String outTradeNo;

	// 微信支付订单号
	private String wxPayNo;

	// 支付金额
	private String money;

	// 商品简称
	private String body;

	// 微信支付商户号
	private String mchid;

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

	public void setWxPayNo(String wxPayNo) {
		this.wxPayNo = wxPayNo;
	}

	public String getWxPayNo() {
		return this.wxPayNo;
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

	@Override
	public String toString() {
		return "WxPayOrder [orderNo=" + orderNo + ", outTradeNo=" + outTradeNo + ", wxPayNo=" + wxPayNo + ", money=" + money + ", body=" + body + ", mchid=" + mchid + ", payType=" + payType
				+ ", attach=" + attach + ", payStatus=" + payStatus + ", addTime=" + addTime + "]";
	}
	
	

}
