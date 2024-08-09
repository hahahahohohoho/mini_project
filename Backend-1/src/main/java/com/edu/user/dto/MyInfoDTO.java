package com.edu.user.dto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.edu.board.Entity.Board;
import com.edu.board.Entity.Reply;
import com.edu.user.entitiy.User;

import lombok.Getter;

@Getter
public class MyInfoDTO {
	@Autowired
	private PasswordEncoder encoder;
	
	private String username;
	private String email;
	private String password;
	private List<Board> boards;
	private List<Reply> replys;
	
	public MyInfoDTO(User user) {
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.password = encoder.encode(user.getPassword()); 
		this.boards = user.getBoardList();
		this.replys = user.getReplyList();
	}
}
