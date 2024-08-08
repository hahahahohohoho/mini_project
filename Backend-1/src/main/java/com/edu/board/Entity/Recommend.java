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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Recommend {
	@Id @Column(name = "recommend_id") @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JoinColumn(name="board_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Board board;
	
	@JoinColumn(name="user_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private User writer;
}
