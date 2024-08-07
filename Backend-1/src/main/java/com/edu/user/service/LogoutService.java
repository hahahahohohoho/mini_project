package com.edu.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.common.util.JwtBlacklist;

@Service
public class LogoutService {
	@Autowired
	private JwtBlacklist jwtBlacklist;

	public void logout(String token) {
		jwtBlacklist.add(token);
	}

	public boolean isTokenBlacklisted(String token) {
		return jwtBlacklist.contains(token);
	}
}
