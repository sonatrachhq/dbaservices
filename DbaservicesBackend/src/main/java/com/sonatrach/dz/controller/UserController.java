package com.sonatrach.dz.controller;

import java.io.File;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sonatrach.dz.security.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;




@RestController
@CrossOrigin(origins = "*")
public class UserController {

	   @Value("${app.sonatrach.jwtSecret}")
	    private String secretKey;
	    @Value("${app.sonatrach.jwtExpiration}")
	    private int jwtExpiration;
	
	@PostMapping("user/simulateAuth")
	public User login(@RequestBody User Suser) {
		
		String token = getJWTToken(Suser.getUser());
		User user = new User();
		user.setUser(Suser.getUser());
		user.setToken(token);		
		return user;
		
	}

	
	
	
	private String getJWTToken(String username) {
	
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");
		
		String token = Jwts
				.builder()
				.setId("sonatrachJWT")
				.setSubject(username)
				.claim("authorities",
						grantedAuthorities.stream()
								.map(GrantedAuthority::getAuthority)
								.collect(Collectors.toList()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date((new Date()).getTime() + jwtExpiration*1000))
				.signWith(SignatureAlgorithm.HS512,
						secretKey.getBytes()).compact();

		return "Bearer " + token;
	}
}
