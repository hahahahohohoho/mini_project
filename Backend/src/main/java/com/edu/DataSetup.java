//package com.edu;
//
//import java.util.Random;
//
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.stereotype.Component;
//
//import com.edu.domain.Board;
//import com.edu.persistence.BoardRepo;
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
//		String s[] = {"홍길동", "임꺽정"};
//		Random rd = new Random();
//		for(int i = 1 ; i <=10; i++) {
//			boardRepo.save(Board.builder()
//					.title("title"+i)
//					.content("content"+i)
//					.viewcount(rd.nextInt(120))
//					.writer(s[(i%2)])
//					.build());
//		}
//	}
//
//}
