package com.edu.board.DTO;

import lombok.Getter;

@Getter
public class RecommendDTO {
	private Long board_id;
	private Long user_id;
	
	public RecommendDTO(Long board_id, Long user_id) {
		this.board_id = board_id;
		this.user_id = user_id;
	}
	
}
