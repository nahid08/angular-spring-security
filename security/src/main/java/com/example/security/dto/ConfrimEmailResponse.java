package com.example.security.dto;

import com.example.security.payload.request.SignupRequest;

public class ConfrimEmailResponse  extends  BaseDTO {
    SignupRequest userData;

    public SignupRequest getUserData() {
        return userData;
    }

    public void setUserData(SignupRequest userData) {
        this.userData = userData;
    }
}
