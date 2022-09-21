package com.yungouos.pay.entity.batchpay;

import java.io.Serializable;
import java.util.List;

/**
 * 批量转账查询结果对象
 *
 * @author YunGouOS技术部-029
 */
public class BatchPayInfoBiz implements Serializable {

    private Integer status;

    private String batch_no;

    private String out_trade_no;

    private String pay_no;

    private String pay_time;

    private String mch_id;

    private String money;

    private String rate;

    private Integer count;

    private String pay_type;

    private String channel;

    private Integer success_count;

    private String success_money;

    private List<BatchPayListInfoBiz> success_list;

    private Integer fail_count;

    private String fail_money;

    private List<BatchPayListInfoBiz> fail_list;

    private String reason;

    private String description;

    private String add_time;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getBatch_no() {
        return batch_no;
    }

    public void setBatch_no(String batch_no) {
        this.batch_no = batch_no;
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

    public String getPay_time() {
        return pay_time;
    }

    public void setPay_time(String pay_time) {
        this.pay_time = pay_time;
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

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getPay_type() {
        return pay_type;
    }

    public void setPay_type(String pay_type) {
        this.pay_type = pay_type;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public Integer getSuccess_count() {
        return success_count;
    }

    public void setSuccess_count(Integer success_count) {
        this.success_count = success_count;
    }

    public String getSuccess_money() {
        return success_money;
    }

    public void setSuccess_money(String success_money) {
        this.success_money = success_money;
    }

    public List<BatchPayListInfoBiz> getSuccess_list() {
        return success_list;
    }

    @Override
    public String toString() {
        return "BatchPayInfoBiz{" +
                "status=" + status +
                ", batch_no='" + batch_no + '\'' +
                ", out_trade_no='" + out_trade_no + '\'' +
                ", pay_no='" + pay_no + '\'' +
                ", pay_time='" + pay_time + '\'' +
                ", mch_id='" + mch_id + '\'' +
                ", money='" + money + '\'' +
                ", rate='" + rate + '\'' +
                ", count=" + count +
                ", pay_type='" + pay_type + '\'' +
                ", channel='" + channel + '\'' +
                ", success_count=" + success_count +
                ", success_money='" + success_money + '\'' +
                ", success_list=" + success_list +
                ", fail_count=" + fail_count +
                ", fail_money='" + fail_money + '\'' +
                ", fail_list=" + fail_list +
                ", reason='" + reason + '\'' +
                ", description='" + description + '\'' +
                ", add_time='" + add_time + '\'' +
                '}';
    }

    public void setSuccess_list(List<BatchPayListInfoBiz> success_list) {
        this.success_list = success_list;
    }

    public Integer getFail_count() {
        return fail_count;
    }

    public void setFail_count(Integer fail_count) {
        this.fail_count = fail_count;
    }

    public String getFail_money() {
        return fail_money;
    }

    public void setFail_money(String fail_money) {
        this.fail_money = fail_money;
    }

    public List<BatchPayListInfoBiz> getFail_list() {
        return fail_list;
    }

    public void setFail_list(List<BatchPayListInfoBiz> fail_list) {
        this.fail_list = fail_list;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAdd_time() {
        return add_time;
    }

    public void setAdd_time(String add_time) {
        this.add_time = add_time;
    }
}
