package com.yungouos.pay.entity;

import java.io.Serializable;
import java.util.List;

public class WxPayDetailBiz implements Serializable {

	private static final long serialVersionUID = -7572505256449532515L;

	/**
	 * 订单原价
	 */
	private Integer cost_price;

	/**
	 * 商家小票ID
	 */
	private String receipt_id;

	/**
	 * 单品列表
	 */
	private List<WxPayGoodsDetailBiz> goods_detail;

	public Integer getCost_price() {
		return cost_price;
	}

	public void setCost_price(Integer cost_price) {
		this.cost_price = cost_price;
	}

	public String getReceipt_id() {
		return receipt_id;
	}

	public void setReceipt_id(String receipt_id) {
		this.receipt_id = receipt_id;
	}

	public List<WxPayGoodsDetailBiz> getGoods_detail() {
		return goods_detail;
	}

	public void setGoods_detail(List<WxPayGoodsDetailBiz> goods_detail) {
		this.goods_detail = goods_detail;
	}
	
	
}
