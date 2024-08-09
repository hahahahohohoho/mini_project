package com.edu.common.util;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.edu.user.entitiy.ERole;
import com.edu.user.entitiy.User;
import com.edu.user.repo.UserRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		OAuth2User user = (OAuth2User) authentication.getPrincipal();
		String username = CustomMyUtil.getUsernameFromOAuth2User(user);
		if(username==null) {
			throw new ServletException("Cannot geneerate username from oauth2");
		}
		User user1 = new User();
			user1.setUsername(username);
			user1.setPassword(encoder.encode("1a2s3d4f"));
			user1.setRole(ERole.ROLE_USER);
			user1.setSignUpDate(LocalDateTime.now());
		userRepo.save(user1);
	}
}
