//package com.edu.board.service;
//
//import java.util.List;
//
//import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.edu.board.entity.Board;
//import com.edu.board.persistence.BoardRepo;
//
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class BoardService {
//	private final BoardRepo repo; 
//	
//	
//	public List<Board> getBoards() {
//		return repo.findAll();
//	}
//
//	public Board getBoard(Long id) {
//		Board re = repo.findById(id).get();
//		re.viewCountUp(re);
//		return re;
//	}
//
//	public void deleteBoard(Long id) {
//		repo.deleteById(id);
//	}
//
//	public Board postBoard(Board board) {
//		return repo.save(board);
//	}
//
//	public Board putBoard(Board board) {
//		Board fb = repo.findById(board.getId()).get();
//		fb.setTitle(board.getTitle());
//		fb.setContent(board.getContent());
//		return repo.save(fb);
//	}
//}
