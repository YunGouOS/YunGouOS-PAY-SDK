package com.yungouos.pay.entity.coupon;

import java.io.Serializable;
import java.util.List;

/**
 * 单品优惠详情对象
 * @author YunGouOS技术部-029
 */
public class GoodsBody implements Serializable {

    /**
     * 订单原价
     */
    private String cost_price;

    /**
     * 商家小票ID
     */
    private String receipt_id;

    /**
     * 单品列表
     */
    private List<GoodsDetail> goods_detail;

    public String getCost_price() {
        return cost_price;
    }

    public void setCost_price(String cost_price) {
        this.cost_price = cost_price;
    }

    public String getReceipt_id() {
        return receipt_id;
    }

    public void setReceipt_id(String receipt_id) {
        this.receipt_id = receipt_id;
    }

    public List<GoodsDetail> getGoods_detail() {
        return goods_detail;
    }

    public void setGoods_detail(List<GoodsDetail> goods_detail) {
        this.goods_detail = goods_detail;
    }
}
