package com.example.security.dto;

import com.example.security.model.UserDetail;
import java.util.*;

public class UserDetailListResponseDTO {
    List<UserDetail> userDetailList;

    public List<UserDetail> getUserDetailList() {
        return userDetailList;
    }

    public void setUserDetailList(List<UserDetail> userDetailList) {
        this.userDetailList = userDetailList;
    }
}
