package com.yungouos.pay.entity;

import java.io.Serializable;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.common.PayException;

import cn.hutool.core.util.StrUtil;

/**
 * 
 * 微信支付商品详情对象
 * 
 * 
 * @action
 *
 * @author YunGouOS技术部-029
 *
 * @time 2021年2月6日 下午9:31:51
 *
 *
 */
public class WxPayDetailApiBiz implements Serializable {

	private static final long serialVersionUID = 7033129401680026389L;

	/**
	 * 版本号  固定值
	 */
	private String version = "1.0";

	/**
	 * 商品标记 订单优惠标记，用于区分订单是否可以享受优惠，字段内容在微信后台配置券时进行设置
	 */
	private String goods_tag;

	/**
	 * 商品详情 单品优惠活动该字段必传，且必须按照规范上传
	 */
	private WxPayDetailBiz detail;

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getGoods_tag() {
		return goods_tag;
	}

	public void setGoods_tag(String goods_tag) {
		this.goods_tag = goods_tag;
	}

	public WxPayDetailBiz getDetail() {
		return detail;
	}

	public void setDetail(WxPayDetailBiz detail) {
		this.detail = detail;
	}

	public WxPayDetailApiBiz doCheck(String detailParams) {
		WxPayDetailApiBiz wxPayDetailApiBiz = null;
		try {
			if (!StrUtil.isBlank(detailParams)) {
				JSONObject detailJson = (JSONObject) JSONObject.parse(detailParams);
				wxPayDetailApiBiz = JSON.toJavaObject(detailJson, WxPayDetailApiBiz.class);
			}
		} catch (Exception e) {
			throw new PayException("商品详情参数格式不合法");
		}
		return wxPayDetailApiBiz;
	}
}
