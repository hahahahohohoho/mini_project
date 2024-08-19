package com.edu.board.reply;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.board.board.BoardRepository;
import com.edu.user.repo.UserRepository;

@Service
public class ReplyService {
	@Autowired 
	private ReplyRepository replyRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BoardRepository boardRepository;
	
	public ReplyDTO postReply(Long board_id, ReplyDTO replydto) {
		Reply reply = new Reply();
			reply.setContent(replydto.getContent());
			reply.setBoard(boardRepository.findByIdOrThrow(board_id));
			reply.setWriter(userRepository.findByUsername(replydto.getUsername()));
			reply.setCreateDate(LocalDateTime.now());
		replyRepository.save(reply);
		return new ReplyDTO(reply);
	}

	public void deleteReply(Long replyId) {
		replyRepository.deleteById(replyId);
	}

	public void putReply(Long id, ReplyDTO dTO) {
		Reply reply = replyRepository.findById(id).orElseThrow();
			reply.setContent(dTO.getContent());
			reply.setCreateDate(LocalDateTime.now());
		replyRepository.save(reply);
	}
}
