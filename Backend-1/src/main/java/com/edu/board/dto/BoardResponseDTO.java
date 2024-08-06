package com.edu.board.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.edu.user.dto.UserResponse;

import lombok.Getter;

@Getter
public class BoardResponseDTO {
	private Long id;
	private String title;
	private String content;
	private Integer likecount;
	private Integer viewcount;
	private UserResponse writer; 
	private LocalDateTime createdAt;
	private List<CommentResponseDTO> commentList;
	
	public BoardResponseDTO(Long id, String title, String content, Integer likecount, Integer viewcount,
			UserResponse writer, LocalDateTime createdAt, List<CommentResponseDTO> commentList) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.likecount = likecount;
		this.viewcount = viewcount;
		this.writer = writer;
		this.createdAt = createdAt;
		this.commentList = commentList;
	}

	public BoardResponseDTO(Long id, String title, String content, Integer likecount, Integer viewcount,
			UserResponse writer) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.likecount = likecount;
		this.viewcount = viewcount;
		this.writer = writer;
	}
	
}
