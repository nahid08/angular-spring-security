package com.example.security.services;

import com.example.security.model.User;
import org.springframework.stereotype.Service;


@Service
public class UserInfo {

    private  User user;

    void setUser(User user) {
        this.user = user;
    }

    void clearUser() {
        this.user = null;
    }

    User getUser() {
        return user;
    }



}
