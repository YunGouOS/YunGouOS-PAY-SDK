package com.yungouos.springboot.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

	@RequestMapping("/")
	public String index() {
		return "index";
	}
	
	
	@RequestMapping("/wap")
	public String wap() {
		return "wap";
	}


	@RequestMapping("/login")
	public String login() {
		return "login";
	}

}
