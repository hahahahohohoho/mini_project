package com.edu.common.entitiy;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseEntity {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "rt_id")
	private Long id;
	private String name;
}
