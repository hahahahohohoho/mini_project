package com.edu.sight;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SightService {

    @Autowired
    private SightRepo sightRepository;

    public List<SightDTO> getAllSight() {
        return sightRepository.findAll().stream()
    			.map(SightDTO::new)
    			.collect(Collectors.toList());
    }
    public SightDTO getSightByIdDTO(Long id) {
        return new SightDTO(sightRepository.findById(id).orElseThrow()) ;
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

	public List<SightDTO> getSightByCity(Long cty_cd) {
		return sightRepository.findByCityId(cty_cd).stream()
    			.map(SightDTO::new)
    			.collect(Collectors.toList());
	}

}
