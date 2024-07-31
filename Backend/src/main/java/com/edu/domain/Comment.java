package com.edu.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter @ToString @Builder
public class Comment {
	@Id@GeneratedValue
	private Long id;
	@ManyToOne
	@JoinColumn(name = "board_id")
	private Board board;
	
	@Column(nullable = false, name = "comment_content")
	private String content;
}
