package com.edu.user.dto;

import com.edu.user.entity.User;
import com.edu.user.entity.UserRole;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserDTO {
    private Long id;
    private String email;
    private String nickName;
    private UserRole userRole;

    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.nickName = user.getUsername();
        this.userRole = user.getUserRole();
    }

    @Builder
    public UserDTO(Long id, String email, String nickName) {
        this.id = id;
        this.email = email;
        this.nickName = nickName;
    }
}
