package com.example.security.controllers;


import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.example.security.services.MetaDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials = "true")
public class ImageUploadController {

    @Autowired
    MetaDataService metaDataService;

    @PostMapping("/profile/image/upload")
    public PutObjectResult upload(@RequestParam("file") MultipartFile file) throws IOException {
        PutObjectResult response = null;
        try {
           response = metaDataService.upload(file);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return response;

    }

    @GetMapping("/profile/image/fetch")
    public  S3Object feth(@RequestParam("fileId") int fileId) throws IOException {
        S3Object response = null;
        try {
            response = metaDataService.download(fileId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }
}
