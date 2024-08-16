package com.edu.board.reply;

import com.edu.board.board.Board;
import com.edu.board.reply.common.Reply;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class BoardReply extends Reply{
	@ManyToOne
	private Board board;
}
