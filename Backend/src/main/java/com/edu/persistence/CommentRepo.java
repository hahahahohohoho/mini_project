package com.edu.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.domain.Board;
import com.edu.domain.Comment;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    List<Comment> findByBoard(Board board);
}