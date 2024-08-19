//package com.edu.board;
//
//import java.util.List;
//
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.stereotype.Component;
//
//import com.edu.board.Entity.Board;
//import com.edu.board.Entity.BoardRepository;
//import com.edu.board.Entity.Comment;
//import com.edu.board.Entity.CommentRepository;
//import com.edu.user.entitiy.User;
//import com.edu.user.repo.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Component
//@RequiredArgsConstructor
//public class DataSetup implements ApplicationRunner{
//	private final BoardRepository boardRepo;
//	private final CommentRepository commentRepo;
//	private final UserRepository userRepository;
//	
//	@Override
//	public void run(ApplicationArguments args) throws Exception {
//		List<User> user = userRepository.findAll();
//		for(int i=0; i<=10;i++) {
//
//			boardRepo.save(Board.builder()
//					.content("test"+i)
//					.title("test title"+i)
//					.writer(user.get(i%2)).build());
//		}
//		for(int i=0; i<=5;i++) {
//			List<Board> board = boardRepo.findAll();
//			commentRepo.save(Comment.builder()
//					.content("test"+i)
//					.board(board.get(i+1))
//					.writer(user.get(i%2)).build());
//		}
//	}
//	
//}
