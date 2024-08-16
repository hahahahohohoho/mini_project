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

import jakarta.transaction.Transactional;

@Service
public class BoardService {
	@Autowired
	private BoardRepository boardRepository;
	@Autowired
	private UserRepository userRepository;
	
	public List<BoardDTO> getBoardList(){
	       // Step 1: 모든 Board와 연관된 Reply를 가져옴
        List<Board> boardsWithReplies = boardRepository.findAllWithReplies();
        // TODO 굳이 필요하지 않으니 삭제해버리자.
        // Step 2: 모든 Board와 연관된 Recommend를 가져옴
//        List<Board> boardsWithRecommends = boardRepository.findAllWithRecommends();
//
//        // Step 3: Map을 이용하여 Board 객체를 ID 기준으로 정리
//        Map<Long, Board> boardMap = boardsWithReplies.stream()
//                .collect(Collectors.toMap(Board::getId, board -> board));
//
//        // Step 4: Recommend 데이터를 Board 객체에 추가
//        for (Board boardWithRecommend : boardsWithRecommends) {
//            Board board = boardMap.get(boardWithRecommend.getId());
//            if (board != null) {
//                board.setRecommends(boardWithRecommend.getRecommends());
//            }
//        }

        // Step 5: 최종적으로 결합된 Board 리스트 반환
        return boardsWithReplies.stream()
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