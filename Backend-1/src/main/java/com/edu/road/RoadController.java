package com.edu.road;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/road")
public class RoadController {
	@Autowired
	private RoadService roadService;
	@GetMapping()
	public List<Road> searchByName() {
		return roadService.getAllRoads();
	}
	@GetMapping("/search/grade")
	public List<Road> searchByGrade(@RequestBody Map<String, String> payload) {
		Integer grade = Integer.parseInt(payload.get("grade")); 
		return roadService.searchByGrade(grade);
	}
	@GetMapping("/search/name")
	public List<Road> searchByName(@RequestBody Map<String, String> payload) {
		String name= payload.get("name"); 
		return roadService.searchByName(name);
	}
}
