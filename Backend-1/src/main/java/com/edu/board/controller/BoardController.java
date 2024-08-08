package com.edu.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.board.DTO.BoardDTO;
import com.edu.board.service.BoardService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;







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
	@PostMapping
	public void postBoard(@RequestBody BoardDTO boardDTO) {
		boardService.postBoard(boardDTO);
	}
	@DeleteMapping("/{id}")
	public void deleteBoard(@PathVariable Long id) {
		boardService.deleteBoard(id);
	}
	@PutMapping("{id}")
	public void putMethodName(@PathVariable Long id, @RequestBody BoardDTO boardDTO) {
		//TODO: process PUT request
		boardService.putBoard(id, boardDTO);
	}
}
