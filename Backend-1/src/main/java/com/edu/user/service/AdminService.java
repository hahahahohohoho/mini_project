package com.edu.user.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.board.Entity.Board;
import com.edu.board.Entity.Reply;
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
	
	public List<Board> getAllBoard(Long userId){
		User user = userRepository.findById(userId).orElseThrow();
		return user.getBoardList();
	}
	
	public List<Reply> getAllReply(Long userId){
		User user = userRepository.findById(userId).orElseThrow();
		return user.getReplyList();
	}

	public void delteUser(Long userId) {
		userRepository.deleteById(userId);
	}
}
