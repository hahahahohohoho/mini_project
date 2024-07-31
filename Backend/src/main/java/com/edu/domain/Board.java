package com.edu.domain;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @Builder @ToString
@NoArgsConstructor @AllArgsConstructor @Entity
public class Board {
	@Id @GeneratedValue
	private Long id;
	@Column(nullable = false)
	private String title;
	@Column(nullable = false)
	private String content;
	private String writer;
	@Temporal(TemporalType.TIMESTAMP)
	@Builder.Default
	@Column(columnDefinition = "timestamp default current_timestamp")
	private Date createDate = new Date();
	private int viewcount;
}

