package com.edu.board.DTO;

import java.time.LocalDateTime;

import com.edu.board.Entity.Reply;

import lombok.Getter;

@Getter
public class ReplyDTO {
	private Long board_id;
	private String username;
	private String content;
	private LocalDateTime createDate;
	
	
	public ReplyDTO() {}
	
	public ReplyDTO(Reply reply) {
		this.board_id  = reply.getBoard().getId();
		this.username = reply.getWriter().getUsername();
		this.content = reply.getContent();
		this.createDate = reply.getCreateDate();
	}
	
	//request용
	public ReplyDTO(Long board_id, String username, String content) {
		this.board_id = board_id;
		this.username = username;
		this.content = content;
		this.createDate = LocalDateTime.now();
	}
}
