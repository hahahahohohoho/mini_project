package com.edu.board.recommend.common;

import com.edu.user.entitiy.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class Recommend extends BaseRecommend{
	@JoinColumn(name="user_id", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private User user;
}
