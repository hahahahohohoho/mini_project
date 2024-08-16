package com.edu.board.recommend;

import com.edu.board.board.Board;
import com.edu.board.recommend.common.Recommend;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Builder;
import lombok.Getter;

@Entity
@Builder
@Getter
@Table(name = "recommend", uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"board_id", "user_id"})
})
public class BoardRecommend extends Recommend{
	@JoinColumn(name="board_id", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private Board board;

}