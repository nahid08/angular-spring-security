package com.example.security.dto;

public class ErrorResponseDTO {

    private  int statusCode;
    private  String message;

    public ErrorResponseDTO(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
