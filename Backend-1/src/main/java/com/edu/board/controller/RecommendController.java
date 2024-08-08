package com.edu.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.edu.board.service.RecommendService;

@RestController
public class RecommendController {
	@Autowired
	private RecommendService recommendService;
}
