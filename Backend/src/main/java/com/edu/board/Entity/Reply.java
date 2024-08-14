package com.edu.board.Entity;

import java.time.LocalDateTime;


import com.edu.user.entitiy.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Reply {
	@Id @Column(name = "reply_id") @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 200)
	private String content;
	
	@ManyToOne // many = Reply one = Board
	@JoinColumn(name="board_id")
	private Board board;
	
	@ManyToOne //many =Reply one = User
	@JoinColumn(name="user_id", nullable = false, updatable = false)
	private User writer;
	
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private LocalDateTime createDate;
	
}
