package com.edu.restaurant;

import java.util.List;

import org.hibernate.annotations.BatchSize;

import com.edu.cty.City;
import com.edu.restaurant.recommend.ResRecommend;
import com.edu.restaurant.reply.RestaurantReply;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Restaurant {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "rt_id")
	private Long id;
	
	private String address;
	
	private String menu;
	
	@Column(name="main_img")
	private String img1;
	
	@Column(name="thumbnail_img")
	private String img2;
	
	private String usage_day;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String point;
	
	@Column(name = "rt_name")
	private String name;
	
	@Column(columnDefinition = "TEXT")
	private String content;	
    
	@JoinColumn(name="cty_cd", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private City city;
	
	@OneToMany(mappedBy = "restaurant", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@BatchSize(size = 10)
	private List<RestaurantReply> replys;
	
	@OneToMany(mappedBy = "restaurant", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@BatchSize(size = 10)
	private List<ResRecommend> recommends;
	
	
}
