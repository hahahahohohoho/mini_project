package com.edu.road;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RoadService {
	@Autowired
	private RoadRepo roadRepo;
	
	public List<RoadDTO> getAllRoads(){
		return roadRepo.findAll().stream()
                .map(RoadDTO::new)
                .collect(Collectors.toList());
	};
	public List<RoadDTO> searchByGrade(Integer grade){
		return roadRepo.findByGrade(grade).stream()
                .map(RoadDTO::new)
                .collect(Collectors.toList());
	};
	public List<RoadDTO> searchByName(String name){
		return roadRepo.findByNameContaining(name).stream()
                .map(RoadDTO::new)
                .collect(Collectors.toList());
	};
	public List<RoadDTO> searchByCity(Long cty_cd){
		return roadRepo.findByCityId(cty_cd).stream()
                .map(RoadDTO::new)
                .collect(Collectors.toList());
	};
}
