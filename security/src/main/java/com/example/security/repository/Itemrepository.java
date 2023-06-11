package com.example.security.repository;

import com.example.security.model.Grocery;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Itemrepository extends MongoRepository<Grocery,  String> {

//    @Query("{name:'?0}")
    Grocery findByName(String name);


}