package com.edu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.domain.Board;
import com.edu.service.BoardService;
import com.edu.service.LikeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/board-like")
public class BoardLikeController {
	@Autowired
	private BoardService boardService;
	@Autowired
	private LikeService ls;
	
	@GetMapping("/board/{boardid}")
	public Long getLikeByBoard(@PathVariable Long boardId) {
		Board a = boardService.getBoard(boardId);
		return ls.getLikesByPostId(a);
	}
	
}
