package com.edu.sight.recommend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

public interface SigRecommendRepository extends JpaRepository<SightRecommend, Long> {
    @Modifying
    @Query(value = "DELETE FROM sight_recommend WHERE sig_id = :sigId AND user_id = :userId", nativeQuery = true)
    Integer cancleRecommend(@Param("sigId") Long sigId, @Param("userId") Long userId);
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO sight_recommend (sig_id, user_id) VALUES (:sigId, :userId)", nativeQuery = true)
    Integer recommend(@Param("sigId") Long sigdId, @Param("userId") Long userId);
}
