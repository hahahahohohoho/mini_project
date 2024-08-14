package com.edu.board.recommend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/board/{board_id}/recommend")
public class RecommendController{
	@Autowired
	private RecommendService recommendService;
	
	@PostMapping
    public String addRecommend(@RequestBody RecommendDTO recommendDTO) {
		
        recommendService.recommend(recommendDTO);
        return "추천 성공";
    }
	@DeleteMapping
	public String cancleRecommend(@RequestBody RecommendDTO recommendDTO) {
		recommendService.cancleRecommend(recommendDTO);
		return "삭제 성공";
	}
	
}
