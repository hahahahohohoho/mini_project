//package com.edu.user;
//
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.stereotype.Component;
//
//import com.edu.user.entity.User;
//import com.edu.user.entity.UserRole;
//
//import lombok.RequiredArgsConstructor;
//
//@Component
//@RequiredArgsConstructor
//public class DataSetup implements ApplicationRunner {
//	private final UserRepo userRepo;
//	
//	@Override
//	public void run(ApplicationArguments args) throws Exception {
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
//		userRepo.save(user1);
//		userRepo.save(user2);
//	}
//}
