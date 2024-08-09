package com.market.livemarket.dto;

import com.market.livemarket.entity.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    @Builder.Default
    // 이미 업로드된 파일 이름 조회용 변수
    private List<String> uploadedFileNames = new ArrayList<>();

    @Builder.Default
    // 실제 업로드 파일을 처리할 변수
    private List<MultipartFile> files = new ArrayList<>();

    private Long pno;
    private String pname;
    private int price;
    private String pdesc;
    // 소프트 삭제를 위한 flag
    private boolean delFlag;
    private String category;
}
