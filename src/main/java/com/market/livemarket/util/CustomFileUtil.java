package com.market.livemarket.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil {
    @Value("${com.market.upload.path}")
    private String uploadPath;

    // 이미지 파일 업로드 디렉터리 생성
    @PostConstruct
    public void init() {
        File tempFolder = new File(uploadPath);

        if(!tempFolder.exists()) {
            tempFolder.mkdir();
        }

        uploadPath = tempFolder.getAbsolutePath();
    }

    // 이미지 파일 업로드 메서드
    public List<String> saveFiles(List<MultipartFile> files) throws RuntimeException {
        if(files == null || files.isEmpty()) {
            return null;
        }

        // 실제 업로드된 파일의 이름들을 저장하기 위한 array
        List<String> uploadNames = new ArrayList<>();

        for(MultipartFile file : files) {
            // 중복 파일 이름을 방지하고자 UUID 부여
            String savedName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            Path savePath = Paths.get(uploadPath, savedName);

            // 업로드한 파일 저장
            try {
                // 원본 파일 업로드
                Files.copy(file.getInputStream(), savePath);

                // 썸네일 생성
                String contentType = file.getContentType();

                if(contentType != null || contentType.startsWith("image")) {
                    // 썸네일 파일은 Thumb_를 붙여 원본 파일과 구분
                    Path thumbnailPath = Paths.get(uploadPath, "Thumb_" + savedName);

                    Thumbnails.of(savePath.toFile()).size(200, 200).toFile(thumbnailPath.toFile());
                }

                uploadNames.add(savedName);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return uploadNames;
    }

    // 업로드된 파일 조회
    public ResponseEntity<Resource> getFile(String fileName) {
        Resource resource = new FileSystemResource(uploadPath + File.separator + fileName);

        // 이미지 없을 경우 디폴트 이미지로 대체
        if(!resource.isReadable()) {
            resource = new FileSystemResource(uploadPath + File.separator + "default.png");
        }

        HttpHeaders headers = new HttpHeaders();

        try {
            headers.add("Content-Type", Files.probeContentType(resource.getFile().toPath()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    // 업로드된 파일 삭제
    public void deleteFiles(List<String> fileNames) {
        if(fileNames == null || fileNames.isEmpty()) {
            return;
        }

        fileNames.forEach(fileName -> {
            String thumbnailFileName = "Thumb_" + fileName;

            Path filePath = Paths.get(uploadPath, fileName);
            Path thumbnailPath = Paths.get(uploadPath, thumbnailFileName);

            try {
                Files.deleteIfExists(filePath);
                Files.deleteIfExists(thumbnailPath);
            } catch (IOException e) {
                throw new RuntimeException(e.getMessage());
            }
        });
    }
}
