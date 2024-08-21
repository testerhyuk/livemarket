package com.market.livemarket.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class MemberModifyDTO {
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력값입니다")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    private String pw;

    @NotBlank(message = "닉네임은 필수 입력값입니다")
    private String nickname;

    @NotBlank(message = "주소는 필수 입력값입니다")
    private String zipcode;
    private String streetAddress;

    @NotBlank(message = "상세 주소는 필수 입력값입니다")
    private String detailAddress;
}
