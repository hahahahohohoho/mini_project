//package com.edu.board.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.edu.board.entity.Board;
//import com.edu.board.entity.Comment;
//import com.edu.board.persistence.CommentRepo;
//
//@Service
//public class CommentService {
//	@Autowired
//	private CommentRepo cr;
//	
//	public List<Comment> getCommentsByPostId(Board board){
//		return cr.findByBoard(board);
//	}
//	
//	public Comment createComment(Comment comment) {
//		return cr.save(comment);
//	}
//	
//	public void deleteComment(Long id) {
//		cr.deleteById(id);
//	}
//}
