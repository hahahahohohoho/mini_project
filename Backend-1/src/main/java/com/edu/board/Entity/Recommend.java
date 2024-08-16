package com.edu.board.Entity;

import com.edu.user.entitiy.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
@Table(name = "recommend", uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"board_id", "user_id"})
})
public class Recommend {
	@Id @Column(name = "recommend_id") @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JoinColumn(name="board_id", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private Board board;
	
	@JoinColumn(name="user_id", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
}