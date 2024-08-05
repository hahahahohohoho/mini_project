//package com.edu.board.entity;
//
//import java.time.LocalDateTime;
//
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.annotation.LastModifiedDate;
//
//import com.edu.user.entity.User;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.Setter;
//import lombok.ToString;
//
//@Entity
//@Getter @Setter @ToString @Builder
//public class Comment {
//	@Id@GeneratedValue
//	private Long id;
//	
//	@ManyToOne	@JoinColumn(name = "board_id")
//	private Board board;
//	
//	@Column(nullable = false, name = "comment_content")
//	private String content;
//	
//	@CreatedDate @Column(name = "create_date")
//	private LocalDateTime createDate;
//	
//	@LastModifiedDate @Column(name = "modified_date")
//	private LocalDateTime modifiedDate;
//	
//	@ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id")
//	private User writer;
//	
//	public void update(String content) {
//		this.content = content;
//	}
//}
