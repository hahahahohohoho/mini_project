package com.edu.board.Entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.BatchSize;

import com.edu.user.entitiy.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter @ToString(exclude = {"replys", "writer"})
@AllArgsConstructor @NoArgsConstructor
public class Board {
	@Id @Column(name = "board_id") @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 100)
	private String title;
	
	@Column(columnDefinition = "TEXT")
	private String content;
	
	@ManyToOne // many = "Board", one = "user"
	@JoinColumn(name="user_id")
	private User writer;
	
	@Column(columnDefinition = "default 0")
	private Integer viewcount;
	
	@Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private LocalDateTime createDate;
	// LAZY는 선택적 출력 EAGER는 반드시 출력
	@OneToMany(mappedBy = "board", fetch = FetchType.EAGER) //연관관계의 주인이 아니르는 의미, 외래키 아니니 열 생성 필요 X
	@JsonIgnoreProperties({"board"})
	@BatchSize(size = 10)
	private List<Reply> replys;
	
	@OneToMany(mappedBy = "board", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@BatchSize(size = 10)
	private List<Recommend> recommends;
	@Transient
	private boolean recommend_state;
	@Transient
	private Integer recommend_count;
	
    public Integer getRecommendCount() {
        return recommends != null ? recommends.size() : 0;
    }
	public void setWriter(User user) {
		this.writer = user;
		user.getBoardList().add(this);
	}
}
