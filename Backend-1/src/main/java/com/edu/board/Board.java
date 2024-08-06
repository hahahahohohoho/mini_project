package com.edu.board;


import java.util.Date;

import com.edu.user.entitiy.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;

@Entity
@Getter
public class Board {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "board_id")
	private Long id;
	@Column(nullable = false)
	private String title;
	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;
	@Column(nullable = false)
	private Integer viewcount;
	@Column(nullable = false)
	private Integer likecount;
	@ManyToOne(fetch = FetchType.LAZY)	@JoinColumn(name="member_id")
	private User writer;
	@Temporal(value = TemporalType.TIMESTAMP)
	private Date createDate;
}
