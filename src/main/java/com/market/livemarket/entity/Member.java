package com.market.livemarket.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "memberRoleList")
public class Member {
    @Id
    private String email;

    private String pw;

    private String nickname;

    private String zipcode;

    private String streetAddress;

    private String detailAddress;

    private boolean social;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();

    public void changePw(String pw) {
        this.pw = pw;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    public void changeSocial(boolean social) {
        this.social = social;
    }

    public void changeEmail(String email) {
        this.email = email;
    }

    public void changeZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public void changeStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public void changeDetailAddress(String detailAddress) {
        this.detailAddress = detailAddress;
    }

    public void addRole(MemberRole memberRole) {
        memberRoleList.add(memberRole);
    }

    public void clearRole() {
        memberRoleList.clear();
    }
}
