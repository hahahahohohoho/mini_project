package com.edu.board.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.edu.board.Entity.Board;


public interface BoardRepository extends JpaRepository<Board, Long>{
	@Query("SELECT b FROM Board b WHERE b.id = :id")
    Board findByIdOrThrow(@Param("id") Long id);
	
	@Modifying // 조회수 증가
	@Query("update Board b set b.viewcount = b.viewcount +1 where b.id = :id")
	void updateCount(Long id);
	
	List<Board> findByTitleContaining(String title);
	
	// 검색 키워드로 제목 검색
    Page<Board> findByTitleContaining(String title, Pageable pageable);

    // 검색 키워드로 사용자 닉네임 검색
    Page<Board> findByWriterContaining(String nickname, Pageable pageable);

    // 추천수로 정렬
    Page<Board> findAllByOrderByRecommendCountDesc(Pageable pageable);


    // 조회수로 정렬
    Page<Board> findAllByOrderByViewcountDesc(Pageable pageable);

    // 생성일로 정렬
    Page<Board> findAllByOrderByCreateDateDesc(Pageable pageable);
    
    //전체 찾기
    @Query("SELECT DISTINCT b FROM Board b " +
            "JOIN FETCH b.writer " +
            "LEFT JOIN FETCH b.replys r " +
            "LEFT JOIN FETCH r.writer")
     List<Board> findAllWithReplies();
}