package com.edu.user.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.board.board.BoardDTO;
import com.edu.board.reply.ReplyDTO;
import com.edu.user.dto.AdminUserDTO;
import com.edu.user.entitiy.User;
import com.edu.user.repo.UserRepository;

@Service
public class AdminService {
    @Autowired
	private UserRepository userRepository;
	
	public List<AdminUserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(AdminUserDTO::new)
                .collect(Collectors.toList());
    }
	
	public List<BoardDTO> getAllBoard(Long userId){
		User user = userRepository.findById(userId).orElseThrow();
		return user.getBoardList().stream()
	              .map(BoardDTO::new)
	              .collect(Collectors.toList());
	}
	
	public List<ReplyDTO> getAllReply(Long userId){
		User user = userRepository.findById(userId).orElseThrow();
		return user.getReplyList().stream()
	              .map(ReplyDTO::new)
	              .collect(Collectors.toList());
	}

	public void delteUser(Long userId) {
		userRepository.deleteById(userId);
	}
}
