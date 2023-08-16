package com.example.security.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "user_detail")
public class UserDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_detail_id")
    private Long userDetailId;

    @Column(name = "last_logged_in")
//    @JsonSerialize(using = CustomDateSerializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    Date lastLoggedIn;

    @Column(name = "last_logged_out")
//    @JsonSerialize(using = CustomDateSerializer.class)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    Date lastLoggedOut;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", nullable = true)
    private User user;

    public UserDetail() {
    }

    public UserDetail(Date lastLoggedIn, User user) {
        this.lastLoggedIn = lastLoggedIn;
        this.user = user;
    }

    public Long getUserDetailId() {
        return userDetailId;
    }

    public void setUserDetailId(Long userDetailId) {
        this.userDetailId = userDetailId;
    }

    public Date getLastLoggedIn() {
        return lastLoggedIn;
    }

    public void setLastLoggedIn(Date lastLoggedIn) {
        this.lastLoggedIn = lastLoggedIn;
    }

    public Date getLastLoggedOut() {
        return lastLoggedOut;
    }

    public void setLastLoggedOut(Date lastLoggedOut) {
        this.lastLoggedOut = lastLoggedOut;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
