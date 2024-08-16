package com.edu.road;



import com.edu.cty.City;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Getter
@Entity
public class Road {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "rd_id")
	private Long id;
	
	@JoinColumn(name="cty_cd", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private City city;
	
	@Column(nullable = false, name = "rd_nm")
	private String name;
	
	@Column(nullable = false)
	private Integer grade;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String geometry;
	
	private float length;
}
