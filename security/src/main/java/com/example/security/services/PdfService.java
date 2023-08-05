package com.example.security.services;


import com.example.security.dto.FileDownloadResponseDTO;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;

@Service
public class PdfService {


    public ByteArrayResource generatePdf() throws DocumentException, FileNotFoundException {
        FileDownloadResponseDTO res = new FileDownloadResponseDTO();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, byteArrayOutputStream);
        document.open();
        Font font = FontFactory.getFont(FontFactory.COURIER, 16 , BaseColor.BLACK);
        Chunk chunk = new Chunk("Hello World", font);

        document.add(chunk);
        document.close();
        byte[] pdfByte = byteArrayOutputStream.toByteArray();
        ByteArrayResource resource = new ByteArrayResource(pdfByte);
        return resource;
    }


}
