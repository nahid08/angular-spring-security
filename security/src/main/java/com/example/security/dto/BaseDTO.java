package com.example.security.dto;

public class BaseDTO {

    private String message;

    public  BaseDTO() {};

    public  BaseDTO(String message) {
        this.message = message;
    };

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
