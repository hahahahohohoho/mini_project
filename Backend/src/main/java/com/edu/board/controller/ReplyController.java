package com.edu.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.edu.board.DTO.ReplyDTO;
import com.edu.board.service.ReplyService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/board/{board_id}/reply")
public class ReplyController {
	@Autowired
	private ReplyService replyService;
	
	@PostMapping
	public String postReply(@PathVariable Long board_id, @RequestBody ReplyDTO replydto) {
		replyService.postReply(board_id, replydto);
		return "댓글 작성";
	}
	
	@DeleteMapping("/{replyId}")
	public String deleteReply(@PathVariable Long replyId) {
		replyService.deleteReply(replyId);
		return "댓글 삭제";
	}
	
	@PutMapping("/{id}")
	public void putReply(@PathVariable Long id, @RequestBody ReplyDTO DTO) {
		replyService.putReply(id, DTO);
	}
}