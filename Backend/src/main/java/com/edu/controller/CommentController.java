package com.edu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.domain.Board;
import com.edu.domain.Comment;
import com.edu.service.BoardService;
import com.edu.service.CommentService;



@RestController
@RequestMapping("/comments")
public class CommentController {
	@Autowired
	private CommentService cs;
	@Autowired
	private BoardService boards;
	
	@GetMapping("/post/{postid}")
	public List<Comment> getCommentByPostId(@PathVariable Long postId) {
		Board a = boards.getBoard(postId);
		return cs.getCommentsByPostId(a);
	}
	
	@PostMapping
	public Comment createComment(@RequestBody Comment comment) {
		return cs.createComment(comment);
	}
	
	@DeleteMapping("/{id}")
	public void deleteComment(@PathVariable Long id) {
		cs.deleteComment(id);
	}
}
