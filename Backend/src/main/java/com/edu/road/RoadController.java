package com.edu.road;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/road")
public class RoadController {
	@Autowired
	private RoadService roadService;
	@GetMapping()
	public List<RoadDTO> searchByName() {
		return roadService.getAllRoads();
	}
	@GetMapping("/grade/{grade}")
	public List<RoadDTO> searchByGrade(@PathVariable Integer grade) {
		return roadService.searchByGrade(grade);
	}
	@GetMapping("/name")
	public List<RoadDTO> searchByName(@RequestParam String name) {
		return roadService.searchByName(name);
	}
	@GetMapping("/city/{cty_cd}")
	public List<RoadDTO> searchByCity(@PathVariable Long cty_cd) {
		return roadService.searchByCity(cty_cd);
	}
}
