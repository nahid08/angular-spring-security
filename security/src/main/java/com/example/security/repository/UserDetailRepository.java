package com.example.security.repository;

import com.example.security.model.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface UserDetailRepository extends  JpaRepository<UserDetail, Long> {

    @Query(value = "Select u.user_detail_id, u.last_logged_in, u.last_logged_out, u.id_user, users.username, users.email from User_Detail u left join users on users.id = u.id_user", nativeQuery = true)
    List findAll();

}
