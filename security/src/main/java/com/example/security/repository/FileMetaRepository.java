package com.example.security.repository;

import com.example.security.model.File;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface FileMetaRepository extends CrudRepository<File, Long> {

    Optional<File> findByUserId(Long id);

    Optional<File> findById(Long id);

}
