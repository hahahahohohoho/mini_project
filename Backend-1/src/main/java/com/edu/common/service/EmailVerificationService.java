package com.edu.common.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.edu.common.entitiy.VerificationToken;
import com.edu.common.entitiy.VerificationTokenRepository;
import com.edu.user.entitiy.User;
import com.edu.user.repo.UserRepository;

@Service
public class EmailVerificationService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    public String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, user, LocalDateTime.now().plusMinutes(30));
        tokenRepository.save(verificationToken);
        return token;
    }

    public void sendVerificationEmail(User user, String token) {
        String recipientAddress = user.getEmail();
        String subject = "Email Verification";
        String confirmationUrl = "http://localhost:8080/api/auth/verify?token=" + token;
        String message = "To confirm your email address, please click the link below:\n" + confirmationUrl;
        System.out.println(LocalDateTime.now());
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message);
        mailSender.send(email);
    }

    public boolean verifyEmail(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);

        if (verificationToken == null || verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return false;
        }

        User user = verificationToken.getUser();
        user.setEmailVerified(true); // 이메일 검증 상태 업데이트
        userRepository.save(user); // 변경 사항 저장
        tokenRepository.delete(verificationToken); // 사용된 토큰 삭제

        return true;
    }
}