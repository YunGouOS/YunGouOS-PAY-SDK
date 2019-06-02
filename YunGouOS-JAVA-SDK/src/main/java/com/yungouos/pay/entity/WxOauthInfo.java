package com.yungouos.pay.entity;

import com.alibaba.fastjson.JSONObject;

/**
 * 
 * 微信授权信息返回对象
 *
 * @author YunGouOS技术部-029
 */
public class WxOauthInfo {

	/**
	 * 用户openid
	 */
	private String openId;

	/**
	 * 传递的额外参数
	 */
	private JSONObject params;

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public JSONObject getParams() {
		return params;
	}

	public void setParams(JSONObject params) {
		this.params = params;
	}

	@Override
	public String toString() {
		return "WxOauthInfo [openId=" + openId + ", params=" + params + "]";
	}

	
}
