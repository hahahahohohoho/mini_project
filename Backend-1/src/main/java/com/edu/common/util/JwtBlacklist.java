package com.edu.common.util;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class JwtBlacklist {
    private Set<String> blacklist = new HashSet<>();

    public void add(String token) {
        blacklist.add(token);
    }

    public boolean contains(String token) {
        return blacklist.contains(token);
    }
}
