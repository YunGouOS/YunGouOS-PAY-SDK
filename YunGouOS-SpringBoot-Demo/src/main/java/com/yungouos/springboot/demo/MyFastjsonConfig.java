package com.yungouos.springboot.demo;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;

@Configuration
public class MyFastjsonConfig {

	@Bean
	FastJsonHttpMessageConverter fastJsonHttpMessageConverter() {
		try {
			FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
			FastJsonConfig config = new FastJsonConfig();
			// 升级之后的fastjson（1.2.28之后的版本）需要手动配置MediaType，否则会报错
			List<MediaType> supportedMediaTypes = new ArrayList<>();
			supportedMediaTypes.add(MediaType.APPLICATION_JSON);
			supportedMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
			supportedMediaTypes.add(MediaType.APPLICATION_ATOM_XML);
			supportedMediaTypes.add(MediaType.APPLICATION_FORM_URLENCODED);
			supportedMediaTypes.add(MediaType.APPLICATION_OCTET_STREAM);
			supportedMediaTypes.add(MediaType.APPLICATION_PDF);
			supportedMediaTypes.add(MediaType.APPLICATION_RSS_XML);
			supportedMediaTypes.add(MediaType.APPLICATION_XHTML_XML);
			supportedMediaTypes.add(MediaType.APPLICATION_XML);
			supportedMediaTypes.add(MediaType.IMAGE_GIF);
			supportedMediaTypes.add(MediaType.IMAGE_JPEG);
			supportedMediaTypes.add(MediaType.IMAGE_PNG);
			supportedMediaTypes.add(MediaType.TEXT_EVENT_STREAM);
			supportedMediaTypes.add(MediaType.TEXT_HTML);
			supportedMediaTypes.add(MediaType.TEXT_MARKDOWN);
			supportedMediaTypes.add(MediaType.TEXT_PLAIN);
			supportedMediaTypes.add(MediaType.TEXT_XML);
			converter.setSupportedMediaTypes(supportedMediaTypes);

			config.setDateFormat("yyyy-MM-dd");
			config.setCharset(Charset.forName("UTF-8"));
			config.setSerializerFeatures(
					// json格式化
					SerializerFeature.PrettyFormat,
					// 输出value为null的数据
					SerializerFeature.WriteMapNullValue);
			converter.setFastJsonConfig(config);
			return converter;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
