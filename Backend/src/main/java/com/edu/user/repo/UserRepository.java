package com.edu.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsername(String nickname);
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
}
