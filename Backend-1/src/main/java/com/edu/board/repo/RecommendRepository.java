package com.edu.board.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.edu.board.Entity.Recommend;

import jakarta.transaction.Transactional;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {
    @Modifying
    @Query(value = "DELETE FROM recommend WHERE board_id = :board_id AND user_id = :user_id", nativeQuery = true)
    Integer cancleRecommend(@Param("board_id") Long boardId, @Param("user_id") Long userId);
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Recommend (board_id, user_id) VALUES (:boardId, :userId)", nativeQuery = true)
    Integer recommend(@Param("boardId") Long boardId, @Param("userId") Long userId);
}