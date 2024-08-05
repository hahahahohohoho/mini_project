//package com.edu.board;
//
//import java.util.Random;
//
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.stereotype.Component;
//
//import com.edu.board.entity.Board;
//import com.edu.board.persistence.BoardRepo;
//import com.edu.user.entity.User;
//import com.edu.user.entity.UserRole;
//
//import lombok.RequiredArgsConstructor;
//
//@Component
//@RequiredArgsConstructor
//public class DataSetup implements ApplicationRunner{
//	private final BoardRepo boardRepo;
//	
//	@Override
//	public void run(ApplicationArguments args) throws Exception {
//		Random rd = new Random();
//		User user1 = User.builder().id(1L)
//				.email("example@naver.com")
//				.nickName("홍길동")
//				.password("abcd")
//				.userRole(UserRole.ROLE_USER).build();
//		User user2 = User.builder().id(2L)
//				.email("example2@naver.com")
//				.nickName("이순신")
//				.password("abcd")
//				.userRole(UserRole.ROLE_ADMIN).build();
//		User[] s = {user1, user2};
//		
//		for(int i = 1 ; i <=10; i++) {
//			boardRepo.save(Board.builder()
//					.title("title"+i)
//					.content("content"+i)
//					.viewCount(rd.nextInt(120))
//					.user(s[(i%2)])
//					.isSecret(false)
//					.build());
//		}
//	}
//
//}
