package com.yungouos.pay.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 
 * 微信下载对账单对象
 *
 * @author YunGouOS技术部-029
 */
public class WxDownloadBillBiz implements Serializable {

	private static final long serialVersionUID = -8621754757315990290L;

	/**
	 * 对账单数据
	 */
	private List<WxDownloadBillInfoBiz> list;

	/**
	 * 对账单excel下载地址
	 */
	private String url;

	private WxDownloadBillTotalBiz total;

	public List<WxDownloadBillInfoBiz> getList() {
		return list;
	}

	public void setList(List<WxDownloadBillInfoBiz> list) {
		this.list = list;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public WxDownloadBillTotalBiz getTotal() {
		return total;
	}

	public void setTotal(WxDownloadBillTotalBiz total) {
		this.total = total;
	}

	@Override
	public String toString() {
		return "WxDownloadBillBiz [list=" + list + ", url=" + url + ", total=" + total + "]";
	}

}
