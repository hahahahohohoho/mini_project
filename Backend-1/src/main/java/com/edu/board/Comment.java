package com.edu.board;

import com.edu.user.entitiy.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Comment {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "com_id")
	private Long id;
	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;
	@ManyToOne(fetch = FetchType.LAZY)	@JoinColumn(name="member_id")
	private User writer;
	@ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="board_id")
	private Board board;
}
