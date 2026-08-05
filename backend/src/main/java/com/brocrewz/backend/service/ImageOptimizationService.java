package com.brocrewz.backend.service;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
public class ImageOptimizationService {

    public void optimizeAndSave(MultipartFile file, File targetFile) throws IOException {
        String contentType = file.getContentType();
        
        // Only optimize images, not videos
        if (contentType != null && contentType.startsWith("image/")) {
            // Read image to get original dimensions
            BufferedImage originalImage = ImageIO.read(file.getInputStream());
            if (originalImage == null) {
                // If it fails to read, just transfer normally (might be an unsupported format or corrupted)
                file.transferTo(targetFile);
                return;
            }

            int originalWidth = originalImage.getWidth();
            int targetWidth = Math.min(originalWidth, 1920); // Cap width at 1920px

            Thumbnails.of(file.getInputStream())
                    .width(targetWidth)
                    .outputQuality(0.85) // 85% quality for good compression without noticeable artifacting
                    .toFile(targetFile);
        } else {
            // For videos, just save directly
            file.transferTo(targetFile);
        }
    }
}
