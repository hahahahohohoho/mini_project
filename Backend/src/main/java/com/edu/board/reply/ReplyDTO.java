package com.edu.board.reply;

import java.time.LocalDateTime;

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
