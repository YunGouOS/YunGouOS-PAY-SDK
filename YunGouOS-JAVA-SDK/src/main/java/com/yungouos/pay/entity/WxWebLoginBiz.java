package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 
 * 微信PC扫码登录对象
 * 
 * @author YunGouOS技术部-029
 *
 */
public class WxWebLoginBiz implements Serializable {

	private static final long serialVersionUID = 8198747608551208847L;

	private String appId;

	private String scope;

	private String state;

	private String redirect_uri;

	public String getAppId() {
		return appId;
	}

	public void setAppId(String appId) {
		this.appId = appId;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getRedirect_uri() {
		return redirect_uri;
	}

	public void setRedirect_uri(String redirect_uri) {
		this.redirect_uri = redirect_uri;
	}

	@Override
	public String toString() {
		return "WxWebLoginBiz [appId=" + appId + ", scope=" + scope + ", state=" + state + ", redirect_uri=" + redirect_uri + "]";
	}

	
}
