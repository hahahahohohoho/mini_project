package com.edu.board.base.reply;

import java.time.LocalDateTime;

import com.edu.user.entitiy.User;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
public abstract class BaseReply {
	@Id @Column(name = "reply_id") @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, length = 200)
	private String content;
	@ManyToOne //many =Reply one = User
	@JoinColumn(name="user_id", nullable = false, updatable = false)
	private User writer;
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private LocalDateTime createDate;
}
