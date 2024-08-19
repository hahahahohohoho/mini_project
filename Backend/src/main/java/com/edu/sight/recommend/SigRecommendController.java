package com.edu.sight.recommend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/sight")
public class SigRecommendController {
	@Autowired
	private SigRecommendService recommendService;
	
	@PostMapping("/{sig_id}/recommend")
    public String addRecommend(@PathVariable Long sig_id,  @RequestBody SigRecommendDTO recommendDTO) {
        recommendService.recommend(sig_id, recommendDTO);
        return "추천 성공";
    }
	@DeleteMapping("/{sig_id}/recommend")
	public String cancleRecommend(@PathVariable Long sig_id,@RequestBody SigRecommendDTO recommendDTO) {
		recommendService.cancleRecommend(sig_id,recommendDTO);
		return "삭제 성공";
	}
	
}
