package com.example.security.dto;

public class FileDownloadResponseDTO {

    private byte[] pdfContent;

    public byte[] getPdfContent() {
        return pdfContent;
    }

    public void setPdfContent(byte[] pdfContent) {
        this.pdfContent = pdfContent;
    }
}
