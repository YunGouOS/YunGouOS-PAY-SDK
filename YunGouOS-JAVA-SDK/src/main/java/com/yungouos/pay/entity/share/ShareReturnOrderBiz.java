package com.yungouos.pay.entity.share;

import java.io.Serializable;

/**
 * 分账回退对象
 *
 * @author YunGouOS技术部-029
 */
public class ShareReturnOrderBiz implements Serializable {

    /**
     * 回退状态【-1：回退失败、0：待回退、1：回退成功】
     */
    private Integer code;

    /**
     * 系统回退单号
     */
    private String return_no;

    /**
     * 商户回退单号
     */
    private String out_return_no;

    /**
     * 系统单号
     */
    private String order_no;

    /**
     * 商户单号
     */
    private String out_trade_no;

    /**
     * 支付单号
     */
    private String pay_no;

    /**
     * 分账单号
     */
    private String ps_no;

    /**
     * 支付商户号
     */
    private String mch_id;

    /**
     * 回退金额 单位：元
     */
    private String money;

    /**
     * 支付渠道（枚举值 wxpay、alipay）
     */
    private String channel;

    /**
     * 回退原因
     */
    private String desc;

    /**
     * 回退成功时间，回退成功才有值
     */
    private String pay_time;

    /**
     * 回退失败原因，只有回退失败的情况下才有
     */
    private String reason;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getReturn_no() {
        return return_no;
    }

    public void setReturn_no(String return_no) {
        this.return_no = return_no;
    }

    public String getOut_return_no() {
        return out_return_no;
    }

    public void setOut_return_no(String out_return_no) {
        this.out_return_no = out_return_no;
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

    public String getPs_no() {
        return ps_no;
    }

    public void setPs_no(String ps_no) {
        this.ps_no = ps_no;
    }

    public String getMch_id() {
        return mch_id;
    }

    public void setMch_id(String mch_id) {
        this.mch_id = mch_id;
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
        return "ShareReturnOrderBiz{" +
                "code=" + code +
                ", return_no='" + return_no + '\'' +
                ", out_return_no='" + out_return_no + '\'' +
                ", order_no='" + order_no + '\'' +
                ", out_trade_no='" + out_trade_no + '\'' +
                ", pay_no='" + pay_no + '\'' +
                ", ps_no='" + ps_no + '\'' +
                ", mch_id='" + mch_id + '\'' +
                ", money='" + money + '\'' +
                ", channel='" + channel + '\'' +
                ", desc='" + desc + '\'' +
                ", pay_time='" + pay_time + '\'' +
                ", reason='" + reason + '\'' +
                '}';
    }
}
