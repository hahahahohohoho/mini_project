//package com.edu.board;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Random;
//
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.stereotype.Component;
//
//import com.edu.board.Entity.Board;
//import com.edu.board.repo.BoardRepository;
//import com.edu.user.entitiy.User;
//import com.edu.user.repo.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@Component
//@RequiredArgsConstructor
//public class DataSetup implements ApplicationRunner{
//	private final BoardRepository boardRepo;
//	private final UserRepository userRepository;
//	
//	@Override
//	public void run(ApplicationArguments args) throws Exception {
//		List<User> users = userRepository.findAll();
//		Random rd = new Random();
//		for(int i =1 ; i<=13 ; i++) {
//			Board board = new Board();
//				board.setTitle("test"+i + users.get(i%2).getUsername());
//				board.setContent(users.get(i%2).getUsername()+ "가 등록한 글입니다!");
//				board.setWriter(users.get(i%2));
//				board.setViewcount(rd.nextInt(20));
//				board.setCreateDate(LocalDateTime.now());
//			boardRepo.save(board);
//		}
//	}
//	
//}