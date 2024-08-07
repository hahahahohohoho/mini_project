package com.edu.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edu.common.service.EmailVerificationService;
import com.edu.user.dto.JwtResponse;
import com.edu.user.dto.LoginRequest;
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

	@PostMapping("/login")
	public ResponseEntity<UserResponse> loginUser(@RequestBody LoginRequest loginRequest) {
		UserResponse response = userService.loginUser(loginRequest);
		return ResponseEntity.ok(response);
	}
	
//	@PostMapping("/logout")
//    public ResponseEntity<String> logout(@RequestHeader("Authorization") String tokenHeader) {
//        String token = tokenHeader.substring(7);
//        logoutService.logout(token);
//        SecurityContextHolder.clearContext();
//        return ResponseEntity.ok("Successfully logged out.");
//    }
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        // 클라이언트 측에서 JWT 토큰을 삭제하도록 안내
        return ResponseEntity.ok("Successfully logged out");
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
	// jwt위해 추가
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(jwtResponse);
    }
}
