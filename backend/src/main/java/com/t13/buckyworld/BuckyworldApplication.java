package com.t13.buckyworld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BuckyworldApplication {

	public static void main(String[] args) {
		SpringApplication.run(BuckyworldApplication.class, args);
	}

	// This is a bean that allows for CORS (Cross-Origin Resource Sharing) to be
	// enabled
	// This is necessary for the front-end on port 3000 to communicate with the
	// back-end on port 8080
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedMethods("GET", "PUT", "POST", "DELETE")
						.allowedOrigins("http://localhost:3000");
			}
		};
	}

}
