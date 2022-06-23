package com.sonatrach.dz;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.sonatrach.dz.security.JWTAuthorizationFilter;

@SpringBootApplication
public class DbaservicesBackendApplication extends SpringBootServletInitializer{
	
	public static void main(String[] args) {
		SpringApplication.run(DbaservicesBackendApplication.class, args);
	}
	@Override
	 protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
	        return builder.sources(DbaservicesBackendApplication.class);
	    }        
}
