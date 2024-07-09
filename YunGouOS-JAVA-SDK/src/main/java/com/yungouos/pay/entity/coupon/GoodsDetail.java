package com.yungouos.pay.entity.coupon;

import java.io.Serializable;

/**
 * @author YunGouOS技术部-029
 */
public class GoodsDetail implements Serializable {

    /**
     * 商品编码
     */
    private String goods_id;

    /**
     * 微信侧商品编码
     */
    private String wxpay_goods_id;

    /**
     * 商品的实际名称
     */
    private String goods_name;

    /**
     * 用户购买的数量
     */
    private Integer quantity;

    /**
     * 商品单价
     */
    private String price;

    public String getGoods_id() {
        return goods_id;
    }

    public void setGoods_id(String goods_id) {
        this.goods_id = goods_id;
    }

    public String getWxpay_goods_id() {
        return wxpay_goods_id;
    }

    public void setWxpay_goods_id(String wxpay_goods_id) {
        this.wxpay_goods_id = wxpay_goods_id;
    }

    public String getGoods_name() {
        return goods_name;
    }

    public void setGoods_name(String goods_name) {
        this.goods_name = goods_name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
