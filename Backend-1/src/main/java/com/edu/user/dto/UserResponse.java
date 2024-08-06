package com.edu.user.dto;

import lombok.Getter;

@Getter
public class UserResponse {
	private Long id;
	private String username;
	private String email;
	
	public UserResponse(Long id, String username, String email) {
		this.id = id;
		this.username = username;
		this.email = email;
	}
	
}
