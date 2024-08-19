package com.edu.restaurant.reply;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class ResReplyDTO {
	private Long id;
	private String username;
	private String content;
	private LocalDateTime createDate;
	
	
	public ResReplyDTO() {}
	
	public ResReplyDTO(RestaurantReply reply) {
		this.id = reply.getId();
		this.username = reply.getWriter().getUsername();
		this.content = reply.getContent();
		this.createDate = reply.getCreateDate();
	}
	

}
