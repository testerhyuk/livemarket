package com.market.livemarket.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@Data
public class MemberProfileDTO {
    private String email;
    private String uploadedFileNames;
    private MultipartFile file;
}
