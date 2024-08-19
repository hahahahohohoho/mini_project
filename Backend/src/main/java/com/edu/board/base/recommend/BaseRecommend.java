package com.edu.board.base.recommend;


import com.edu.user.entitiy.User;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
public class BaseRecommend {
	@Id @Column(name = "recommend_id") @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@JoinColumn(name="user_id", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
}
