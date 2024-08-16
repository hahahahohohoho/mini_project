package com.edu.road;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface RoadRepo extends JpaRepository<Road, Long>{
	List<Road> findByGrade(Integer grade);
	List<Road> findByNameContaining(String name);
}