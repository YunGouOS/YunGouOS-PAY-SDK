package com.yungouos.pay.entity.qqpay;

import java.io.Serializable;

/**
 * QQ小程序收银台对象
 *
 * @author YunGouOS技术部-029
 */
public class QqCashierParam implements Serializable {

    private String payName;

    public String getPayName() {
        return payName;
    }

    public void setPayName(String payName) {
        this.payName = payName;
    }

    @Override
    public String toString() {
        return "QqCashierParam{" +
                "payName='" + payName + '\'' +
                '}';
    }
}
