package com.edu.board.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.board.Entity.Board;
import com.edu.board.Entity.BoardRepository;
import com.edu.board.dto.BoardResponseDTO;

@Service
public class BoardService {
	@Autowired
	private BoardRepository boardRepository;
	
	public List<Board> getAllBoards(){
		return boardRepository.findAll();
	}
	
	public List<BoardResponseDTO> findByTitle(String title){
		return boardRepository.findByTitleContaining(title).stream()
				.map(BoardResponseDTO::new)
                .collect(Collectors.toList());
	}
}
