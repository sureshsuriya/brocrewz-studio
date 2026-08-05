package com.brocrewz.backend.controller;

import com.brocrewz.backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/admin/media")
public class MediaController {

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/{category}")
    public ResponseEntity<List<Map<String, Object>>> getFilesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(fileStorageService.listFiles(category));
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("category") String category) {
        
        String fileUrl = fileStorageService.saveFile(file, category);
        Map<String, String> response = new HashMap<>();
        response.put("url", fileUrl);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{category}/{filename}")
    public ResponseEntity<?> deleteFile(
            @PathVariable String category,
            @PathVariable String filename) {
        fileStorageService.deleteFile(category, filename);
        return ResponseEntity.ok().build();
    }
}
