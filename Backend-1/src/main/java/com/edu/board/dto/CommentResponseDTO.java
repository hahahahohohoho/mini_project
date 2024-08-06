package com.edu.board.dto;

import java.util.ArrayList;
import java.util.List;

import com.edu.board.Entity.Comment;
import com.edu.user.dto.UserResponse;

import lombok.Getter;

@Getter
public class CommentResponseDTO {
	private Long id;
	private String content;
	private UserResponse writer;
	private List<CommentResponseDTO> reply = new ArrayList<>();

	public CommentResponseDTO(Long id, String content, UserResponse writer) {
		super();
		this.id = id;
		this.content = content;
		this.writer = writer;
	}

	public static CommentResponseDTO convertCommentToDto(Comment comment) {
		return comment.getIsDeleted() ? new CommentResponseDTO(comment.getId(), "삭제된 댓글입니다.", null)
				: new CommentResponseDTO(comment.getId(), comment.getContent(), new UserResponse(comment.getWriter()));
	}

}
