package com.example.security.services;

import com.example.security.model.User;
import org.springframework.stereotype.Service;


@Service
public class UserInfo {

    private  User user = new User();

    public void setUser(User user) {
        this.user = user;
    }

    void clearUser() {
        this.user = new User();
    }

    public  User getUser() {
        return user;
    }



}
