package com.edu.user.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.edu.board.Entity.Board;
import com.edu.board.Entity.Reply;
import com.edu.user.entitiy.User;

import lombok.Getter;

@Getter
public class AdminUserDTO {
	private Long id;
	private String email;
	private String username;
	private Integer boardCount;
	private Integer replyCount;
	private LocalDateTime signUpDate;
	
	public AdminUserDTO(User user) {
		this.id = user.getId();
		this.email = user.getEmail();
		this.username = user.getUsername();
		this.signUpDate = user.getSignUpDate();
		
		List<Board> boards = user.getBoardList();
		this.boardCount = boards.size();
		
		List<Reply> replys = user.getReplyList();
		this.replyCount = replys.size();
	}
}
