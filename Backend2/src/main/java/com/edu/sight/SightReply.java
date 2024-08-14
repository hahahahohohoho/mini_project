package com.edu.sight;

import com.edu.board.reply.common.Reply;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter@Setter
public class SightReply extends Reply{
	@ManyToOne
	private Sight sight;
}
