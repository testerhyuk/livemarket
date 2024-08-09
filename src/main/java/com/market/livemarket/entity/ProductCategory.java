package com.market.livemarket.entity;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum ProductCategory {
    FOOD("0"), CLOTHES("1"), HOME_APPLIANCES("2"), SHOES("3"), ETC("4");

    private String categoryType;

    ProductCategory(String categoryType) {
        this.categoryType = categoryType;
    }

    public static ProductCategory StringToProductCategory(String categoryType) {
        return Arrays.stream(values()).filter(
                typ -> typ.categoryType.equals(categoryType)).findAny().orElseThrow(
                        () -> new IllegalArgumentException("Can't Find Category"));
    }
}
