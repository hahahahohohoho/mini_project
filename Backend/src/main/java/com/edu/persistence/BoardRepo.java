package com.edu.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.domain.Board;

public interface BoardRepo extends JpaRepository<Board, Long>{

}
