package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
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

	public String getDevice_info() {
		return device_info;
	}

	public void setDevice_info(String device_info) {
		this.device_info = device_info;
	}
	
}
