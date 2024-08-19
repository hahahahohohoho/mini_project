package com.edu.restaurant.recommend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

public interface ResRecommendRepository extends JpaRepository<ResRecommend, Long> {
    @Modifying
    @Query(value = "DELETE FROM restaurant_recommend WHERE res_id = :resdId AND user_id = :user_id", nativeQuery = true)
    Integer cancleRecommend(@Param("resdId") Long boardId, @Param("user_id") Long userId);
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO restaurant_recommend (res_id, user_id) VALUES (:resdId, :userId)", nativeQuery = true)
    Integer recommend(@Param("resdId") Long boardId, @Param("userId") Long userId);
}
