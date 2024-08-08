package com.edu;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.edu.board.Entity.Board;
import com.edu.board.Entity.Reply;
import com.edu.board.repo.BoardRepository;
import com.edu.board.repo.ReplyRepository;
import com.edu.user.entitiy.User;
import com.edu.user.repo.UserRepository;

@SpringBootTest
public class BoardRepoTest {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BoardRepository boardRepository;
	@Autowired
	private ReplyRepository replyRepository;
	
	@Test
	public void testInsert() {
		List<User> users = userRepository.findAll();
		
		for(int i =1 ; i<=13 ; i++) {
			Board board = new Board();
			board.setTitle("test"+i + users.get(i%2).getUsername());
			board.setContent(users.get(i%2).getUsername()+ "가 등록한 글입니다!");
			board.setWriter(users.get(i%2));
			boardRepository.save(board);
		}
		
		List<Board> boards = boardRepository.findAll();
		for(int i=1; i<=5; i++) {
			Reply reply = new Reply();
			reply.setContent( users.get(i%2).getUsername() + "가 작성한 댓글입니다.");
			reply.setWriter( users.get(i%2));
			reply.setBoard(boards.get(0));
			replyRepository.save(reply);
		}
	}
	
	@Test
	public void testGetBoard() {
		Board board = boardRepository.findById(41L).get();
		
		System.out.println(board.getTitle());
		System.out.println(board.getContent());
	}
	
	@Test
	public void testGetBoardList() {
		User writer = userRepository.findById(1L).get();
		
		System.out.println("[ "+writer.getUsername()+"가 등록한 게시글 ]");
		for (Board board : writer.getBoardList()) {
			System.out.println("--->" + board.toString());
		}
	}
}
