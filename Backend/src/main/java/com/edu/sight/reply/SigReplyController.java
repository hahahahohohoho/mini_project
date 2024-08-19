package com.edu.sight.reply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/sig/reply")
public class SigReplyController {
	@Autowired
	private SigReplyService replyService;
	
	@PostMapping("/{sig_id}")
	public String postReply(@PathVariable Long sig_id, @RequestBody SigReplyDTO replydto) {
		replyService.postReply(sig_id, replydto);
		return "댓글 작성";
	}
	
	@DeleteMapping("/{replyId}")
	public String deleteReply(@PathVariable Long replyId) {
		replyService.deleteReply(replyId);
		return "댓글 삭제";
	}
	
	@PutMapping("/{id}")
	public String  putReply(@PathVariable Long id,@RequestBody SigReplyDTO replydto) {
		replyService.editReply(id, replydto);
		return "댓글 수정";
	}
}
