package com.edu.board.reply.common;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public abstract class GenericReplyService<T> {

    @Autowired
    private JpaRepository<T, Long> repository;

    public List<T> findAllReplies() {
        return repository.findAll();
    }

    public T saveReply(T reply) {
        return repository.save(reply);
    }

    public void deleteReply(Long id) {
        repository.deleteById(id);
    }

    public T findReplyById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // 추가적인 공통 비즈니스 로직을 정의할 수 있습니다.
}