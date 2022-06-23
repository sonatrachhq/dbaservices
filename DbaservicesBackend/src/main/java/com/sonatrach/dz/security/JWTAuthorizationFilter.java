package com.sonatrach.dz.security;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

	private String secretKey ;
	
	public JWTAuthorizationFilter(String secretKey) {
		this.secretKey=secretKey;
	}
	
	private final String HEADER = "Authorization";
	private final String PREFIX = "Bearer ";



	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
		try {
			if (checkJWTToken(request, response)) {
				Claims claims = validateToken(request);
				if (claims.get("authorities") != null) {
					setUpSpringAuthentication(claims);
				} else {
					SecurityContextHolder.clearContext();
				}
			}else {
				SecurityContextHolder.clearContext();
			}
			/*
			 * System.out.println(request.getHeader("Origin"));
			 * response.setHeader("Access-Control-Allow-Origin",
			 * request.getHeader("Origin"));
			 * response.setHeader("Access-Control-Allow-Credentials", "true");
			 * response.setHeader("Access-Control-Allow-Methods",
			 * "POST, GET, OPTIONS, DELETE"); response.setHeader("Access-Control-Max-Age",
			 * "3600"); response.setHeader("Access-Control-Allow-Headers",
			 * "Content-Type, Accept, X-Requested-With,Authorization, remember-me"); if
			 * ("OPTIONS".equals(request.getMethod())) {
			 * System.out.println(request.getMethod());
			 * response.setStatus(HttpServletResponse.SC_OK); } else {
			 * System.out.println("chain.doFilter(request, response);");
			 * chain.doFilter(request, response); }
			 */
			chain.doFilter(request, response);
		} catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException e) {
			System.out.println(e.getMessage());
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN, e.getMessage());
			return;
		}
	}	

	private Claims validateToken(HttpServletRequest request) {
	
		String jwtToken = request.getHeader(HEADER).replace(PREFIX, "");
		return Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(jwtToken).getBody();
	}

	/**
	 * Authentication method in Spring flow
	 * 
	 * @param claims
	 */
	private void setUpSpringAuthentication(Claims claims) {
		@SuppressWarnings("unchecked")
		List<String> authorities = (List) claims.get("authorities");

		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(claims.getSubject(), null,
				authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
		SecurityContextHolder.getContext().setAuthentication(auth);

	}

	private boolean checkJWTToken(HttpServletRequest request, HttpServletResponse res) {
		String authenticationHeader = request.getHeader(HEADER);
		if (authenticationHeader == null || !authenticationHeader.startsWith(PREFIX))
			return false;
		return true;
	}

}