package com.edu.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.board.repo.RecommendRepository;

@Service
public class RecommendService {
	@Autowired
	private RecommendRepository recommendRepository;
}
