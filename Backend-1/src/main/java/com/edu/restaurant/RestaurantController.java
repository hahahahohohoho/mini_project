package com.edu.restaurant;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{id}")
    public Restaurant getRestaurantById(@PathVariable Long id) {
        return restaurantService.getRestaurantById(id);
    }

    @PostMapping
    public Restaurant createRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantService.saveRestaurant(restaurant);
    }

    @PutMapping("/{id}")
    public Restaurant updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurantDetails) {
        Restaurant restaurant = restaurantService.getRestaurantById(id);
        if (restaurant != null) {
            restaurant.setAddress(restaurantDetails.getAddress());
            restaurant.setMenu(restaurantDetails.getMenu());
            restaurant.setImg1(restaurantDetails.getImg1());
            restaurant.setImg2(restaurantDetails.getImg2());
            restaurant.setUsage_day(restaurantDetails.getUsage_day());
            restaurant.setPoint(restaurantDetails.getPoint());
            restaurant.setName(restaurantDetails.getName());
            restaurant.setContent(restaurantDetails.getContent());
            return restaurantService.saveRestaurant(restaurant);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
    }

    @GetMapping("/search/menu")
    public List<RestaurantDTO> searchByMenu(@RequestParam String menu) {
        return restaurantService.searchByMenu(menu);
    }

    @GetMapping("/search/name")
    public List<RestaurantDTO> searchByName(@RequestParam String name) {
        return restaurantService.searchByName(name);
    }
    
    @GetMapping("/search/address")
    public List<RestaurantDTO> searchByAddress(@RequestParam String address) {
        return restaurantService.searchByAddress(address);
    }
}
