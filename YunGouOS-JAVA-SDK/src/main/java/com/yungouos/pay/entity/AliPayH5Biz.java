package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 支付宝H5支付返回结果对象
 * 
 * 
 * @author YunGouOS技术部-029
 *
 */
public class AliPayH5Biz implements Serializable {

	private static final long serialVersionUID = 2347969777683364068L;

	private String form;

	private String url;

	public String getForm() {
		return form;
	}

	public void setForm(String form) {
		this.form = form;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		return "AliPayH5Biz [form=" + form + ", url=" + url + "]";
	}

	
}
