package com.market.livemarket.controller;

import com.market.livemarket.dto.MemberRegisterDTO;
import com.market.livemarket.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
public class MemberController {
    private final MemberService memberService;

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
