package com.edu.restaurant;

import com.edu.common.CommentableEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Restaurant extends CommentableEntity{

	// 레스토랑 용 필드
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
	
    public Restaurant() {
    }

	public Restaurant(Long id, String address, String menu, String img1, String img2, String usage_day, String point,
			String name, String content) {
		super.setId(id);
		super.setContent(content);
		this.address = address;
		this.menu = menu;
		this.img1 = img1;
		this.img2 = img2;
		this.usage_day = usage_day;
		this.point = point;
		this.name = name;
	}	
    
}