package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 刷脸支付凭证对象
 *
 * @author YunGouOS技术部-029
 *
 */
public class FacePayAuthInfoBiz implements Serializable {
    /**
     * 公众号/小程序appId
     */
    private String app_id;

    /**
     * 商户号
     */
    private String mch_id;

    /**
     * 子商户绑定的公众号/小程序APPID
     */
    private String sub_app_id;

    /**
     * 子商户微信商户号
     */
    private String sub_mch_id;

    /**
     * 人脸数据返回结果
     */
    private String authinfo;

    /**
     * 人脸数据有效期，单位：秒
     */
    private Integer expires_in;

    public String getApp_id() {
        return app_id;
    }

    public void setApp_id(String app_id) {
        this.app_id = app_id;
    }

    public String getMch_id() {
        return mch_id;
    }

    public void setMch_id(String mch_id) {
        this.mch_id = mch_id;
    }

    public String getSub_app_id() {
        return sub_app_id;
    }

    public void setSub_app_id(String sub_app_id) {
        this.sub_app_id = sub_app_id;
    }

    public String getSub_mch_id() {
        return sub_mch_id;
    }

    public void setSub_mch_id(String sub_mch_id) {
        this.sub_mch_id = sub_mch_id;
    }

    public String getAuthinfo() {
        return authinfo;
    }

    public void setAuthinfo(String authinfo) {
        this.authinfo = authinfo;
    }

    public Integer getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(Integer expires_in) {
        this.expires_in = expires_in;
    }

    @Override
    public String toString() {
        return "FacePayAuthInfoBiz{" +
                "app_id='" + app_id + '\'' +
                ", mch_id='" + mch_id + '\'' +
                ", sub_app_id='" + sub_app_id + '\'' +
                ", sub_mch_id='" + sub_mch_id + '\'' +
                ", authinfo='" + authinfo + '\'' +
                ", expires_in=" + expires_in +
                '}';
    }
}
