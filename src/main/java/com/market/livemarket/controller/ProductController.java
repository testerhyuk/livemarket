package com.market.livemarket.controller;

import com.market.livemarket.dto.ProductDTO;
import com.market.livemarket.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final CustomFileUtil customFileUtil;

    @PostMapping("/")
    public Map<String, String> register(ProductDTO productDTO) {
        // 파일 리스트 추출
        List<MultipartFile> files = productDTO.getFiles();

        // 파일 업로드
        List<String> uploadedFileNames = customFileUtil.saveFiles(files);

        // 업로드된 파일 갱신
        productDTO.setUploadedFileNames(uploadedFileNames);

        return Map.of("RESULT", "SUCCESS");
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable("fileName") String fileName) {
        return customFileUtil.getFile(fileName);
    }
}
