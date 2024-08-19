package com.edu.sight;

import java.util.List;
import java.util.stream.Collectors;

import com.edu.restaurant.recommend.ResRecommendDTO;
import com.edu.sight.recommend.SigRecommendDTO;
import com.edu.sight.recommend.SightRecommend;
import com.edu.sight.reply.SigReplyDTO;

import lombok.Getter;

@Getter
public class SightDTO {
	private String title;
	private String address;
	private String img1;
	private String img2;
	private String homepage;
	private String content;
	private String point;
	private List<SigReplyDTO> replys;
	private List<SigRecommendDTO> recommends;
	
	public SightDTO(String title, String address, String img1, String img2, String homepage, String content,
			String point) {
		this.title = title;
		this.address = address;
		this.img1 = img1;
		this.img2 = img2;
		this.homepage = homepage;
		this.content = content;
		this.point = point;
	}
	
	public SightDTO(Sight sight) {
		this.title = sight.getTitle();
		this.address = sight.getAddress();
		this.img1 = sight.getImg1();
		this.img2 = sight.getImg2();
		this.homepage = sight.getHomepage();
		this.content = sight.getContent();
		this.point = sight.getPoint();
		List<SigReplyDTO> dTOs = sight.getReplys().stream()
        		.map(SigReplyDTO::new)
        		.collect(Collectors.toList());
        this.replys = dTOs;
        List<SigRecommendDTO> recommenddTOs = sight.getRecommends().stream()
        		.map(SigRecommendDTO::new)
        		.collect(Collectors.toList());
        this.recommends = recommenddTOs;
	}
}
