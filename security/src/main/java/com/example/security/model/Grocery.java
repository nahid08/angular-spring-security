package com.example.security.model;


import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Grocery")
public class Grocery {

    @Id
    private String id;

    private String name;
    private int quantity;
    private String category;

    public Grocery(String name, int quantity, String category) {
        this.name = name;
        this.quantity = quantity;
        this.category = category;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
