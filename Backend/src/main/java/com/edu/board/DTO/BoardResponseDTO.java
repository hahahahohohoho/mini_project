//package com.edu.board.DTO;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import com.edu.user.dto.UserDTO;
//import com.fasterxml.jackson.annotation.JsonInclude;
//
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Getter @Setter 
//@JsonInclude(JsonInclude.Include.NON_NULL)
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class BoardResponseDTO {
//	private Long id;
//    private String title;
//    private String content;
//    private Integer likeCount;
//    private Integer viewCount;
//    private Integer commentCount;
//    private Boolean isSecret;
//    private UserDTO writer;
//    private LocalDateTime createdAt;
//    private LocalDateTime updatedAt;
//    private List<CommentResponseDTO> commentResponseDTOList;
//
//    @Builder
//    public BoardResponseDTO(Long id, String title, String hashTag, String content, Integer likeCount, Integer viewCount,
//                            Integer commentCount, Boolean isSecret, UserDTO writer,
//                            List<CommentResponseDTO> commentResponseDTOList, LocalDateTime createdAt, LocalDateTime updatedAt) {
//        this.id = id;
//        this.title = title;
//        this.content = content;
//        this.likeCount = likeCount;
//        this.viewCount = viewCount;
//        this.commentCount = commentCount;
//        this.isSecret = isSecret;
//        this.writer = writer;
//        this.commentResponseDTOList = commentResponseDTOList;
//        this.createdAt = createdAt;
//        this.updatedAt = updatedAt;
//    }
//
//    @Builder
//    public BoardResponseDTO(Long id, String title, String hashTag, String content, Integer likeCount,
//                            Integer viewCount, Integer commentCount, Boolean isSecret, UserDTO writer) {
//        this.id = id;
//        this.title = title;
//        this.content = content;
//        this.likeCount = likeCount;
//        this.viewCount = viewCount;
//        this.commentCount = commentCount;
//        this.isSecret = isSecret;
//        this.writer = writer;
//    }
//}
