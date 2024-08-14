package com.market.livemarket.controller;

import com.market.livemarket.util.CustomJWTException;
import com.market.livemarket.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class APIRefreshController {
    @PostMapping("/api/member/refresh")
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, String refreshToken) {
        if(refreshToken == null) {
            throw new CustomJWTException("NULL_REFRESH");
        }

        if(authHeader == null || authHeader.length() < 7) {
            throw new CustomJWTException("INVALID_STRING");
        }

        String accessToken = authHeader.substring(7);

        // accessToken의 만료 여부 확인
        if(!checkExpiredToken(accessToken)) {
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        }

        // refreshToken 검증
        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);

        String newAccessToken = JWTUtil.generateToken(claims, 10);
        String newRefreshToken = checkTime((Integer) claims.get("exp")) ?
                JWTUtil.generateToken(claims, 60*24)
                :
                refreshToken;

        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }

    // refresh token이 만료되지 않은 상태에서 만료까지 1시간도 안남았는지 확인
    private boolean checkTime(Integer exp) {
        Date expDate = new Date((long) exp * (1000));

        long gap = expDate.getTime() - System.currentTimeMillis();

        long leftMin = gap / (1000 * 60);

        return leftMin < 60;
    }

    // 토큰 만료 여부 확인
    private boolean checkExpiredToken(String token) {
        try {
            JWTUtil.validateToken(token);
        } catch (CustomJWTException ex) {
            if(ex.getMessage().equals("Expired")) {
                return true;
            }
        }

        return false;
    }
}
