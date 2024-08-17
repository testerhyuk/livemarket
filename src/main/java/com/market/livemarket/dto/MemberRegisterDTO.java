package com.market.livemarket.dto;

import lombok.Data;

import java.util.List;

@Data
public class MemberRegisterDTO {
    private String email;
    private String pw;
    private String nickname;
    private boolean social;
    private List<String> roleNames;
}
