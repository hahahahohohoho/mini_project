package com.edu.restaurant.recommend;

import com.edu.board.base.recommend.BaseRecommend;
import com.edu.restaurant.Restaurant;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "restaurant_recommend", uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"res_id", "user_id"})
})
public class ResRecommend extends BaseRecommend {

	@JoinColumn(name="res_id", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private Restaurant restaurant;
	
}
