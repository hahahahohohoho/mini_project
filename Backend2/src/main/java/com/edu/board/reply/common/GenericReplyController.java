package com.edu.board.reply.common;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

public abstract class GenericReplyController<T> {

    @Autowired
    private GenericReplyService<T> service;

    @GetMapping
    public List<T> getAllReplies() {
        return service.findAllReplies();
    }

    @PostMapping
    public T createReply(@RequestBody T reply) {
        return service.saveReply(reply);
    }

    @DeleteMapping("/{id}")
    public void deleteReply(@PathVariable Long id) {
        service.deleteReply(id);
    }

    @GetMapping("/{id}")
    public T getReplyById(@PathVariable Long id) {
        return service.findReplyById(id);
    }
    @PutMapping("/{id}")
    public T updateReply(@PathVariable Long id, @RequestBody T reply) {
        // 일반적으로 PUT 메서드는 전체 리소스를 업데이트합니다.
        // 필요시 서비스 계층에서 추가적인 업데이트 로직을 구현합니다.
        // 이 예시에서는 단순히 주어진 reply를 저장하는 동작으로 간주합니다.
        return service.saveReply(reply);
    }

    // 추가적인 공통 API를 정의할 수 있습니다.
}

