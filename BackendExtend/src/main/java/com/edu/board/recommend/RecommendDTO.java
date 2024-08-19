package com.edu.board.recommend;

import lombok.Getter;

@Getter
public class RecommendDTO {
	private Long board_id;
	private String username;
	
	public RecommendDTO(Long board_id, String username) {
		this.board_id = board_id;
		this.username = username;
	}
	public RecommendDTO(Recommend recommend) {
		this.board_id = recommend.getBoard().getId();
		this.username = recommend.getWriter().getUsername();
	}
}
