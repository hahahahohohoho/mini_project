package com.edu.board.recommend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/board")
public class RecommendController {
	@Autowired
	private RecommendService recommendService;
	
	@PostMapping("{board_id}/recommend")
    public String addRecommend(@PathVariable Long board_id, @RequestBody RecommendDTO recommendDTO) {
		
        recommendService.recommend(recommendDTO);
        return "추천 성공";
    }
	@DeleteMapping("{board_id}/recommend")
	public String cancleRecommend(@PathVariable Long board_id,@RequestBody RecommendDTO recommendDTO) {
		recommendService.cancleRecommend(recommendDTO);
		return "삭제 성공";
	}
	
}
