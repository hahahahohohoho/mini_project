package com.edu.user.service;



import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edu.common.util.JwtUtils;
import com.edu.user.dto.JwtResponse;
import com.edu.user.dto.MyInfoDTO;
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
        long expirationTime = jwtUtils.getExpirationFromToken(jwt);

        return new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), expirationTime);
    }
    
    
	public UserResponse registerUser(SignUpRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new IllegalArgumentException("Username already exists.");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setEmail(signUpRequest.getEmail());
        user.setRole(ERole.ROLE_USER);
        user.setSignUpDate(LocalDateTime.now());
        userRepository.save(user);

        return new UserResponse(user.getId(), user.getUsername(), user.getEmail());
    }
	
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }


	public void createAdmin() {
		User user = new User();
			user.setId(77L);
			user.setUsername("관리자");
			user.setPassword(passwordEncoder.encode("asdf"));
			user.setEmail("admin1@111.com");
			user.setRole(ERole.ROLE_ADMIN);
			user.setEmailVerified(true);
        userRepository.save(user);

	}


	public void updateForm(Long id, MyInfoDTO dTO) {
		User user = userRepository.findById(id).orElseThrow();
			user.setEmail(dTO.getEmail());
			user.setUsername(dTO.getUsername());
		userRepository.save(user);
	}	

	public MyInfoDTO myInfo(String username) {
		User user = userRepository.findByUsernameWithAssociations(username);
		MyInfoDTO dTO = new MyInfoDTO(user);
		return dTO;
	}


    
    
}