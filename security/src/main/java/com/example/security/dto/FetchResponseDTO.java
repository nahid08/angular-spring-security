package com.example.security.dto;

import com.amazonaws.services.s3.model.S3Object;

public class FetchResponseDTO {

    String response;
    S3Object s3;

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public S3Object getS3() {
        return s3;
    }

    public void setS3(S3Object s3) {
        this.s3 = s3;
    }
}
