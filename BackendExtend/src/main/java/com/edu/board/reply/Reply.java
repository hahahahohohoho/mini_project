package com.edu.board.reply;

import java.time.LocalDateTime;

import com.edu.board.base.BaseActionEntity;
import com.edu.board.board.Board;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "reply_id"))
public class Reply extends BaseActionEntity {
	
	@Column(nullable = false, length = 200)
	private String content;
	
	@ManyToOne // many = Reply one = Board
	@JoinColumn(name="board_id")
	private Board board;
	
}
