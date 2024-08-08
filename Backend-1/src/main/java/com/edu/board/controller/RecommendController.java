package com.edu.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edu.board.DTO.RecommendDTO;
import com.edu.board.service.RecommendService;


@RestController
@RequestMapping("/board/{board_id}/recommend")
public class RecommendController {
	@Autowired
	private RecommendService recommendService;
	
	@PostMapping
    public ResponseEntity<?> addRecommend(@RequestBody RecommendDTO recommendDTO) {
		
        recommendService.recommend(recommendDTO);
        return ResponseEntity.ok().build();
    }
	@DeleteMapping
	public ResponseEntity<?> cancleRecommend(@RequestBody RecommendDTO recommendDTO) {
		recommendService.cancleRecommend(recommendDTO);
		return ResponseEntity.ok().build();
	}
	
}
