package com.edu.board.DTO;

import java.time.LocalDateTime;

import com.edu.board.Entity.Reply;

import lombok.Getter;

@Getter
public class ReplyDTO {
	private Long id;
	private String username;
	private String content;
	private LocalDateTime createDate;
	
	
	public ReplyDTO() {}
	
	public ReplyDTO(Reply reply) {
		this.id = reply.getId();
		this.username = reply.getWriter().getUsername();
		this.content = reply.getContent();
		this.createDate = reply.getCreateDate();
	}
	

}