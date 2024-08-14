package com.edu.restaurant;

import com.edu.board.reply.common.Reply;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class RestaurantReply extends Reply {
	@ManyToOne
	private Restaurant restaurant;
}
