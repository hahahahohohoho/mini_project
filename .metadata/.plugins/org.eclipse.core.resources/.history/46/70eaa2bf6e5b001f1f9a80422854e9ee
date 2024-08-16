package com.edu.sight;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface SightRepo extends JpaRepository<Sight, Long>{
	List<Sight> findByTitleContaining(String title);
	List<Sight> findByAddressContaining(String address);
}
