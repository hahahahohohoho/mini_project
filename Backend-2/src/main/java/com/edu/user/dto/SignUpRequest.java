package com.edu.user.dto;

import lombok.Getter;

@Getter
public class SignUpRequest {
	private String username;
	private String password;
	private String email;
	
	public SignUpRequest(String username, String password, String email) {
		this.email = email;
		this.password = password;
		this.username = username;
	}
}
