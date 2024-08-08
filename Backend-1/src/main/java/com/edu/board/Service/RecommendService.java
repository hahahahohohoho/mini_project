package com.edu.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.board.DTO.RecommendDTO;
import com.edu.board.repo.RecommendRepository;

import jakarta.transaction.Transactional;

@Service
public class RecommendService {
	@Autowired
	private RecommendRepository recommendRepository;
	
	@Transactional
    public Integer recommend(RecommendDTO recommendDTO) {
        return recommendRepository.recommend(recommendDTO.getBoard_id(), recommendDTO.getUser_id());
    }
	@Transactional
	public void cancleRecommend(RecommendDTO recommendDTO) {
		recommendRepository.cancleRecommend(recommendDTO.getBoard_id(), recommendDTO.getUser_id());
	}
}
