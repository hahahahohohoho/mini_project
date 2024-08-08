package com.edu.board.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.edu.board.DTO.ReplyDTO;
import com.edu.board.service.ReplyService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/reply")
public class ReplyController {
	@Autowired
	private ReplyService replyService;
	
	@PostMapping
	public void postReply(@RequestBody ReplyDTO replydto) {
		replyService.postReply(replydto);
	}
	
}
