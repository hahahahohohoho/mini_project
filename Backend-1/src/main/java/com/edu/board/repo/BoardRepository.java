package com.edu.board.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.edu.board.Entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long>{
	@Query("SELECT b FROM Board b WHERE b.id = :id")
    Board findByIdOrThrow(@Param("id") Long id);
}
