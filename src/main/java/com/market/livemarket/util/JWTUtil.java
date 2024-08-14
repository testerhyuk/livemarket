package com.market.livemarket.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

public class JWTUtil {
    private static final String key = "123456789012345678912345678901234567890";

    // JWT 생성
    public static String generateToken(Map<String, Object> valueMap, int min) {
        SecretKey key = null;

        try{
            key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return Jwts.builder()
                .setHeader(Map.of("typ", "JWT"))
                .setClaims(valueMap)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant()))
                .signWith(key)
                .compact();
    }

    // jwt 검증
    public static Map<String, Object> validateToken(String token) {
        Map<String, Object> claim = null;

        try {
            SecretKey key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes(StandardCharsets.UTF_8));

            claim = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch(MalformedJwtException malformedJwtException) {
            throw new CustomJWTException("Malformed");
            // 토큰 유효시간 초과 발생
        } catch(ExpiredJwtException expiredJwtException) {
            throw new CustomJWTException("Expired");
            // 필드 누락이나 잘못된 값일 때 발생
        } catch(InvalidClaimException invalidClaimException) {
            throw new CustomJWTException("Invalid");
        } catch(JwtException jwtException) {
            throw new CustomJWTException("JWTError");
        } catch(Exception e) {
            throw new CustomJWTException("Error");
        }

        return claim;
    }
}
