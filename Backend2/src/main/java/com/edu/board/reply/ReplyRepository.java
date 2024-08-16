package com.edu.board.reply;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.edu.board.board.Board;
import com.edu.board.reply.common.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Long>{
	@Query("SELECT r FROM Reply r WHERE r.id = :id")
    Reply findByIdOrThrow(@Param("id") Long id);
}