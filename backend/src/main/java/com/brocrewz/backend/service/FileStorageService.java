package com.brocrewz.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FileStorageService {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Autowired
    private FileValidationService validationService;

    @Autowired
    private ImageOptimizationService optimizationService;

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(Paths.get(uploadDir, "logo"));
            Files.createDirectories(Paths.get(uploadDir, "team"));
            Files.createDirectories(Paths.get(uploadDir, "portfolio"));
            Files.createDirectories(Paths.get(uploadDir, "backgrounds"));
            Files.createDirectories(Paths.get(uploadDir, "icons"));
            Files.createDirectories(Paths.get(uploadDir, "videos"));
            Files.createDirectories(Paths.get(uploadDir, "qr"));
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directories!");
        }
    }

    public String saveFile(MultipartFile file, String folder) {
        try {
            validationService.validateFile(file);
            
            String extension = "";
            int i = file.getOriginalFilename().lastIndexOf('.');
            if (i > 0) {
                extension = file.getOriginalFilename().substring(i);
            }
            
            String filename = UUID.randomUUID().toString() + extension;
            Path targetLocation = Paths.get(uploadDir, folder).resolve(filename);
            
            File targetFile = targetLocation.toFile();
            optimizationService.optimizeAndSave(file, targetFile);
            
            return "/api/public/files/" + folder + "/" + filename;
        } catch (Exception ex) {
            throw new RuntimeException("Could not store file " + file.getOriginalFilename() + ". Please try again!", ex);
        }
    }

    public List<Map<String, Object>> listFiles(String folder) {
        Path folderPath = Paths.get(uploadDir, folder);
        if (!Files.exists(folderPath)) return Collections.emptyList();
        
        try {
            return Files.walk(folderPath, 1)
                .filter(path -> !path.equals(folderPath))
                .map(path -> {
                    try {
                        File file = path.toFile();
                        Map<String, Object> fileInfo = new HashMap<>();
                        fileInfo.put("name", file.getName());
                        fileInfo.put("url", "/api/public/files/" + folder + "/" + file.getName());
                        fileInfo.put("size", file.length());
                        fileInfo.put("lastModified", file.lastModified());
                        return fileInfo;
                    } catch (Exception e) {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .sorted((f1, f2) -> Long.compare((long)f2.get("lastModified"), (long)f1.get("lastModified"))) // Newest first
                .collect(Collectors.toList());
        } catch (IOException e) {
            return Collections.emptyList();
        }
    }

    public void deleteFile(String folder, String filename) {
        try {
            Path file = Paths.get(uploadDir, folder).resolve(filename);
            Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error deleting file: " + filename);
        }
    }
}
