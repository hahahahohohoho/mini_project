package com.edu.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edu.user.dto.JoinDTO;
import com.edu.user.dto.LoginDTO;
import com.edu.user.dto.UserDTO;
import com.edu.user.entity.User;
import com.edu.user.repo.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	public UserDTO registerUser(JoinDTO joinDTO) {
		if (userRepo.existsByUsername(joinDTO.getNickName()) || userRepo.existsByEmail(joinDTO.getEmail())) {
	            throw new IllegalArgumentException("Username or email already exists.");
        }
		
		User user = new User();
		user.setUsername(joinDTO.getNickName());
		user.setPassword(joinDTO.getPassword());
		user.setEmail(joinDTO.getEmail());
		user.setUserRole(joinDTO.getUserRole());
		
		userRepo.save(user);
		
		
		return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
	}
	
	public UserDTO loginUser(LoginDTO loginDTO) {
		User user = userRepo.findByUsername(loginDTO.getEmail());
		if(user ==null || !passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())){
            throw new IllegalArgumentException("Invalid username or password.");
		}
		return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
	}
	
    public User findByNickName(String nickName) {
        return userRepo.findByUsername(nickName);
    }
}
