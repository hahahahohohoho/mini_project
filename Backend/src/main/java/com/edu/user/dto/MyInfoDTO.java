package com.edu.user.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.edu.board.board.BoardDTO;
import com.edu.board.reply.ReplyDTO;
import com.edu.user.entitiy.User;

import lombok.Data;

@Data
public class MyInfoDTO {
	
	private String username;
	private String email;
	private String password;
	private List<BoardDTO> boards;
	private List<ReplyDTO> replys;
	
	public MyInfoDTO(User user) {
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.password = user.getPassword();
		List<BoardDTO> boardDTOs = user.getBoardList().stream()
				.map(BoardDTO::new)
				.collect(Collectors.toList());
		this.boards = boardDTOs;
		List<ReplyDTO> replyDTOs = user.getReplyList().stream()
				.map(ReplyDTO::new)
				.collect(Collectors.toList());		
		this.replys = replyDTOs;
	}
}
