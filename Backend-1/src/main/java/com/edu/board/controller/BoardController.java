package com.edu.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.board.Entity.BoardDTO;
import com.edu.board.service.BoardService;





@RestController
@RequestMapping("/board")
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	@GetMapping("/boardList")
	public List<BoardDTO> getBoardList() {
		return boardService.getBoardList();
	}
	
	@GetMapping("/{id}")
	public BoardDTO getBoard(@PathVariable Long id) {
		return boardService.getBoard(id);
	}
	
}
