package com.edu.common.util;

import org.springframework.security.oauth2.core.user.OAuth2User;

public class CustomMyUtil {
	public static String getUsernameFromOAuth2User(OAuth2User user) {
		String userString = user.toString();
		String regName = null;
		
		if(userString.contains("google")) regName = "Google";
		else if(userString.contains("kakao")) regName = "KAKAO";
		else if(userString.contains("naver")) regName = "NAVER";
		else return null;
		String name = user.getName();
		if(name == null) return null;
		
		return regName + "_" + name;
	}

}
