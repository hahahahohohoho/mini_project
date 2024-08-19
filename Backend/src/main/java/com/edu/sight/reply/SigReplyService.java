package com.edu.sight.reply;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.sight.SightRepo;
import com.edu.user.repo.UserRepository;

@Service
public class SigReplyService {
	@Autowired 
	private SigReplyRepository replyRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SightRepo sightRepo;
	
	public void postReply(Long sig_id, SigReplyDTO replydto) {
		SightReply reply = new SightReply();
			reply.setContent(replydto.getContent());
			reply.setSight(sightRepo.findById(sig_id).orElseThrow());
			reply.setWriter(userRepository.findByUsername(replydto.getUsername()));
			reply.setCreateDate(LocalDateTime.now());
		replyRepository.save(reply);
	}

	public void deleteReply(Long replyId) {
		replyRepository.deleteById(replyId);
	}

	public void editReply(Long id, SigReplyDTO dTO) {
		SightReply reply = replyRepository.findById(id).orElseThrow();
			reply.setContent(dTO.getContent());
			reply.setCreateDate(LocalDateTime.now());
		replyRepository.save(reply);
	}
}
