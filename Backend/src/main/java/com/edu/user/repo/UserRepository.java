package com.edu.user.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.edu.user.entitiy.User;



public interface UserRepository extends JpaRepository<User, Long>{
	// 1. JPQL을 사용한 방법
	 @Query("SELECT u FROM User u " +
	           "LEFT JOIN FETCH u.boardList b " +
	           "WHERE u.username = :username")
    User findByUsernameWithAssociations(@Param("username") String username);
	
	User findByEmail(String email);
	User findByUsername(String username);
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
}
