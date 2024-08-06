package com.edu.restaurant;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface RestaurantRepo extends JpaRepository<Restaurant, Long>{
	List<Restaurant> findByMenu(String menu);
	List<Restaurant> findByName(String name);
	List<Restaurant> findByAddress(String address);
}
