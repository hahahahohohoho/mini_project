package com.edu.restaurant.reply;

import com.edu.board.base.reply.BaseReply;
import com.edu.restaurant.Restaurant;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class RestaurantReply extends BaseReply{
	@ManyToOne // many = Reply one = Board
	@JoinColumn(name="res_id")
	private Restaurant restaurant;
}
