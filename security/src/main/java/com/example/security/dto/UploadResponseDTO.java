package com.example.security.dto;

import com.amazonaws.services.s3.model.PutObjectResult;

public class UploadResponseDTO {

    PutObjectResult putObjectResult;
    String message = "";


    public PutObjectResult getPutObjectResult() {
        return putObjectResult;
    }

    public void setPutObjectResult(PutObjectResult putObjectResult) {
        this.putObjectResult = putObjectResult;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
