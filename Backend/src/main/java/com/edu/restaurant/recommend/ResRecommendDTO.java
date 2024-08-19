package com.edu.restaurant.recommend;

import lombok.Getter;

@Getter
public class ResRecommendDTO {
	private Long board_id;
	private String username;
	
	public ResRecommendDTO(Long board_id, String username) {
		this.board_id = board_id;
		this.username = username;
	}
	public ResRecommendDTO(ResRecommend recommend) {
		this.board_id = recommend.getRestaurant().getId();
		this.username = recommend.getUser().getUsername();
	}
}
