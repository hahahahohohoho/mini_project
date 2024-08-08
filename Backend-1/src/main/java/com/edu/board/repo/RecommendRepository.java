package com.edu.board.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.board.Entity.Recommend;

public interface RecommendRepository extends JpaRepository<Recommend, Long>{

}
