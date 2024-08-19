package com.edu.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequest {
	private String sortBy;
	private String searchKeyword;
	private String searchType;
}
