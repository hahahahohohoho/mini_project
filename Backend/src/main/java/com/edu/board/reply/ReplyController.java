package com.edu.board.reply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/board")
public class ReplyController {
	@Autowired
	private ReplyService replyService;
	
	@PostMapping("/{board_id}/reply")
	public ReplyDTO postReply(@PathVariable Long board_id, @RequestBody ReplyDTO replydto) {
		Reply reply = replyService.postReply(board_id, replydto);
		return new ReplyDTO(reply);
	}
	
	@DeleteMapping("/{board_id}/reply/{reply_id}")
	public String deleteReply(@PathVariable Long board_id,@PathVariable Long reply_id) {
		replyService.deleteReply(reply_id);
		return "댓글 삭제";
	}
	
	@PutMapping("/{board_id}/reply/{id}")
	public void editReply(@PathVariable Long board_id,@PathVariable Long id, @RequestBody ReplyDTO DTO) {
		replyService.putReply(id, DTO);
	}
}
