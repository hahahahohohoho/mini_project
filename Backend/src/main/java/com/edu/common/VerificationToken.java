package com.edu.common;

import java.time.LocalDateTime;
import java.util.Date;

import com.edu.user.entitiy.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime expiryDate;
    
    public VerificationToken(String token, User user) {
    	this.token = token;
    	this.user = user;
    }

	public VerificationToken(String token, User user, LocalDateTime localDateTime) {
		this.token = token;
		this.user = user;
		this.expiryDate = localDateTime;
	}
    
}
