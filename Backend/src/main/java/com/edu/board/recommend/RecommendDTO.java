package com.edu.board.DTO;

import com.edu.board.Entity.Recommend;

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
		this.username = recommend.getUser().getUsername();
	}
}
