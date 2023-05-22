package com.example.security.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.example.security.model.*;
import java.util.List;

public interface Itemrepository extends MongoRepository<Mongo, String> {

    @Query("{name: '?0'")
    Mongo findItemByName(String name);

    @Query(value = "{category: '?0'}", fields = "{'name': 1, 'quantity': 1}")
    List<Mongo>findAll(String category);

    public long count();



}
