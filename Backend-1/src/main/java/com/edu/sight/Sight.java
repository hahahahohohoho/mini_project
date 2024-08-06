package com.edu.sight;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Sight {
	@Id @GeneratedValue(strategy =  GenerationType.IDENTITY) @Column(name = "sight_id")
	private Long id;
	
	@Column(name="sight_title", nullable = false)
	private String title;
	
	@Column(name="addr", nullable = false)
	private String address;
	
	@Column(name="main_img")
	private String img1;
	
	@Column(name="thumbnail_img")
	private String img2;
	
	private String homepage;
	
	@Column(columnDefinition = "TEXT")
	private String content;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String point;
}
