package com.edu.sight.recommend;

import com.edu.board.base.recommend.BaseRecommend;
import com.edu.sight.Sight;

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
@Table(name = "sight_recommend", uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"res_id", "user_id"})
})
public class SightRecommend extends BaseRecommend {

	@JoinColumn(name="sig_id", nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private Sight sight;
	
}
