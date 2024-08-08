package com.market.livemarket.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductImage {
    private String fileName;
    private int ord; // 0번째를 대표 이미지로 지정할 예정

    public void changeOrd(int ord) {
        this.ord = ord;
    }
}
