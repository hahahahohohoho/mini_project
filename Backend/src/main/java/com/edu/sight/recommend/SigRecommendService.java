package com.edu.sight.recommend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.user.entitiy.User;
import com.edu.user.repo.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class SigRecommendService {
	@Autowired
	private SigRecommendRepository recommendRepository;
	@Autowired
	private UserRepository userRepository;
	
	@Transactional
    public Integer recommend(Long res_id, SigRecommendDTO recommendDTO) {
		User user = userRepository.findByUsername(recommendDTO.getUsername());
        return recommendRepository.recommend(res_id, user.getId());
    }
	@Transactional
	public void cancleRecommend(Long res_id,SigRecommendDTO recommendDTO) {
		User user = userRepository.findByUsername(recommendDTO.getUsername());
		recommendRepository.cancleRecommend(res_id, user.getId());
	}
}
