package com.edu.road;

import lombok.Getter;

@Getter
public class RoadDTO {
	private String name;
	private String geometry;
	private Integer cty_cd;
	private Integer grade;
	
	public RoadDTO(Road road) {
		this.name = road.getName();
		this.geometry = road.getGeometry();
		this.cty_cd = road.getCty_cd();
		this.grade = road.getGrade();
	}

	public RoadDTO(String name, String geometry, Integer cty_cd, Integer grade) {
		this.name = name;
		this.geometry = geometry;
		this.cty_cd = cty_cd;
		this.grade = grade;
	}
	
}
