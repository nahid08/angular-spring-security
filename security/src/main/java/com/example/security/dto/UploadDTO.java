package com.example.security.dto;

import org.springframework.web.multipart.MultipartFile;

public class UploadDTO {

    Long id;
    MultipartFile file;

    public Long getId() {
        return id;
    }

    public UploadDTO(Long id, MultipartFile file) {
        this.id = id;
        this.file = file;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
