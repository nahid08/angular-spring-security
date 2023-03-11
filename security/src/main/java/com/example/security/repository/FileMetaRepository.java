package com.example.security.repository;

import com.example.security.model.File;
import org.springframework.data.repository.CrudRepository;

public interface FileMetaRepository extends CrudRepository<File, Integer> {
}
