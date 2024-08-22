package com.market.livemarket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoDTO {
    private String email;
    private String nickname;
    private String streetAddress;
    private String detailAddress;
    private String file;
}
