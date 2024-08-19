package com.edu.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
	private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private long expirationTime; // 추가된 필드
    
    @Builder
    public JwtResponse(String accessToken, Long id, String username, String email, Long expirationTime) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.expirationTime = expirationTime;
    }
    public JwtResponse(JwtResponse jwtResponse) {
    	this.token = jwtResponse.getToken();
        this.id = jwtResponse.getId();
        this.username = jwtResponse.getUsername();
        this.email = jwtResponse.getEmail();
        this.expirationTime= jwtResponse.getExpirationTime();
    }
}