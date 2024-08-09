package com.edu.sight;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sights")
public class SightController {

    @Autowired
    private SightService sightService;

    @GetMapping
    public List<Sight> getAllRestaurants() {
        return sightService.getAllSight();
    }

    @GetMapping("/{id}")
    public Sight getRestaurantById(@PathVariable Long id) {
        return sightService.getSightById(id);
    }

    @PostMapping
    public Sight createRestaurant(@RequestBody Sight restaurant) {
        return sightService.saveSight(restaurant);
    }

    @PutMapping("/{id}")
    public Sight updateRestaurant(@PathVariable Long id, @RequestBody Sight sightDetail) {
        Sight sight1 = sightService.getSightById(id);
        if (sightDetail != null) {
            sight1.setAddress(sightDetail.getAddress());
            sight1.setImg1(sightDetail.getImg1());
            sight1.setImg2(sightDetail.getImg2());
            sight1.setPoint(sightDetail.getPoint());
            sight1.setTitle(sightDetail.getTitle());
            sight1.setContent(sightDetail.getContent());
            return sightService.saveSight(sightDetail);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteRestaurant(@PathVariable Long id) {
        sightService.deleteSight(id);
    }


    @GetMapping("/search/title")
    public List<SightDTO> searchByName(@RequestBody Map<String, String> payload) {
    	String name = payload.get("title");
        return sightService.searchByName(name);
    }
    
    @GetMapping("/search/address")
    public List<SightDTO> searchByAddress(@RequestBody Map<String, String> payload) {
        String address = payload.get("address");
        return sightService.searchByAddress(address);
    }
}