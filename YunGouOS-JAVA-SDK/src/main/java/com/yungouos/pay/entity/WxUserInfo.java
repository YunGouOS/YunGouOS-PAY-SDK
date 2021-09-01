package com.yungouos.pay.entity;

import java.io.Serializable;

/**
 * 微信用户信息实体类
 * 
 * @author YunGouOS技术部-029
 *
 */
public class WxUserInfo implements Serializable{

	private static final long serialVersionUID = 3424968795750256762L;

	private String city;

	private String country;

	private String headimgurl;

	private String language;

	private String nickname;

	private String openid;
	
	private String unionid;

	private String province;

	private int sex;
	
	private int band;

	public void setCity(String city) {
		this.city = city;
	}

	public String getCity() {
		return this.city;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCountry() {
		return this.country;
	}

	public void setHeadimgurl(String headimgurl) {
		this.headimgurl = headimgurl;
	}

	public String getHeadimgurl() {
		return this.headimgurl;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getLanguage() {
		return this.language;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getNickname() {
		return this.nickname;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getOpenid() {
		return this.openid;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getProvince() {
		return this.province;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public int getSex() {
		return this.sex;
	}

	public int getBand() {
		return band;
	}

	public void setBand(int band) {
		this.band = band;
	}

	public String getUnionid() {
		return unionid;
	}

	public void setUnionid(String unionid) {
		this.unionid = unionid;
	}

	@Override
	public String toString() {
		return "WxUserInfo [city=" + city + ", country=" + country + ", headimgurl=" + headimgurl + ", language=" + language + ", nickname=" + nickname + ", openid=" + openid + ", unionid=" + unionid
				+ ", province=" + province + ", sex=" + sex + ", band=" + band + "]";
	}
	
	
	
	
}
