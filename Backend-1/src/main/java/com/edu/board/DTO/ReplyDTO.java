package com.edu.board.Entity;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class ReplyDTO {
	private String username;
	private String content;
	private LocalDateTime createDate;
	
	public ReplyDTO(String username, String content, LocalDateTime createDate) {
		this.username = username;
		this.content = content;
		this.createDate = createDate;
	}
	
	public ReplyDTO(Reply reply) {
		this.username = reply.getWriter().getUsername();
		this.content = reply.getContent();
		this.createDate = reply.getCreateDate();
	}
	public ReplyDTO() {}
}
