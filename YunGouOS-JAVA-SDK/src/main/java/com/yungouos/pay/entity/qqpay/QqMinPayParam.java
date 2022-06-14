package com.yungouos.pay.entity.qqpay;

import java.io.Serializable;

/**
 * QQ小程序支付参数对象
 * @author YunGouOS技术部-029
 */
public class QqMinPayParam implements Serializable {

    private String referer;

    private String url;

    public String getReferer() {
        return referer;
    }

    public void setReferer(String referer) {
        this.referer = referer;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "QqMinPayParam{" +
                "referer='" + referer + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
