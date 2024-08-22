package com.market.livemarket.controller;

import com.market.livemarket.dto.MemberInfoDTO;
import com.market.livemarket.dto.MemberProfileDTO;
import com.market.livemarket.dto.MemberRegisterDTO;
import com.market.livemarket.entity.Member;
import com.market.livemarket.service.MemberService;
import com.market.livemarket.util.CustomFileUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
public class MemberController {
    private final MemberService memberService;
    private final CustomFileUtil customFileUtil;

    // 회원 정보 가져오기
    @PostMapping("/api/member/getMember")
    public MemberInfoDTO getMemberInfo(String email) {
        return memberService.getMembersInfo(email);
    }

    // 프로필 이미지 등록
    @PostMapping("/api/member/profileImage")
    public Map<String, String> addProfileImage(MemberProfileDTO memberProfileDTO) {
        MultipartFile file = memberProfileDTO.getFile();

        String uploadedFileNames = customFileUtil.saveProfile(file);

        memberProfileDTO.setUploadedFileNames(uploadedFileNames);

        memberService.registerProfile(memberProfileDTO);

        return Map.of("RESULT", "SUCCESS");
    }

    // 프로필 이미지 조회
    @GetMapping("/api/member/view/{fileName}")
    public ResponseEntity<Resource> viewProfileImgae(@PathVariable("fileName") String fileName) {
        return customFileUtil.getProfileImage(fileName);
    }

    @PostMapping("/api/member/register")
    public ResponseEntity<?> registerMember(@Valid MemberRegisterDTO memberDTO) {
        boolean res = memberService.registerMember(memberDTO);

        if(res) {
            return ResponseEntity.badRequest().body(Map.of("ERROR", "이메일 또는 닉네임이 중복됩니다"));
        }

        return ResponseEntity.ok().body(HttpStatus.OK);
    }

    @PostMapping("/api/member/check_email")
    public ResponseEntity<Boolean> checkEmail(String email) {
        return ResponseEntity.ok(memberService.checkEmail(email));
    }

    @PostMapping("/api/member/check_nickname")
    public ResponseEntity<Boolean> checkNickname(String nickname) {
        return ResponseEntity.ok(memberService.checkNickname(nickname));
    }
}
