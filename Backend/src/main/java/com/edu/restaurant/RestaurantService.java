package com.edu.restaurant;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepo restaurantRepository;

    public List<RestaurantDTO> getAllRestaurants() {
        return restaurantRepository.findAll().stream()
                .map(RestaurantDTO::new)
                .collect(Collectors.toList());
    }

    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id).orElseThrow();
    }

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public void deleteRestaurant(Long id) {
        restaurantRepository.deleteById(id);
    }

    public List<RestaurantDTO> searchByMenu(String menu) {
        return restaurantRepository.findByMenuContaining(menu).stream()
                .map(RestaurantDTO::new)
                .collect(Collectors.toList());
    }

    public List<RestaurantDTO> searchByName(String name) {
        return restaurantRepository.findByNameContaining(name).stream()
                .map(RestaurantDTO::new)
                .collect(Collectors.toList());
    }
    public List<RestaurantDTO> searchByAddress(String address) {
    	return restaurantRepository.findByAddressContaining(address).stream()
    			.map(RestaurantDTO::new)
    			.collect(Collectors.toList());
    }

	public List<RestaurantDTO> getRestaurantByCity(Long cty_cd) {
		return restaurantRepository.findByCityId(cty_cd).stream()
    			.map(RestaurantDTO::new)
    			.collect(Collectors.toList());
	}

}
