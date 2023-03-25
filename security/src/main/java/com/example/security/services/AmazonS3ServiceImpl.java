package com.example.security.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.Base64;
import com.example.security.repository.FileMetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Optional;

@Service
public class AmazonS3ServiceImpl implements  AmazonS3Service {

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private FileMetaRepository fileMetaRepository;

    @Override
    public PutObjectResult upload(String path, String fileName, Optional<Map<String, String>> optionalMetaData,
                                  InputStream inputStream) {

        ObjectMetadata objectMetadata = new ObjectMetadata();
        optionalMetaData.ifPresent(map  -> {
            if(!map.isEmpty()) {
                map.forEach(objectMetadata:: addUserMetadata);
            }
        });


        return amazonS3.putObject(path, fileName, inputStream, objectMetadata);
    }


    public S3Object download(String path, String fileName) throws IOException {

       S3Object obj = amazonS3.getObject(path, fileName);
       byte a[] = obj.getObjectContent().readAllBytes();
       String image = Base64.encodeAsString(a);
       return obj;
    }


    public  String download(String path, String fileName,String name) throws IOException {
        S3Object obj = amazonS3.getObject(path, fileName);
        byte a[] = obj.getObjectContent().readAllBytes();
        String image = Base64.encodeAsString(a);
        return  image;
    }
}
