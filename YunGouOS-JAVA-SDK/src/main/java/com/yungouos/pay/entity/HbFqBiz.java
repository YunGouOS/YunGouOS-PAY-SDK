package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 支付宝花呗分期业务参数对象
 * 
 * @author YunGouOS技术部-029
 *
 */
public class HbFqBiz implements Serializable {

	private static final long serialVersionUID = 3435337119276335030L;

	/**
	 * 期数。枚举值3、6、12
	 */
	private Integer num;

	/**
	 * 商户承担手续费比例，枚举值0、100
	 */
	private Integer percent;

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public Integer getPercent() {
		return percent;
	}

	public void setPercent(Integer percent) {
		this.percent = percent;
	}

}
