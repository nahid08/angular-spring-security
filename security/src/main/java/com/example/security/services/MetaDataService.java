package com.example.security.services;

import com.amazonaws.services.s3.model.S3Object;
import com.example.security.model.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MetaDataService {

    public void upload(MultipartFile file) throws IOException;
    public S3Object download(int id);
    public List<File> list();
}
