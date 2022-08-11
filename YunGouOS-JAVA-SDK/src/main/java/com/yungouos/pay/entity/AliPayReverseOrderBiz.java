package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 支付宝撤销订单结果对象
 *
 * @author YunGouOS技术部-029
 */
public class AliPayReverseOrderBiz implements Serializable {

    /**
     * 是否需要重试
     */
    private Boolean retry_flag;

    /**
     * 本次撤销触发的交易动作。【close：交易未支付】、【refund：交易已支付并退款】、【未返回：未查询到交易】
     */
    private String action;

    /**
     * 商户单号
     */
    private String out_trade_no;

    /**
     * 系统单号
     */
    private String order_no;

    /**
     * 支付单号
     */
    private String pay_no;

    public Boolean getRetry_flag() {
        return retry_flag;
    }

    public void setRetry_flag(Boolean retry_flag) {
        this.retry_flag = retry_flag;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getOut_trade_no() {
        return out_trade_no;
    }

    public void setOut_trade_no(String out_trade_no) {
        this.out_trade_no = out_trade_no;
    }

    public String getOrder_no() {
        return order_no;
    }

    public void setOrder_no(String order_no) {
        this.order_no = order_no;
    }

    public String getPay_no() {
        return pay_no;
    }

    public void setPay_no(String pay_no) {
        this.pay_no = pay_no;
    }

    @Override
    public String toString() {
        return "AliPayReverseOrderBiz{" +
                "retry_flag=" + retry_flag +
                ", action='" + action + '\'' +
                ", out_trade_no='" + out_trade_no + '\'' +
                ", order_no='" + order_no + '\'' +
                ", pay_no='" + pay_no + '\'' +
                '}';
    }
}
