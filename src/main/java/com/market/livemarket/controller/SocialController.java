package com.market.livemarket.controller;

import com.market.livemarket.dto.MemberDTO;
import com.market.livemarket.dto.MemberModifyDTO;
import com.market.livemarket.service.MemberService;
import com.market.livemarket.util.JWTUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
public class SocialController {
    private final MemberService memberService;

    @GetMapping("/api/member/kakao")
    public Map<String, Object> getMemberFromKakao(String accessToken) {
        MemberDTO memberDTO = memberService.getKakaoMember(accessToken);

        Map<String, Object> claims = memberDTO.getClaims();

        String jwtAccessToken = JWTUtil.generateToken(claims, 10);
        String jwtRefreshToken = JWTUtil.generateToken(claims, 60*24);

        claims.put("accessToken", jwtAccessToken);
        claims.put("refreshToken", jwtRefreshToken);

        return claims;
    }

    @PutMapping("api/member/modify")
    public ResponseEntity<?> modify(@Valid MemberModifyDTO memberModifyDTO) {
        boolean res = memberService.modifyMember(memberModifyDTO);

        if(res) {
            return ResponseEntity.badRequest().body(Map.of("ERROR", "이메일 또는 닉네임이 중복됩니다"));
        }

        return ResponseEntity.ok().body(HttpStatus.OK);
    }
}
