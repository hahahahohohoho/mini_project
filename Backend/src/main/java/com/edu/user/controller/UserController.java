package com.edu.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.user.dto.JoinDTO;
import com.edu.user.dto.LoginDTO;
import com.edu.user.dto.UserDTO;
import com.edu.user.service.UserService;


@RestController
@RequestMapping(value = "/member")
public class UserController {
//	@Autowired
//	private AuthenticationManager authenticationManager;
//	@Autowired
//	private EmailVerificationService emailVerificationService;
//	@Autowired
//	private JwtUtils jwtUtils;
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/signup")
	public ResponseEntity<UserDTO> registerUser(@RequestBody JoinDTO joinDTO) {
		UserDTO dto = userService.registerUser(joinDTO);
		return ResponseEntity.ok(dto);
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserDTO> loginUser(@RequestBody LoginDTO loginDTO) {
		UserDTO dto = userService.loginUser(loginDTO);
		return ResponseEntity.ok(dto);
	}
	
}
