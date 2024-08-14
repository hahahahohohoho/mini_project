package com.edu.sight;

import com.edu.board.recommend.common.Recommend;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class SightRecommend extends Recommend{
	@ManyToOne
	private Sight sight;
}
