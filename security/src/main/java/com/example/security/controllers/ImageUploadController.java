package com.example.security.controllers;


import com.example.security.services.MetaDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class ImageUploadController {

    @Autowired
    MetaDataService metaDataService;

    @PostMapping("/profile/image/upload")
    public String upload(@RequestParam("file") MultipartFile file) throws IOException {
        try {
            metaDataService.upload(file);

        } catch (Exception e) {
        }
        return "Upload is completed";
    }
}
