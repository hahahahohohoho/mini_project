package com.edu.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.board.Entity.Board;
import com.edu.board.Service.BoardService;
import com.edu.board.dto.BoardResponseDTO;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
	@Autowired
	private BoardService boardService;
	
	@GetMapping()
	public List<Board> findAllBoard() {
		return boardService.getAllBoards();
	}
	@GetMapping("/search")
	public List<BoardResponseDTO> findByTitle(String title) {
		return boardService.findByTitle(title);
	}
	
}
