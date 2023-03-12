package com.example.security.repository;

import com.example.security.model.File;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface FileMetaRepository extends CrudRepository<File, Integer> {

    Optional<File> findByfileName(String fileName);

}
