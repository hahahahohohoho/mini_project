package com.edu.restaurant.recommend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/res")
public class ResRecommendController {
	@Autowired
	private ResRecommendService recommendService;
	
	@PostMapping("/{res_id}/recommend")
    public String addRecommend(@PathVariable Long res_id,  @RequestBody ResRecommendDTO recommendDTO) {
        recommendService.recommend(res_id, recommendDTO);
        return "추천 성공";
    }
	@DeleteMapping("/{res_id}/recommend")
	public String cancleRecommend(@PathVariable Long res_id,@RequestBody ResRecommendDTO recommendDTO) {
		recommendService.cancleRecommend(res_id,recommendDTO);
		return "삭제 성공";
	}
	
}
