package com.example.security.repository;

import com.example.security.model.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface UserDetailRepository extends  JpaRepository<UserDetail, Long> {

    @Query(value = "Select user_detail.last_logged_in from User_Detail", nativeQuery = true)
    List<UserDetail> findAll();

}
