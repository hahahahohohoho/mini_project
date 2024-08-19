package com.edu.restaurant.reply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/res/reply")
public class ResReplyController {
	@Autowired
	private ResReplyService replyService;
	
	@PostMapping
	public String postReply(@PathVariable Long res_id, @RequestBody ResReplyDTO replydto) {
		replyService.postReply(res_id, replydto);
		return "댓글 작성";
	}
	
	@DeleteMapping("/{replyId}")
	public String deleteReply(@PathVariable Long replyId) {
		replyService.deleteReply(replyId);
		return "댓글 삭제";
	}
	
	@PutMapping("/{id}")
	public void putReply(@PathVariable Long id, @RequestBody ResReplyDTO DTO) {
		replyService.putReply(id, DTO);
	}
}
