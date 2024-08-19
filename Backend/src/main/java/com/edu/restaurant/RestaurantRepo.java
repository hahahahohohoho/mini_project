package com.edu.restaurant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;



public interface RestaurantRepo extends JpaRepository<Restaurant, Long>{
	List<Restaurant> findByMenuContaining(String menu);
	List<Restaurant> findByNameContaining(String name);
	List<Restaurant> findByAddressContaining(String address);
	List<Restaurant> findByCityId(Long cty_cd);;
}
