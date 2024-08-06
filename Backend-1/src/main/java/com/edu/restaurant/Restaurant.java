package com.edu.restaurant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter @Builder
public class Restaurant {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "rt_id")
	private Long id;
	
	private String address;
	
	private String menu;
	
	@Column(name="main_img", columnDefinition = "TEXT")
	private String img1;
	
	@Column(name="thumbnail_img", columnDefinition = "TEXT")
	private String img2;
	
	private String usage_day;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String point;
	
	@Column(name = "rt_name")
	private String name;
	
	@Column(columnDefinition = "TEXT")
	private String content;
	
    @Builder
    public Restaurant(String address, String menu, String img1, String img2, String usage_day, String point, String name, String content) {
        this.address = address;
        this.menu = menu;
        this.img1 = img1;
        this.img2 = img2;
        this.usage_day = usage_day;
        this.point = point;
        this.name = name;
        this.content = content;
    }
}
