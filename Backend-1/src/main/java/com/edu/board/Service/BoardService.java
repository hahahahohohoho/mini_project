package com.edu.board.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.board.DTO.BoardDTO;
import com.edu.board.Entity.Board;
import com.edu.board.repo.BoardRepository;
import com.edu.user.repo.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@Service
public class BoardService {
	@Autowired
	private BoardRepository boardRepository;
	@Autowired
	private UserRepository userRepository;
	
	public List<BoardDTO> getBoardList(){
		return boardRepository.findAll().stream()
                .map(BoardDTO::new)
                .collect(Collectors.toList());
	};
	
	@Transactional
	public BoardDTO getBoardDetails(Long id
//			, HttpServletRequest request, HttpServletResponse response
			) {
//        Cookie oldCookie = null;
//        Cookie[] cookies = request.getCookies();
//        if(cookies!=null) {
//        	for(Cookie cookie : cookies)
//        		if(cookie.getName().equals("boardView"))
//        			oldCookie=cookie;
//        }
//        if(oldCookie !=null) { 
//        	if(!oldCookie.getValue().contains("[" + id.toString() + "]")) {
//        		boardRepository.updateCount(id);
//        		oldCookie.setValue(oldCookie.getValue()+"[" + id + "]");
//        		oldCookie.setPath("/");
//        		oldCookie.setMaxAge(60*60*24);
//        		response.addCookie(oldCookie);
//        	}
//        }
//        else {
//        	boardRepository.updateCount(id);
//        	Cookie newCookie = new Cookie("bardView", "[" + id + "]");
//        	newCookie.setPath("/");
//        	newCookie.setMaxAge(60*60*24);
//        	response.addCookie(newCookie);
//        }
		BoardDTO dTO = new BoardDTO(boardRepository.findByIdOrThrow(id));
		boardRepository.updateCount(id);
        return dTO;
    }
	
	public void postBoard(BoardDTO boardDTO) {
		Board board = new Board();
			board.setContent(boardDTO.getContent());
			board.setTitle(boardDTO.getTitle());
			board.setWriter(userRepository.findByUsername(boardDTO.getUsername()));
			board.setViewcount(0);
			board.setCreateDate(LocalDateTime.now());
		boardRepository.save(board);
	}
	
	public void deleteBoard(Long id) {
		boardRepository.deleteById(id);
	}

	public void putBoard(Long id, BoardDTO boardDTO) {
		Board board = boardRepository.findByIdOrThrow(id);
			board.setContent(boardDTO.getContent());
			board.setTitle(boardDTO.getTitle());
			board.setCreateDate(LocalDateTime.now());
		boardRepository.save(board);
	}
}
