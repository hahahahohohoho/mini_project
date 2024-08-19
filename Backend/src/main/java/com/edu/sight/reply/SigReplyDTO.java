package com.edu.sight.reply;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class SigReplyDTO {
	private Long id;
	private String username;
	private String content;
	private LocalDateTime createDate;
	
	
	public SigReplyDTO() {}
	
	public SigReplyDTO(SightReply reply) {
		this.id = reply.getId();
		this.username = reply.getWriter().getUsername();
		this.content = reply.getContent();
		this.createDate = reply.getCreateDate();
	}
	

}
