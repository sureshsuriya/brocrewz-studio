package com.brocrewz.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Arrays;
import java.util.List;

@Service
public class FileValidationService {

    private static final List<String> ALLOWED_MIME_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm"
    );
    private static final long MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

    public void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("File size exceeds 50MB limit");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_MIME_TYPES.contains(contentType)) {
            throw new RuntimeException("Unsupported file type. Only JPG, PNG, WEBP, GIF, MP4, and WEBM are allowed.");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null && originalFilename.contains("..")) {
            throw new RuntimeException("Invalid file name. Path traversal attack detected.");
        }
    }
}
