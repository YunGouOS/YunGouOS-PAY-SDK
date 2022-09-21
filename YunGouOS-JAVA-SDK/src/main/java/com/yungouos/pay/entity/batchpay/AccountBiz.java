package com.yungouos.pay.entity.batchpay;

import java.io.Serializable;

/**
 * 转账收款方用户对象
 *
 * @author YunGouOS技术部-029
 */
public class AccountBiz implements Serializable {
    /**
     * 收款账号。传递user_no时参数该参数可不填
     */
    private String account;

    /**
     * 收款账号对应的实名名称。传递user_no时参数该参数可不填
     */
    private String account_name;

    /**
     * 转账描述，用户账单详情页可查看
     */
    private String description;

    /**
     * 转账金额。单位：元
     */
    private String money;

    /**
     * 用户支付宝账单详情页面显示的标题
     */
    private String order_title;

    /**
     * YunGouOS系统内客户号，传递了客户号account、account_name可不传。
     * 如果同时传递该参数和account信息，会以user_no对应的账户信息进行覆盖。
     */
    private String user_no;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getAccount_name() {
        return account_name;
    }

    public void setAccount_name(String account_name) {
        this.account_name = account_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getOrder_title() {
        return order_title;
    }

    public void setOrder_title(String order_title) {
        this.order_title = order_title;
    }

    public String getUser_no() {
        return user_no;
    }

    public void setUser_no(String user_no) {
        this.user_no = user_no;
    }

    @Override
    public String toString() {
        return "AccountBiz{" +
                "account='" + account + '\'' +
                ", account_name='" + account_name + '\'' +
                ", description='" + description + '\'' +
                ", money='" + money + '\'' +
                ", order_title='" + order_title + '\'' +
                ", user_no='" + user_no + '\'' +
                '}';
    }
}
