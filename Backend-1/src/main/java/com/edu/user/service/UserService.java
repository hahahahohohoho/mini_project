package com.edu.user.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edu.common.util.JwtUtils;
import com.edu.user.dto.JwtResponse;
import com.edu.user.dto.LoginRequest;
import com.edu.user.dto.SignUpRequest;
import com.edu.user.dto.UserResponse;
import com.edu.user.entitiy.ERole;
import com.edu.user.entitiy.User;
import com.edu.user.entitiy.UserDetailsImpl;
import com.edu.user.repo.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	//jwt위해 추가
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public JwtResponse authenticateUser(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();        

        return new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail());
    }
    //jwt위해 추가
    
    
	public UserResponse registerUser(SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername()) || userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new IllegalArgumentException("Username or email already exists.");
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setEmail(signUpRequest.getEmail());
        user.setRole(ERole.ROLE_USER);
        userRepository.save(user);

        return new UserResponse(user.getId(), user.getUsername(), user.getEmail());
    }

    public UserResponse loginUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password.");
        }

        return new UserResponse(user.getId(), user.getUsername(), user.getEmail());
    }
    
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    
}