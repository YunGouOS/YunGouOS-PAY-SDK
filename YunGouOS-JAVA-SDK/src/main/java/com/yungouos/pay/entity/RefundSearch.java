package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 退款查询
 * 
 * 
 * @action
 *
 * @author YunGouOS技术部-029
 *
 * @time 2019年4月29日 下午3:05:25
 *
 *
 */
public class RefundSearch implements Serializable {

	private static final long serialVersionUID = 6567449462295807761L;

	//微信支付订单号
	private String transaction_id;

	//随机数
	private String nonce_str;

	//退款单号
	private String out_refund_no_0;

	//退款状态
	private String refund_status_0;

	//退款金额
	private String refund_fee_0;

	//退款账户
	private String refund_recv_accout_0;

	//返回文字提示
	private String return_msg;

	//退款成功时间
	private String refund_success_time_0;

	private String sub_mch_id;

	private String cash_fee;

	private String refund_id_0;

	private String out_trade_no;

	private String appid;
	
	private String refund_fee;

	private String total_fee;

	private String result_code;

	private String refund_account_0;

	private String refund_count;

	private String return_code;

	private String refund_channel_0;

	public void setTransaction_id(String transaction_id) {
		this.transaction_id = transaction_id;
	}

	public String getTransaction_id() {
		return this.transaction_id;
	}

	public void setNonce_str(String nonce_str) {
		this.nonce_str = nonce_str;
	}

	public String getNonce_str() {
		return this.nonce_str;
	}

	public void setOut_refund_no_0(String out_refund_no_0) {
		this.out_refund_no_0 = out_refund_no_0;
	}

	public String getOut_refund_no_0() {
		return this.out_refund_no_0;
	}

	public void setRefund_status_0(String refund_status_0) {
		this.refund_status_0 = refund_status_0;
	}

	public String getRefund_status_0() {
		return this.refund_status_0;
	}

	public void setRefund_fee_0(String refund_fee_0) {
		this.refund_fee_0 = refund_fee_0;
	}

	public String getRefund_fee_0() {
		return this.refund_fee_0;
	}

	public void setRefund_recv_accout_0(String refund_recv_accout_0) {
		this.refund_recv_accout_0 = refund_recv_accout_0;
	}

	public String getRefund_recv_accout_0() {
		return this.refund_recv_accout_0;
	}

	public void setReturn_msg(String return_msg) {
		this.return_msg = return_msg;
	}

	public String getReturn_msg() {
		return this.return_msg;
	}

	public void setRefund_success_time_0(String refund_success_time_0) {
		this.refund_success_time_0 = refund_success_time_0;
	}

	public String getRefund_success_time_0() {
		return this.refund_success_time_0;
	}

	public void setSub_mch_id(String sub_mch_id) {
		this.sub_mch_id = sub_mch_id;
	}

	public String getSub_mch_id() {
		return this.sub_mch_id;
	}

	public void setCash_fee(String cash_fee) {
		this.cash_fee = cash_fee;
	}

	public String getCash_fee() {
		return this.cash_fee;
	}

	public void setRefund_id_0(String refund_id_0) {
		this.refund_id_0 = refund_id_0;
	}

	public String getRefund_id_0() {
		return this.refund_id_0;
	}

	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}

	public String getOut_trade_no() {
		return this.out_trade_no;
	}

	public void setAppid(String appid) {
		this.appid = appid;
	}

	public String getAppid() {
		return this.appid;
	}

	public void setRefund_fee(String refund_fee) {
		this.refund_fee = refund_fee;
	}

	public String getRefund_fee() {
		return this.refund_fee;
	}

	public void setTotal_fee(String total_fee) {
		this.total_fee = total_fee;
	}

	public String getTotal_fee() {
		return this.total_fee;
	}

	public void setResult_code(String result_code) {
		this.result_code = result_code;
	}

	public String getResult_code() {
		return this.result_code;
	}

	public void setRefund_account_0(String refund_account_0) {
		this.refund_account_0 = refund_account_0;
	}

	public String getRefund_account_0() {
		return this.refund_account_0;
	}

	public void setRefund_count(String refund_count) {
		this.refund_count = refund_count;
	}

	public String getRefund_count() {
		return this.refund_count;
	}

	public void setReturn_code(String return_code) {
		this.return_code = return_code;
	}

	public String getReturn_code() {
		return this.return_code;
	}

	public void setRefund_channel_0(String refund_channel_0) {
		this.refund_channel_0 = refund_channel_0;
	}

	public String getRefund_channel_0() {
		return this.refund_channel_0;
	}
}
