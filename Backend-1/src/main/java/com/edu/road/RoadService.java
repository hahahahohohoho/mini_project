package com.edu.road;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoadService {
	@Autowired
	private RoadRepo roadRepo;
	
	public List<Road> getAllRoads(){
		return roadRepo.findAll();
	};
	public List<Road> searchByGrade(Integer grade){
		return roadRepo.findByGrade(grade);
	};
	public List<Road> searchByName(String name){
		return roadRepo.findByNameContaining(name);
	};
}
