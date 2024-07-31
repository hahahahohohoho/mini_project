package com.edu.persistence;


import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.domain.Board;
import com.edu.domain.BoardLike;

public interface BoardLikeRepo extends JpaRepository<BoardLike, Long>{
    Long countByBoard(Board board);
}
