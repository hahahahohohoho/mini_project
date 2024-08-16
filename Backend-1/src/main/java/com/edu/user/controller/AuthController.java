package com.edu.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edu.common.service.EmailVerificationService;
import com.edu.user.dto.JwtResponse;
import com.edu.user.dto.LoginRequest;
import com.edu.user.dto.MyInfoDTO;
import com.edu.user.dto.SignUpRequest;
import com.edu.user.dto.UserResponse;
import com.edu.user.entitiy.User;
//import com.edu.user.service.LogoutService;
import com.edu.user.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private UserService userService;
	@Autowired
	private EmailVerificationService emailVerificationService;
//    @Autowired
//    private LogoutService logoutService;

	@PostMapping("/signup")
	public ResponseEntity<UserResponse> registerUser(@RequestBody SignUpRequest signUpRequest) {
		UserResponse response = userService.registerUser(signUpRequest);
        User user = userService.findByUsername(signUpRequest.getUsername());
        String token = emailVerificationService.generateVerificationToken(user);
        emailVerificationService.sendVerificationEmail(user, token);
		return ResponseEntity.ok(response);
	}


	@GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        boolean verified = emailVerificationService.verifyEmail(token);
        if (verified) {
            return ResponseEntity.ok("Email verified successfully.");
        } else {
            return ResponseEntity.status(400).body("Invalid or expired token.");
        }
    }
	@GetMapping("/myinfo")
	public MyInfoDTO myInfo(@RequestParam String username) {
		return userService.myInfo(username);
	}
	
	
	@PutMapping("/myinfo/{id}")
	public void updateForm(@PathVariable Long id, @RequestBody MyInfoDTO dTO) {
		userService.updateForm(id, dTO);
	}
	
	
	// jwt위해 추가
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(jwtResponse);
    }
    
    @GetMapping("/protected")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> getProtectedMessage() {
        return ResponseEntity.ok("This is a protected message only for authenticated users with USER role.");
    }
    
 
}