package com.market.livemarket.service;

import com.market.livemarket.dto.MemberDTO;
import com.market.livemarket.entity.Member;
import com.market.livemarket.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("-----loadUserByUsername-----");

        Member member = memberRepository.getWithRoles(username);

        if(member == null) {
            throw new UsernameNotFoundException("Not Found");
        }

        return new MemberDTO(
                member.getEmail(),
                member.getPw(),
                member.getNickname(),
                member.isSocial(),
                member.getMemberRoleList().stream().map(Enum::name).collect(Collectors.toList())
        );
    }
}
