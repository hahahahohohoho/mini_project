package com.edu.board.service;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.board.DTO.ReplyDTO;
import com.edu.board.Entity.Reply;
import com.edu.board.repo.BoardRepository;
import com.edu.board.repo.ReplyRepository;
import com.edu.user.repo.UserRepository;

@Service
public class ReplyService {
	@Autowired 
	private ReplyRepository replyRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BoardRepository boardRepository;
	
	public void postReply(ReplyDTO replydto) {
		Reply reply = new Reply();
		reply.setContent(replydto.getContent());
		reply.setBoard(boardRepository.findByIdOrThrow(replydto.getBoard_id()));
		reply.setWriter(userRepository.findByUsername(replydto.getUsername()));
		reply.setCreateDate(LocalDateTime.now());
		replyRepository.save(reply);
	}
}
