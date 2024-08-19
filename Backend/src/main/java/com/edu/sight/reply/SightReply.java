package com.edu.sight.reply;

import com.edu.board.base.reply.BaseReply;
import com.edu.sight.Sight;

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
public class SightReply extends BaseReply{
	@ManyToOne // many = Reply one = Board
	@JoinColumn(name="sight_id")
	private Sight sight;
}
