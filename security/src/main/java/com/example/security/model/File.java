package com.example.security.model;

import jakarta.persistence.*;

@Entity
@Table(name = "FILE_META")
public class File {

    private static final long serialVersionUID = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="FILE_NAME")
    private String fileName;

    @Column(name="FILE_PATH")
    private String filePath;

    @Column(name="VERSION")
    private String version;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public  File() {};
    public File(String fileName, String filePath, String version) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.version = version;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public File(String fileName, String filePath, String version, User user) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.version = version;
        this.user = user;
    }
}
