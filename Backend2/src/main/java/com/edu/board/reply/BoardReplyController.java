package com.edu.board.reply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.board.reply.common.GenericReplyController;



@RestController
@RequestMapping("/api/board/{board_id}/reply")
public class BoardReplyController extends GenericReplyController<BoardReply>{
	@Autowired
	private ReplyService replyService;
	
	
	@PutMapping("/{id}")
	public void updateReply(@PathVariable Long id, @RequestBody ReplyDTO DTO) {
		replyService.putReply(id, DTO);
	}
}
