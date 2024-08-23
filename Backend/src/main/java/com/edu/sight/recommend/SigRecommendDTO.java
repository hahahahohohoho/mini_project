package com.edu.sight.recommend;

import lombok.Getter;

@Getter
public class SigRecommendDTO {
	private Long board_id;
	private String username;
	
	public SigRecommendDTO(Long board_id, String username) {
		this.board_id = board_id;
		this.username = username;
	}
	public SigRecommendDTO(SightRecommend recommend) {
		this.board_id = recommend.getSight().getId();
		this.username = recommend.getUser().getUsername();
	}
}
