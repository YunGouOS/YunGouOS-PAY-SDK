package com.yungouos.pay.entity;

import com.yungouos.pay.entity.coupon.GoodsBody;

import java.io.Serializable;

/**
 * 支付接口业务参数对象
 *
 * @author YunGouOS技术部-029
 */
public class BizParams implements Serializable {

    private static final long serialVersionUID = -853704539990185072L;

    /**
     * 设备或门店信息
     */
    private String device_info;

    /**
     * 花呗分期
     */
    private HbFqBiz hb_fq;

    /**
     * 信用卡支付 0:关闭、1：允许
     */
    private Integer credit;

    /**
     * 订单失效时间
     */
    private String end_time;

    /**
     * 商品标记，代金券或立减优惠功能的参数。
     */
    private String goods_tag;

    /**
     * 单品优惠详情
     */
    private GoodsBody goods_body;

    /**
     * 门店ID
     */
    private String store_id;


    public String getDevice_info() {
        return device_info;
    }

    public void setDevice_info(String device_info) {
        this.device_info = device_info;
    }

    public HbFqBiz getHb_fq() {
        return hb_fq;
    }

    public void setHb_fq(HbFqBiz hb_fq) {
        this.hb_fq = hb_fq;
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public String getGoods_tag() {
        return goods_tag;
    }

    public void setGoods_tag(String goods_tag) {
        this.goods_tag = goods_tag;
    }

    public GoodsBody getGoods_body() {
        return goods_body;
    }

    public void setGoods_body(GoodsBody goods_body) {
        this.goods_body = goods_body;
    }

    public String getStore_id() {
        return store_id;
    }

    public void setStore_id(String store_id) {
        this.store_id = store_id;
    }
}
