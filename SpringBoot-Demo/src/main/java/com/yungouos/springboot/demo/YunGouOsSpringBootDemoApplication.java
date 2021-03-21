package com.yungouos.springboot.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import tk.mybatis.spring.annotation.MapperScan;

@MapperScan(basePackages = "com.yungouos.springboot.demo.dao")
@SpringBootApplication
public class YunGouOsSpringBootDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(YunGouOsSpringBootDemoApplication.class, args);
	}

}
