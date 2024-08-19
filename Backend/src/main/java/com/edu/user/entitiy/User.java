package com.edu.user.entitiy;



import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.BatchSize;

import com.edu.board.board.Board;
import com.edu.board.reply.Reply;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@ToString(exclude = "boardList")
public class User {
	

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  @Column(name = "user_id")
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;
    
    @Enumerated(EnumType.STRING)
    private ERole role;

    private boolean emailVerified = false;
    
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime signUpDate;
    
    //EAGER로 하면 너무 많이 검색함
    @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY)
    @BatchSize(size = 10)
    private List<Board> boardList = new ArrayList<>();
    
    @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY)
    @BatchSize(size = 10)
    private List<Reply> replyList = new ArrayList<>();
}
