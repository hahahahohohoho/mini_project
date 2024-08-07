package com.edu.sight;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SightService {

    @Autowired
    private SightRepo sightRepository;

    public List<Sight> getAllSight() {
        return sightRepository.findAll();
    }

    public Sight getSightById(Long id) {
        return sightRepository.findById(id).orElse(null);
    }

    public Sight saveSight(Sight restaurant) {
        return sightRepository.save(restaurant);
    }

    public void deleteSight(Long id) {
        sightRepository.deleteById(id);
    }


    public List<SightDTO> searchByName(String title) {
        return sightRepository.findByTitleContaining(title).stream()
                .map(SightDTO::new)
                .collect(Collectors.toList());
    }
    public List<SightDTO> searchByAddress(String address) {
    	return sightRepository.findByAddressContaining(address).stream()
    			.map(SightDTO::new)
    			.collect(Collectors.toList());
    }

}
