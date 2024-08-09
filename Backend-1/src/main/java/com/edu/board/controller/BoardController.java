package com.edu.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.board.DTO.BoardDTO;
import com.edu.board.DTO.SearchRequest;
import com.edu.board.Entity.Board;
import com.edu.board.repo.BoardRepository;
import com.edu.board.service.BoardService;








@RestController
@RequestMapping("/api/board")
public class BoardController {
	@Autowired
	private BoardService boardService;
	@Autowired 
	private BoardRepository boardRepository;
	
	 @PostMapping("/search")
	    public Page<Board> searchBoards(@PageableDefault(size = 10) Pageable pageable,
	                                    @RequestBody SearchRequest searchRequest) {

	        String searchType = searchRequest.getSearchType();
	        String searchKeyword = searchRequest.getSearchKeyword();
	        String sortBy = searchRequest.getSortBy();

	        if (searchKeyword == null || searchKeyword.isBlank()) {
	            switch (sortBy) {
	                case "recommendCount":
	                    return boardRepository.findAllByOrderByRecommendCountDesc(pageable);
	                case "viewCount":
	                    return boardRepository.findAllByOrderByViewcountDesc(pageable);
	                case "createDate":
	                default:
	                    return boardRepository.findAllByOrderByCreateDateDesc(pageable);
	            }
	        } else if (searchType.equals("nickname")) {
	            return boardRepository.findByWriterContaining(searchKeyword, pageable);
	        } else {
	            return boardRepository.findByTitleContaining(searchKeyword, pageable);
	        }
	    }
	
	@GetMapping
	public List<BoardDTO> getBoardList() {
		return boardService.getBoardList();
	}
	
	@GetMapping("/{id}")
	public BoardDTO getBoard(@PathVariable Long id) {
		return boardService.getBoardDetails(id);
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
