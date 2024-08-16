package com.edu.board.reply;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.board.board.BoardReply;
import com.edu.board.board.BoardRepository;
import com.edu.board.reply.common.GenericReplyService;
import com.edu.board.reply.common.Reply;
import com.edu.user.repo.UserRepository;

@Service
public class ReplyService extends GenericReplyService<BoardReply> {
	@Autowired 
	private ReplyRepository replyRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BoardRepository boardRepository;
	
	public void postReply(Long board_id, ReplyDTO replydto) {
		BoardReply reply = new BoardReply();
			reply.setContent(replydto.getContent());
			reply.setBoard(boardRepository.findByIdOrThrow(board_id));
			reply.setWriter(userRepository.findByUsername(replydto.getUsername()));
			reply.setCreatedDate(LocalDateTime.now());
		replyRepository.save(reply);
	}

	public Reply putReply(Long id, ReplyDTO dTO) {
		Reply reply = replyRepository.findByIdOrThrow(id);
			reply.setContent(dTO.getContent());
			reply.setCreatedDate(LocalDateTime.now());
		return replyRepository.save(reply);
	}
}