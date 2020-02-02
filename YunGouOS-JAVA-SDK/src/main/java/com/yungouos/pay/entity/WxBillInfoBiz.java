package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 微信结算信息对象
 * 
 * @author YunGouOS技术部-029
 */
public class WxBillInfoBiz implements Serializable {

	private static final long serialVersionUID = -5653859173171184664L;

	
	//微信商户号
	private String mchId;
	
	// 结算日期
	private String date;

	// 微信结算单号
	private String wxBillNo;

	// 微信结算状态 
	//-4：查询日期无结算信息
	//-3：微信结算单故障，微信未生成结算单
	//-2：微信打款失败，可尝试调用手动结算接口重新发起
	//-1：微信打款失败，银行拒收
	//0:待处理
	//1：处理中
	//2：结算完成 
	private Integer wxBillStatus;

	// 结算状态描述
	private String wxBillStatusText;

	// 微信结算失败原因
	private String wxBillFaildReason;

	//提现金额
	private String money;

	//微信结算创建
	private String addTime;

	//结算成功时间
	private String successTime;

	//结算单退还时间
	private String refundTime;

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getWxBillNo() {
		return wxBillNo;
	}

	public void setWxBillNo(String wxBillNo) {
		this.wxBillNo = wxBillNo;
	}

	public String getWxBillStatusText() {
		return wxBillStatusText;
	}

	public void setWxBillStatusText(String wxBillStatusText) {
		this.wxBillStatusText = wxBillStatusText;
	}

	public String getWxBillFaildReason() {
		return wxBillFaildReason;
	}

	public void setWxBillFaildReason(String wxBillFaildReason) {
		this.wxBillFaildReason = wxBillFaildReason;
	}

	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	public String getAddTime() {
		return addTime;
	}

	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}

	public String getSuccessTime() {
		return successTime;
	}

	public void setSuccessTime(String successTime) {
		this.successTime = successTime;
	}

	public String getRefundTime() {
		return refundTime;
	}

	public void setRefundTime(String refundTime) {
		this.refundTime = refundTime;
	}

	public Integer getWxBillStatus() {
		return wxBillStatus;
	}

	public void setWxBillStatus(Integer wxBillStatus) {
		this.wxBillStatus = wxBillStatus;
	}

	public String getMchId() {
		return mchId;
	}

	public void setMchId(String mchId) {
		this.mchId = mchId;
	}

	@Override
	public String toString() {
		return "WxBillInfoBiz [mchId=" + mchId + ", date=" + date + ", wxBillNo=" + wxBillNo + ", wxBillStatus=" + wxBillStatus + ", wxBillStatusText=" + wxBillStatusText + ", wxBillFaildReason="
				+ wxBillFaildReason + ", money=" + money + ", addTime=" + addTime + ", successTime=" + successTime + ", refundTime=" + refundTime + "]";
	}
}
