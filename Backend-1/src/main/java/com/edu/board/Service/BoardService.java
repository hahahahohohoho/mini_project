package com.edu.board.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.board.DTO.BoardDTO;
import com.edu.board.Entity.Board;
import com.edu.board.repo.BoardRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BoardService {
	@Autowired
	private BoardRepository boardRepository;
	
	public List<BoardDTO> getBoardList(){
		return boardRepository.findAll().stream()
                .map(BoardDTO::new)
                .collect(Collectors.toList());
	};
	
	public BoardDTO getBoard(Long id) {
        Optional<Board> boardOptional = boardRepository.findById(id);
        if (boardOptional.isPresent()) {
            return new BoardDTO(boardOptional.get());
        } else {
            throw new EntityNotFoundException("Board not found with id " + id);
        }
    }
}
