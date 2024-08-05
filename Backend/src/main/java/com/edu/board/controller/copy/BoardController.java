//package com.edu.board.controller.copy;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.edu.board.entity.Board;
//import com.edu.board.service.BoardService;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@RequiredArgsConstructor
//@RestController
//public class BoardController {
//	private final BoardService boardService;
//	
//	@GetMapping("/board")
//	public ResponseEntity<?> getBoard() {
//		log.info("getBoard : All");
//		return ResponseEntity.ok(boardService.getBoards());
//	}
//	
//	@GetMapping("/board/{id}")
//	public ResponseEntity<?> getBoard(@PathVariable("id") Long id){
//		log.info("getBoard : " + id );
//		return ResponseEntity.ok(boardService.getBoard(id));
//	}
//	@DeleteMapping("/board/{id}")
//	public void deleteBoard(@PathVariable Long id){
//		log.info("getBoard : " +id );
//		boardService.deleteBoard(id);
//	}
//}
