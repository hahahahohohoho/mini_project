package com.edu.board.Entity;


import java.time.LocalDateTime;

import com.edu.user.entitiy.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	@Column(nullable = false, columnDefinition = "default false")
	private Integer viewcount;
	@Column(nullable = false, columnDefinition = "default false")
	private Integer likecount;
	@ManyToOne(fetch = FetchType.LAZY)	@JoinColumn(name="member_id")
	private User writer;
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private LocalDateTime createDate;
}
