package com.market.livemarket.controller;

import com.market.livemarket.dto.PageRequestDTO;
import com.market.livemarket.dto.PageResponseDTO;
import com.market.livemarket.dto.ProductDTO;
import com.market.livemarket.entity.Product;
import com.market.livemarket.service.ProductService;
import com.market.livemarket.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final CustomFileUtil customFileUtil;
    private final ProductService productService;

    // 상품 등록
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @PostMapping("/")
    public Map<String, Long> register(ProductDTO productDTO) {
        // 파일 리스트 추출
        List<MultipartFile> files = productDTO.getFiles();

        // 파일 업로드
        List<String> uploadedFileNames = customFileUtil.saveFiles(files);

        // 업로드된 파일 갱신
        productDTO.setUploadedFileNames(uploadedFileNames);

        Long pno = productService.register(productDTO);

        return Map.of("RESULT", pno);
    }

    // 이미지 파일 조회
    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable("fileName") String fileName) {
        return customFileUtil.getFile(fileName);
    }

    // 상품 목록 조회
    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
        return productService.getList(pageRequestDTO);
    }

    // 상품 조회
    @GetMapping("/read/{pno}")
    public ProductDTO read(@PathVariable("pno") Long pno) {
        return productService.get(pno);
    }

    // 상품 수정
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @PutMapping("/modify/{pno}")
    public Map<String, String> modify(@PathVariable Long pno, ProductDTO productDTO) {
        productDTO.setPno(pno);

        ProductDTO oldProductDTO = productService.get(pno);

        List<MultipartFile> files = productDTO.getFiles();
        List<String> currentUploadFileNames = customFileUtil.saveFiles(files);

        List<String> uploadedFileNames = productDTO.getUploadedFileNames();

        if(currentUploadFileNames != null && !currentUploadFileNames.isEmpty()) {
            uploadedFileNames.addAll(currentUploadFileNames);
        }

        productService.modify(productDTO);

        List<String> oldFileNames = oldProductDTO.getUploadedFileNames();

        if(oldFileNames != null && !oldFileNames.isEmpty()) {
            List<String> removeFiles = oldFileNames.stream().filter(fileName ->
                    uploadedFileNames.indexOf(fileName) == -1)
                    .toList();

            customFileUtil.deleteFiles(removeFiles);
        }

        return Map.of("RESULT", "SUCCESS");
    }

    // 상품 삭제 -> delFlag만 수정
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @PutMapping("/remove/{pno}")
    public Map<String, String> remove(@PathVariable Long pno) {
        List<String> oldFileNames = productService.get(pno).getUploadedFileNames();
        customFileUtil.deleteFiles(oldFileNames);

        productService.remove(pno);

        return Map.of("RESULT", "SUCCESS");
    }

    // 카테고리별 상품 조회
    @GetMapping("/categories/{category}")
    public PageResponseDTO<ProductDTO> categoryList(PageRequestDTO pageRequestDTO, @PathVariable("category") String category) {
        return productService.getCategorySearchList(pageRequestDTO, category);
    }

    // 사용자 검색
    @GetMapping("/search")
    public PageResponseDTO<ProductDTO> searchKeywordList(PageRequestDTO pageRequestDTO, @RequestParam(value="keyword") String keyword) {
        return productService.getKeywordSearchList(pageRequestDTO, keyword);
    }

    // 오늘의 새상품 검색
    @GetMapping("/today_product")
    public Optional<List<Product>> getTodaysProduct() {
        return productService.getTodaysProduct();
    }
}
