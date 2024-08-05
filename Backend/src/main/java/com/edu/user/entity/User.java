package com.edu.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString @Builder
@Entity @NoArgsConstructor @AllArgsConstructor
public class User {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "user_id") 
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false, unique = true)
	private String username;
	
	@Column(nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	private UserRole userRole;
	
    @Builder.Default
	private boolean emailVerified = false;

}
