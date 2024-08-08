package com.edu.board.DTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.edu.board.Entity.Board;

import lombok.Getter;

@Getter
public class BoardDTO {
	private String username;
	private String title;
	private String content;
	private Integer viewcount;
	private LocalDateTime createTime;
	private List<ReplyDTO> replys;

	public BoardDTO(Board board) {
		this.username = board.getWriter().getUsername();
		this.title = board.getTitle();
		this.content = board.getContent();
		this.viewcount = board.getViewcount();
		this.createTime = board.getCreateDate();
		
		List<ReplyDTO> replyDTOs = board.getReplys().stream()
                .map(ReplyDTO::new)
                .collect(Collectors.toList());

		
		this.replys = replyDTOs;
	}

	public BoardDTO(String username, String title, String content) {
		this.username = username;
		this.title = title;
		this.content = content;
	}
	
	
}
