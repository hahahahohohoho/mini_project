package com.edu.restaurant;

import java.util.List;
import java.util.stream.Collectors;

import com.edu.restaurant.recommend.ResRecommendDTO;
import com.edu.restaurant.reply.ResReplyDTO;

import lombok.Getter;

@Getter
public class RestaurantDTO {
	private Long id;
	private String address;
	private String point;
	private String content;
	private String menu;
	private String name;
	private String usageDay;
	private String img1;
	private String img2;
	private List<ResReplyDTO> replys;
	private List<ResRecommendDTO> recommends;
	
	
	public RestaurantDTO(String address, String point, String menu, String name, String usage_day, String img2) {
		this.address = address;
		this.point = point;
		this.menu = menu;
		this.name = name;
		this.usageDay = usage_day;
		this.img2 = img2;
	}
	
	 public RestaurantDTO(Restaurant restaurant) {
	        this.id = restaurant.getId();
	        this.address = restaurant.getAddress();
	        this.menu = restaurant.getMenu();
	        this.img1 = restaurant.getImg1();
	        this.img2 = restaurant.getImg2();
	        this.usageDay = restaurant.getUsage_day();
	        this.point = restaurant.getPoint();
	        this.name = restaurant.getName();
	        this.content = restaurant.getContent();
	         List<ResReplyDTO> dTOs = restaurant.getReplys().stream()
	        		.map(ResReplyDTO::new)
	        		.collect(Collectors.toList());
	        this.replys = dTOs;
	        List<ResRecommendDTO> recommenddTOs = restaurant.getRecommends().stream()
	        		.map(ResRecommendDTO::new)
	        		.collect(Collectors.toList());
	        this.recommends = recommenddTOs;
	    }
	
}
