package com.market.livemarket.controller;

import com.market.livemarket.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
public class MailController {
    private final MailService mailService;
    private int number;

    @PostMapping("/api/member/sendEmail")
    public HashMap<String, Object> sendEmail(String email) {
        HashMap<String, Object> map = new HashMap<>();

        try {
            number = mailService.sendMail(email);
            String num = String.valueOf(number);

            map.put("success", Boolean.TRUE);
            map.put("number", num);
        } catch (Exception e) {
            map.put("success", Boolean.FALSE);
            map.put("error", e.getMessage());
        }

        return map;
    }

    @PostMapping("/api/member/emailValidateCheck")
    public ResponseEntity<?> emailValidateCheck(String validateNumber) {
        boolean isMatch = validateNumber.equals(String.valueOf(number));

        if(!isMatch) {
            return ResponseEntity.badRequest().body(Map.of("ERROR", "인증이 실패했습니다"));
        }

        return ResponseEntity.ok(isMatch);
    }
}
