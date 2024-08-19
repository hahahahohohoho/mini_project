package com.edu.restaurant.reply;


import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.restaurant.RestaurantRepo;
import com.edu.user.repo.UserRepository;

@Service
public class ResReplyService {
	@Autowired 
	private ResReplyRepository replyRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RestaurantRepo restaurantRepo;
	
	public void postReply(Long res_id, ResReplyDTO replydto) {
		RestaurantReply reply = new RestaurantReply();
			reply.setContent(replydto.getContent());
			reply.setRestaurant(restaurantRepo.findById(res_id).orElseThrow());
			reply.setWriter(userRepository.findByUsername(replydto.getUsername()));
			reply.setCreateDate(LocalDateTime.now());
		replyRepository.save(reply);
	}

	public void deleteReply(Long replyId) {
		replyRepository.deleteById(replyId);
	}

	public void putReply(Long id, ResReplyDTO dTO) {
		RestaurantReply reply = replyRepository.findById(id).orElseThrow();
			reply.setContent(dTO.getContent());
			reply.setCreateDate(LocalDateTime.now());
		replyRepository.save(reply);
	}
}
