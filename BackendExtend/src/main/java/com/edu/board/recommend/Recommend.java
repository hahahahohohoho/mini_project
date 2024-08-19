package com.edu.board.recommend;


import com.edu.board.base.BaseActionEntity;
import com.edu.board.board.Board;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "reocommend_id"))
@Table(name = "recommend", uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"board_id", "user_id"})
})
public class Recommend extends BaseActionEntity{

	@JoinColumn(name="board_id", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private Board board;
	
}
