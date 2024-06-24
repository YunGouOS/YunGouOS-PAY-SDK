package com.yungouos.springboot.demo.controller;

import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.entity.WxOauthInfo;
import com.yungouos.pay.entity.WxWebLoginBiz;
import com.yungouos.pay.wxapi.WxApi;
import com.yungouos.springboot.demo.common.ApiResponse;
import com.yungouos.springboot.demo.entity.Order;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author YunGouOS技术部-029
 * @time 2024/6/24 12:02
 */
@RestController
@RequestMapping("/api/login")
public class LoginController {

    /**
     * 获取登录参数
     *
     * @param data
     * @return
     */
    @RequestMapping("/getLoginParams")
    @ResponseBody
    public JSONObject getLoginParams(@RequestParam Map<String, String> data) {
        JSONObject response = ApiResponse.init();
        try {
            String mch_id = "100278249";
            String callback_url = "http://127.0.0.1:8080/login";
            String type = "open-url";
            JSONObject json = new JSONObject();
            json.put("aaa", "123");
            String key = "AB0A20ECFFB749A6BE3CC65167A74BCE";
            String url = WxApi.getWxOauthUrl(mch_id, callback_url, type, json, key);
            response = ApiResponse.success("获取成功", url);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }


    /**
     * 获取登录code
     *
     * @param data
     * @return
     */
    @RequestMapping("/getLoginCode")
    @ResponseBody
    public JSONObject getLoginCode(@RequestParam Map<String, String> data) {
        JSONObject response = ApiResponse.init();
        try {
            String mch_id = "100278249";
            String callback_url = "http://127.0.0.1:8080/login";
            JSONObject json = new JSONObject();
            json.put("aaa", "123");
            String key = "AB0A20ECFFB749A6BE3CC65167A74BCE";
            WxWebLoginBiz webLogin = WxApi.getWebLogin(mch_id, callback_url, json, key);
            //你可以结合自己的业务需要进行二次封装返回结果
            response = ApiResponse.success("获取成功", webLogin);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    /**
     * 获取授权信息
     *
     * @param data
     * @return
     */
    @RequestMapping("/getOauthInfo")
    @ResponseBody
    public JSONObject getOauthInfo(@RequestParam Map<String, String> data) {
        JSONObject response = ApiResponse.init();
        try {
            String code = data.get("code");
            String mch_id = "100278249";
            String key = "AB0A20ECFFB749A6BE3CC65167A74BCE";
            WxOauthInfo wxOauthInfo = WxApi.getWxOauthInfo(mch_id, code, key);
            //获取到用户授权信息后
            String openId = wxOauthInfo.getOpenId();//唯一凭证
            //使用openid找到数据库中对应的用户信息，执行你自己的登录操作

            response = ApiResponse.success("获取成功", wxOauthInfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }






}
