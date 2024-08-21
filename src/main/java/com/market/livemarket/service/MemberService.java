package com.market.livemarket.service;

import com.market.livemarket.dto.MemberDTO;
import com.market.livemarket.dto.MemberModifyDTO;
import com.market.livemarket.dto.MemberRegisterDTO;
import com.market.livemarket.entity.Member;
import com.market.livemarket.entity.MemberRole;
import com.market.livemarket.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class MemberService {
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    public boolean checkEmail(String email) {
        boolean validateEmail = EmailValidator.getInstance().isValid(email);

        if(!validateEmail) {
            return true;
        }

        return memberRepository.existsByEmail(email);
    }

    public boolean checkNickname(String nickname) {
        if(nickname.isEmpty()) {
            return true;
        }

        return memberRepository.existsByNickname(nickname);
    }

    public MemberDTO getKakaoMember(String accessToken) {
        String nickname = getNicknameFromKakaoAccessToken(accessToken);

        Optional<Member> result = memberRepository.findById(nickname);

        if(result.isPresent()) {

            return entityToDTO(result.get());
        }

        Member socialMember = makeSocialMember(nickname);

        memberRepository.save(socialMember);

        return entityToDTO(socialMember);
    }

    // 기존 DB에 회원 정보가 없는 경우
    private Member makeSocialMember(String nickname) {
        String tempPassword = makeTempPassword();

        Member member = Member.builder()
                .email(nickname)
                .nickname("Social Member")
                .social(true)
                .pw(passwordEncoder.encode(tempPassword))
                .build();

        member.addRole(MemberRole.USER);

        return member;
    }

    // accessToken을 가지고 카카오 서버에 사용자 정보 요청
    private String getNicknameFromKakaoAccessToken(String accessToken) {
        String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();

        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-urlencoded;charset=utf-8");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();

        ResponseEntity<LinkedHashMap> response =
                restTemplate.exchange(uriBuilder.toUri(), HttpMethod.GET, entity, LinkedHashMap.class);

        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();
        LinkedHashMap<String, String> kakaoAccount = bodyMap.get("properties");

        String nickname = kakaoAccount.get("nickname");

        return nickname;
    }

    public boolean registerMember(MemberRegisterDTO memberDTO) {
        boolean isEmail = memberRepository.existsByEmail(memberDTO.getEmail());
        boolean isNickname = memberRepository.existsByNickname(memberDTO.getNickname());

        if(isEmail) {
            return true;
        } else if(isNickname) {
            return true;
        }

        Member member = Member.builder()
                .email(memberDTO.getEmail())
                .pw(passwordEncoder.encode(memberDTO.getPw()))
                .nickname(memberDTO.getNickname())
                .social(memberDTO.isSocial())
                .zipcode(memberDTO.getZipcode())
                .streetAddress(memberDTO.getStreetAddress())
                .detailAddress(memberDTO.getDetailAddress())
                .build();

        member.addRole(MemberRole.USER);

        memberRepository.save(member);

        return false;
    }

    public void modifyMember(MemberModifyDTO memberModifyDTO) {
        Optional<Member> result = memberRepository.findById(memberModifyDTO.getEmail());
        Member member = result.orElseThrow();

        member.changeNickname(memberModifyDTO.getNickname());
        member.changeSocial(false);
        member.changePw(passwordEncoder.encode(memberModifyDTO.getPw()));
        member.changeZipcode(memberModifyDTO.getZipcode());
        member.changeStreetAddress(memberModifyDTO.getStreetAddress());
        member.changeDetailAddress(memberModifyDTO.getDetailAddress());

        memberRepository.save(member);
    }

    private String makeTempPassword() {
        StringBuilder buffer = new StringBuilder();

        for(int i = 0; i < 0; i++) {
            buffer.append((char) ((int)(Math.random() * 55) + 65));
        }

        return buffer.toString();
    }

    private MemberDTO entityToDTO(Member member) {
        return new MemberDTO(
                member.getEmail(),
                member.getPw(),
                member.getNickname(),
                member.isSocial(),
                member.getMemberRoleList().stream().map(Enum::name).collect(Collectors.toList())
        );
    }
}
