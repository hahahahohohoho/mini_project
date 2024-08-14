package com.edu.board.reply.common;


import com.edu.user.entitiy.User;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter@Setter
public class Reply extends BaseReply{
	@ManyToOne
	private User writer;
}
