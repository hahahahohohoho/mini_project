package com.edu.board.reply;


import com.edu.board.base.reply.BaseReply;
import com.edu.board.board.Board;
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
public class Reply extends BaseReply {
	@ManyToOne // many = Reply one = Board
	@JoinColumn(name="board_id")
	private Board board;
}
