package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 微信对账单list中对象
 * 
 * @author YunGouOS技术部-029
 */
public class WxDownloadBillInfoBiz implements Serializable {

	private static final long serialVersionUID = 7171143641614913748L;

	/**
	 * 交易时间
	 */
	private String date;

	/**
	 * 商户号
	 */
	private String mchId;

	/**
	 * 设备信息
	 */
	private String deviceInfo;

	/**
	 * 支付单号
	 */
	private String payNo;

	/**
	 * 订单号
	 */
	private String orderNo;

	/**
	 * 商户单号
	 */
	private String outTradeNo;

	/**
	 * openid
	 */
	private String openId;

	/**
	 * 支付方式
	 */
	private String payType;

	/**
	 * 支付状态
	 */
	private String payStatus;

	/**
	 * 付款银行
	 */
	private String payBank;

	/**
	 * 货币种类
	 */
	private String currency;

	/**
	 * 应结金额
	 */
	private String billMoney;

	/**
	 * 企业红包金额 代金券金额
	 */
	private String envelopeAmount;

	/**
	 * 微信退款单号
	 */
	private String payRefundNo;

	/**
	 * 商户退款单号
	 */
	private String refundNo;

	/**
	 * 退款金额
	 */
	private String refundMoney;

	/**
	 * 折扣退款金额
	 */
	private String refundEnvelopeAmount;

	/**
	 * 退款类型
	 */
	private String refundType;

	/**
	 * 退款状态
	 */
	private String refundStatus;

	/**
	 * 商品名称
	 */
	private String body;

	/**
	 * 商户数据包
	 */
	private String attach;

	/**
	 * 手续费
	 */
	private String poundage;

	/**
	 * 费率
	 */
	private String rate;

	/**
	 * 总金额
	 */
	private String money;

	/**
	 * 申请退款金额
	 */
	private String applyRefundMoney;

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getMchId() {
		return mchId;
	}

	public void setMchId(String mchId) {
		this.mchId = mchId;
	}

	public String getDeviceInfo() {
		return deviceInfo;
	}

	public void setDeviceInfo(String deviceInfo) {
		this.deviceInfo = deviceInfo;
	}

	public String getPayNo() {
		return payNo;
	}

	public void setPayNo(String payNo) {
		this.payNo = payNo;
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

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getPayStatus() {
		return payStatus;
	}

	public void setPayStatus(String payStatus) {
		this.payStatus = payStatus;
	}

	public String getPayBank() {
		return payBank;
	}

	public void setPayBank(String payBank) {
		this.payBank = payBank;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getBillMoney() {
		return billMoney;
	}

	public void setBillMoney(String billMoney) {
		this.billMoney = billMoney;
	}

	public String getEnvelopeAmount() {
		return envelopeAmount;
	}

	public void setEnvelopeAmount(String envelopeAmount) {
		this.envelopeAmount = envelopeAmount;
	}

	public String getPayRefundNo() {
		return payRefundNo;
	}

	public void setPayRefundNo(String payRefundNo) {
		this.payRefundNo = payRefundNo;
	}

	public String getRefundNo() {
		return refundNo;
	}

	public void setRefundNo(String refundNo) {
		this.refundNo = refundNo;
	}

	public String getRefundMoney() {
		return refundMoney;
	}

	public void setRefundMoney(String refundMoney) {
		this.refundMoney = refundMoney;
	}

	public String getRefundEnvelopeAmount() {
		return refundEnvelopeAmount;
	}

	public void setRefundEnvelopeAmount(String refundEnvelopeAmount) {
		this.refundEnvelopeAmount = refundEnvelopeAmount;
	}

	public String getRefundType() {
		return refundType;
	}

	public void setRefundType(String refundType) {
		this.refundType = refundType;
	}

	public String getRefundStatus() {
		return refundStatus;
	}

	public void setRefundStatus(String refundStatus) {
		this.refundStatus = refundStatus;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getAttach() {
		return attach;
	}

	public void setAttach(String attach) {
		this.attach = attach;
	}

	public String getPoundage() {
		return poundage;
	}

	public void setPoundage(String poundage) {
		this.poundage = poundage;
	}

	public String getRate() {
		return rate;
	}

	public void setRate(String rate) {
		this.rate = rate;
	}

	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	public String getApplyRefundMoney() {
		return applyRefundMoney;
	}

	public void setApplyRefundMoney(String applyRefundMoney) {
		this.applyRefundMoney = applyRefundMoney;
	}

	@Override
	public String toString() {
		return "WxDownloadBillInfoBiz [date=" + date + ", mchId=" + mchId + ", deviceInfo=" + deviceInfo + ", payNo=" + payNo + ", orderNo=" + orderNo + ", outTradeNo=" + outTradeNo + ", openId="
				+ openId + ", payType=" + payType + ", payStatus=" + payStatus + ", payBank=" + payBank + ", currency=" + currency + ", billMoney=" + billMoney + ", envelopeAmount=" + envelopeAmount
				+ ", payRefundNo=" + payRefundNo + ", refundNo=" + refundNo + ", refundMoney=" + refundMoney + ", refundEnvelopeAmount=" + refundEnvelopeAmount + ", refundType=" + refundType
				+ ", refundStatus=" + refundStatus + ", body=" + body + ", attach=" + attach + ", poundage=" + poundage + ", rate=" + rate + ", money=" + money + ", applyRefundMoney="
				+ applyRefundMoney + "]";
	}
	
	

}
