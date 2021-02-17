package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 微信商品详情
 * 
 * @author YunGouOS技术部-029
 *
 */
public class WxPayGoodsDetailBiz implements Serializable {

	private static final long serialVersionUID = -8252785620981441230L;

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
	private Integer price;

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

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

}
