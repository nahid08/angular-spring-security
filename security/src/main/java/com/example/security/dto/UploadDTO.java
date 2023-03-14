package com.example.security.dto;

import org.springframework.web.multipart.MultipartFile;

public class UploadDTO {

    int id;
    MultipartFile file;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
