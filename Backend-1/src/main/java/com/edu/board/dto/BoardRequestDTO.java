package com.edu.board.dto;

import lombok.Getter;

@Getter
public class BoardRequestDTO {
	private String title;
	private Long memberId;
	private String content;
	
	public BoardRequestDTO(String title, Long memberId, String content) {
		this.title = title;
		this.memberId = memberId;
		this.content = content;
	}
	
}
