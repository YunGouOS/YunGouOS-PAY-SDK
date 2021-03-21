package com.yungouos.springboot.demo.common;

import com.alibaba.fastjson.JSONObject;

public class ApiResponse {

	public static JSONObject init() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("code", 0);
		jsonObject.put("msg", "系统繁忙，请稍候再试");
		jsonObject.put("data", null);
		return jsonObject;
	}

	public static JSONObject success(String msg, Object data) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("code", 1);
		jsonObject.put("msg", msg);
		jsonObject.put("data", data);
		return jsonObject;
	}

	public static JSONObject fail(String msg) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("code", 0);
		jsonObject.put("msg", msg);
		jsonObject.put("data", null);
		return jsonObject;
	}
}
