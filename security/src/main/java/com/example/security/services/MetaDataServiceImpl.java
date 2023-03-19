package com.example.security.services;

import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.example.security.dto.UploadDTO;
import com.example.security.model.File;
import com.example.security.repository.FileMetaRepository;
import com.example.security.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class MetaDataServiceImpl implements MetaDataService{

    private static final Logger logger = LoggerFactory.getLogger(MetaDataServiceImpl.class);


    @Autowired
    AmazonS3Service amazonS3Service;

    @Autowired
    private FileMetaRepository fileMetaRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${aws.s3.bucket.name}")
    private String bucketName ;





    @Override
    public PutObjectResult upload(UploadDTO req) throws IOException {
        MultipartFile file = req.getFile();
        Long id = Long.valueOf(req.getId());

        if(file.isEmpty()) {
            throw new IllegalStateException("Cannot upload Empty File");
        }

        Map<String,String> metadata = new HashMap<>();

        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));

        String path = String.format("%s/%s", bucketName, "Security");
        String fileName = String.format("%s", file.getOriginalFilename());

        PutObjectResult putObjectResult = amazonS3Service.upload(path, fileName, Optional.of(metadata), file.getInputStream());
        logger.info("File is uploaded to Amazon S3");
        logger.info(putObjectResult.getContentMd5() + " " + putObjectResult.getMetadata() + " " + putObjectResult.getVersionId());

        Optional<File> savedFile = fileMetaRepository.findByUserId(id);

        if(savedFile.isPresent()) {
            File updatedFile = savedFile.get();
            updatedFile.setFileName(fileName);
            updatedFile.setFilePath(path);
            updatedFile.setVersion(putObjectResult.getMetadata().getVersionId());
            fileMetaRepository.save(updatedFile);
        }


        return putObjectResult;
    }


    @Override
    public S3Object download(Long id) {
          File file = fileMetaRepository.findByUserId(id).get();
//        File file = fileMetaRepository.findById(a.get).orElseThrow(() -> new EntityNotFoundException());
        return amazonS3Service.download(file.getFilePath(), file.getFileName());
    }

    @Override
    public List<File> list() {
        List<File> metas = new ArrayList<>();
        fileMetaRepository.findAll().forEach(metas::add);
        return metas;
    }
}
