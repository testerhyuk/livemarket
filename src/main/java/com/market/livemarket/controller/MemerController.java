package com.market.livemarket.controller;

import com.market.livemarket.dto.MemberDTO;
import com.market.livemarket.dto.MemberRegisterDTO;
import com.market.livemarket.entity.Member;
import com.market.livemarket.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
public class MemerController {
    private final MemberService memberService;

    @PostMapping("/api/member/register")
    public Map<String, String> registerMember(@RequestBody MemberRegisterDTO memberDTO) {
        memberService.registerMember(memberDTO);

        return Map.of("RESULT", "SUCCESS");
    }
}
