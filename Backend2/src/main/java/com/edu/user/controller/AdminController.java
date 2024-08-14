package com.edu.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.board.board.Board;
import com.edu.board.reply.common.Reply;
import com.edu.user.dto.AdminUserDTO;
import com.edu.user.service.AdminService;


@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	
	@GetMapping("/user")
	public List<AdminUserDTO> getAdminMessage() {
		return adminService.getAllUsers();
	}
	
	@GetMapping("/user/board/{userId}")
	public List<Board> getAllBoard(@PathVariable Long userId) {
		return adminService.getAllBoard(userId);
	}
	
	@GetMapping("/user/reply/{userId}")
	public List<Reply>getAllReply(@PathVariable Long userId) {
		return adminService.getAllReply(userId);
	}
	@DeleteMapping("/user/{userId}")
	public String delteUser(@PathVariable Long userId) {
		adminService.delteUser(userId);
		return "삭제완료";
	}
}
