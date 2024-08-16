package com.edu.cty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class City {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "cty_cd")
	private Long id;
	private String cty_nm;
}
