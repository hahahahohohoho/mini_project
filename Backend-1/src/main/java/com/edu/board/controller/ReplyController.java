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
@RequestMapping("/board/{board_id}/reply")
public class ReplyController {
	@Autowired
	private ReplyService replyService;
	
	@PostMapping
	public void postReply(@RequestBody ReplyDTO replydto) {
		replyService.postReply(replydto);
	}
	
	@DeleteMapping("/{replyId}")
	public void deleteReply(@PathVariable Long replyId) {
		replyService.deleteReply(replyId);
	}
	
	@PutMapping("/{id}")
	public void putReply(@PathVariable Long id, @RequestBody ReplyDTO DTO) {
		replyService.putReply(id, DTO);
	}
}