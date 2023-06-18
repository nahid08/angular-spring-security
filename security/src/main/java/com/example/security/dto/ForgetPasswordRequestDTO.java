package com.example.security.dto;

public class ForgetPasswordRequestDTO {

    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ForgetPasswordRequestDTO() {};

    public ForgetPasswordRequestDTO(String email) {
        this.email = email;
    }
}
