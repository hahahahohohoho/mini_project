package com.edu.board.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.edu.board.Entity.Board;
import com.edu.board.Entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Long>{
	@Query("SELECT r FROM Reply r WHERE r.id = :id")
    Reply findByIdOrThrow(@Param("id") Long id);
}
