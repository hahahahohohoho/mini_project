package com.edu.board.recommend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.user.entitiy.User;
import com.edu.user.repo.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class RecommendService {
	@Autowired
	private RecommendRepository recommendRepository;
	@Autowired
	private UserRepository userRepository;
	
	@Transactional
    public Integer recommend(RecommendDTO recommendDTO) {
		User user = userRepository.findByUsername(recommendDTO.getUsername());
        return recommendRepository.recommend(recommendDTO.getBoard_id(), user.getId());
    }
	@Transactional
	public void cancleRecommend(RecommendDTO recommendDTO) {
		User user = userRepository.findByUsername(recommendDTO.getUsername());
		recommendRepository.cancleRecommend(recommendDTO.getBoard_id(), user.getId());
	}
}
