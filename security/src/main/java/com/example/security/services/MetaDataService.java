package com.example.security.services;

import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.example.security.dto.UploadDTO;
import com.example.security.model.File;

import java.io.IOException;
import java.util.List;

public interface MetaDataService {

    public PutObjectResult upload(UploadDTO req) throws IOException;
    public S3Object download(Long id) throws  IOException;
    public List<File> list();
}
