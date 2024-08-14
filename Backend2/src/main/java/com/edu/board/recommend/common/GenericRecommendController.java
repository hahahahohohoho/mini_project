package com.edu.board.recommend.common;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

public abstract class GenericRecommendController<T> {

    @Autowired
    private GenericRecommendService<T> service;

    @GetMapping
    public List<T> getAllRecommends() {
        return service.findAllRecommends();
    }

    @PostMapping
    public T createRecommend(@RequestBody T recommend) {
        return service.saveRecommend(recommend);
    }

    @DeleteMapping("/{id}")
    public void deleteRecommend(@PathVariable Long id) {
        service.deleteRecommend(id);
    }

    @GetMapping("/{id}")
    public T getRecommendById(@PathVariable Long id) {
        return service.findRecommendById(id);
    }
    
    @PutMapping("/{id}")
    public T updateRecommend(@PathVariable Long id, @RequestBody T recommend) {
        // 일반적으로 PUT 메서드는 전체 리소스를 업데이트합니다.
        // 필요시 서비스 계층에서 추가적인 업데이트 로직을 구현합니다.
        // 이 예시에서는 단순히 주어진 recommend를 저장하는 동작으로 간주합니다.
        return service.saveRecommend(recommend);
    }
    // 추가적인 공통 API를 정의할 수 있습니다.
}

