//package com.edu.config.dto;
//
//import com.edu.user.entity.UserRole;
//
//import lombok.Getter;
//
//@Getter
//public class JwtDTO {
//	private String token;
//	private String type = "Bearer";
//	private Long id;
//	private String nickName;
//	private String email;
//	private UserRole role;
//	
//	public JwtDTO(String accessToken, Long id, String username, String email, UserRole userRole) {
//		this.token = accessToken;
//		this.id = id;
//		this.nickName = username;
//		this.email = email;
//		this.role = userRole;
//	}
//	
//}