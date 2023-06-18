package com.example.security.model;


import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class ConfirmationToken {

    private static final int EXPIRATION = 60 * 24;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    @OneToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    private Date expiryDate;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ConfirmationToken() {
    }

    public ConfirmationToken(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
