package com.edu.restaurant;

import com.edu.board.recommend.common.Recommend;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class RestaurantRecommend extends Recommend {
	@ManyToOne
	private Restaurant restaurant;
}
