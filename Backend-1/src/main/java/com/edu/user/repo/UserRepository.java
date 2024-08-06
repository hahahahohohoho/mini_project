package com.edu.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.user.entitiy.User;



public interface UserRepository extends JpaRepository<User, Long>{
	User findByEmail(String email);
	User findByUsername(String username);
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
}
