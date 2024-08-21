package com.market.livemarket.repository;

import com.market.livemarket.entity.Member;
import com.market.livemarket.entity.MemberAddress;
import com.market.livemarket.entity.MemberRole;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Log4j2
class MemberRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 회원 등록
    @Test
    public void testInsertMember() {
//        for(int i = 0; i < 10; i++) {
//            Member member = Member.builder()
//                    .email("user" + i + "@aaa.com")
//                    .pw(passwordEncoder.encode("1111"))
//                    .nickname("test" + i)
//                    .build();
//
//            member.addRole(MemberRole.USER);
//
//            if (i >= 8) {
//                member.addRole(MemberRole.ADMIN);
//            }
//        }

        Member member = Member.builder()
                .email("user_test2@aaa.com")
                .pw(passwordEncoder.encode("1111"))
                .nickname("user_test2")
                .zipcode("12345")
                .streetAddress("인천광역시")
                .detailAddress("송도 아파트")
                .build();

        member.addRole(MemberRole.USER);

        memberRepository.save(member);
    }

     // 회원 조회
    @Test
    public void testRead() {
        String email = "user1@aaa.com";

        Member member = memberRepository.getWithRoles(email);

        log.info("member : " + member);

        log.info("member role : " + member.getMemberRoleList());
    }
}