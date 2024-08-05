package com.edu.user.dto;

import com.edu.user.entity.UserRole;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JoinDTO {
	private String email;
	private String password;
	private String nickName;
	private UserRole userRole;
	
	
	
	@Builder
	public JoinDTO(String email, String password, String nickName, UserRole userRole) {
		this.email = email;
        this.password = password;
        this.nickName = nickName;
        this.userRole = userRole;
	}
}
