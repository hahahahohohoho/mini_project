package com.edu.board.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.edu.board.Entity.Board;
import com.edu.user.dto.UserResponse;

import lombok.Getter;

@Getter
public class BoardResponseDTO {
	private String title;
	private String content;
	private Integer likecount;
	private Integer viewcount;
	private UserResponse writer; 
	private LocalDateTime createdAt;
	private List<CommentResponseDTO> commentList;
	
	public BoardResponseDTO(String title, String content, Integer likecount, Integer viewcount,
			UserResponse writer, LocalDateTime createdAt, List<CommentResponseDTO> commentList) {
		this.title = title;
		this.content = content;
		this.likecount = likecount;
		this.viewcount = viewcount;
		this.writer = writer;
		this.createdAt = createdAt;
		this.commentList = commentList;
	}

	public BoardResponseDTO(String title, String content, Integer likecount, Integer viewcount,
			UserResponse writer) {
		this.title = title;
		this.content = content;
		this.likecount = likecount;
		this.viewcount = viewcount;
		this.writer = writer;
	}
	public BoardResponseDTO(Board board) {
		this.title = board.getTitle();
		this.content = board.getContent();
		this.likecount = board.getLikecount();
		this.viewcount = board.getViewcount();
		this.createdAt = board.getCreateDate();
		//TODO writer UserResponse로 바꾸기
		//		this.writer = board.getWriter();
	}
	
}
