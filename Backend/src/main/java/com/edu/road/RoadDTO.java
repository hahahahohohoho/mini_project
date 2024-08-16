package com.edu.road;


import lombok.Getter;

@Getter
public class RoadDTO {
	private String name;
	private String geometry;
	private Integer grade;
	
	public RoadDTO(Road road) {
		this.name = road.getName();
		this.geometry = road.getGeometry();
		this.grade = road.getGrade();
	}
}
