package com.edu.restaurant.recommend;

import lombok.Getter;

@Getter
public class ResRecommendDTO {
	private Long restaurant_id;
	private String username;
	
	public ResRecommendDTO(Long board_id, String username) {
		this.restaurant_id = board_id;
		this.username = username;
	}
	public ResRecommendDTO(ResRecommend recommend) {
		this.restaurant_id = recommend.getRestaurant().getId();
		this.username = recommend.getUser().getUsername();
	}
}
